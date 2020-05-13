import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  OnChanges,
  SimpleChanges, Input
} from '@angular/core';
import { loadModules, loadCss } from 'esri-loader';

import { Map } from './shared/map';
import { MapService } from './shared/map.service';
import {Project} from './shared/project';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, OnDestroy, OnChanges {
  @ViewChild('mapViewNode', { static: true }) private mapViewEl: ElementRef;
  view: any;
  esriMap: any;
  idMapTask: any;
  idMapParams: any;
  map: Map[];
  project: Project;

  idVisible = 'hidden';
  idResults = [];
  currentMapName: string;
  currentResult: any;
  totalResults = 0;

  // initialize map
  constructor(private mapService: MapService) { }

  async initializeMap() {
    try {
      const options = { css: true };
      loadCss('https://js.arcgis.com/4.15/esri/css/main.css');
      // load modules
      const [EsriMap, MapView] = await loadModules(['esri/Map', 'esri/views/MapView'], options);

      await this.getProject(1);

      // get map configuration
      await this.getMaps();

      // set map properties
      const {basemap, center, zoom} = this.project;

      const mapProp = {
        basemap
      };

      // create ESRI map object
      this.esriMap = new EsriMap(mapProp);

      // set map view properties
      const mapViewProp = {
        container: this.mapViewEl.nativeElement,
        center,
        zoom,
        map: this.esriMap
      };

      // load layer in map
      this.loadLayers();

      this.view = new MapView(mapViewProp);

      this.identify();

      this.view.on('click', (event) => this.identifyClick(event));

      return this.view;
    } catch (error) {
      console.log('EsriLoader: ', error);
    }
  }

  getProject(id: number): void {
    this.mapService.getProject(id)
      .subscribe(project => this.project = project);
  }

  // subscribe to service to get map properties
  getMaps(): void {
    this.mapService.getMaps(this.project.maps)
      .subscribe(map => this.map = map);
  }

  // load layer into map
  async loadLayers() {

    const [MapImageLayer] = await loadModules(['esri/layers/MapImageLayer']);
    const layers = this.map.map((m) => {
        return new MapImageLayer({
          url: m.url
        });
      });
    this.esriMap.addMany(layers);
  }

  async identify() {
    const [IdentifyTask, IdentifyParameters] = await loadModules(['esri/tasks/IdentifyTask', 'esri/tasks/support/IdentifyParameters']);

    this.idMapTask = this.map.map(m => new IdentifyTask(m.url));

    this.idMapParams = new IdentifyParameters();
    this.idMapParams.tolerance = 3;
    this.idMapParams.layerOption = 'all';
    this.idMapParams.width = this.view.width;
    this.idMapParams.height = this.view.height;
  }

  identifyClick(event) {
    this.mapService.idRecord = 0;
    this.idResults = [];

    this.idMapParams.geometry = event.mapPoint;
    this.idMapParams.mapExtent = this.view.extent;
    const observer = {
      next: results => {
        results.forEach(result => {
          console.log(result);
          this.idResults.push(result);
        });
        if (this.idResults.length > 0 ) {
          this.idVisible = 'visible';
          this.currentMapName = this.idResults[this.mapService.idRecord].mapName;
          this.currentResult = this.idResults[this.mapService.idRecord].result;
        } else {
          this.idVisible = 'hidden';
        }
      }
    };

    this.mapService.getIdResults(this.idMapParams, this.idMapTask).forEach(data => {
      data.subscribe(observer);
    }).then(r => r);
  }

  ngOnInit() {
    this.initializeMap().then(r => r);
  }

 ngOnChanges(changes: SimpleChanges): void {
    console.log('mapChanges', changes);
 }

  ngOnDestroy(): void {
    if (this.view) {
      this.view.container = null;
    }
  }

}
