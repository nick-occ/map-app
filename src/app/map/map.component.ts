import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  OnChanges,
  SimpleChanges, Input, AfterViewChecked, AfterViewInit, AfterContentInit
} from '@angular/core';
import { loadModules, loadCss } from 'esri-loader';

import { Map } from './shared/map';
import { MapService } from './shared/map.service';
import {Project} from './shared/project';
import {Observable} from 'rxjs';
import {MatButtonToggle} from '@angular/material/button-toggle';
import {MapViewInfo} from './shared/map-view-info';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, OnDestroy, OnChanges, AfterContentInit {
  @ViewChild('mapViewNode', { static: true }) private mapViewEl: ElementRef;
  view: any;
  esriMap: any;
  idMapTask: any;
  idMapParams: any;
  map: Map[];
  project: Project;
  projectName = '';
  idResults = [];
  currentMapName: string;
  currentResult: any;

  // initialize map
  constructor(private mapService: MapService) { }

  async initializeMap() {
    try {
      const options = { css: true };
      loadCss('https://js.arcgis.com/4.15/esri/css/main.css');
      // load modules
      const [EsriMap, MapView, Legend, LayerList] = await loadModules(['esri/Map', 'esri/views/MapView', 'esri/widgets/Legend', 'esri/widgets/LayerList'], options);

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



      // this.view = new MapView(mapViewProp);
      // this.mapService.mapView = this.view;
      this.mapService.mapView = new MapView(mapViewProp);

      // load layer in map
      await this.loadLayers();

      const legend = new Legend({
        view:  this.mapService.mapView
      }, 'legendContainer');

      await this.identify();

      this.mapService.mapView.on('click', (event) => this.identifyClick(event));

      return this.mapService.mapView;
    } catch (error) {
      console.log('EsriLoader: ', error);
    }
  }

  getProject(id: number): void {
    this.mapService.getProject(id)
      .subscribe(project => {
        this.project = project;
        this.projectName = this.project.name;
      });
  }

  // subscribe to service to get map properties
  getMaps(): void {
    this.mapService.getMaps(this.project.maps)
      .subscribe(map => this.map = map);
  }

  // load layer into map
  async loadLayers() {

    const [MapImageLayer, TileLayer] = await loadModules(['esri/layers/MapImageLayer', 'esri/layers/TileLayer']);

    this.map.forEach((m) => {
      let layer = null;
      if (m.mapType === 'tileLayer') {
        layer = new TileLayer({
        url: m.url
        });
      } else {
        layer = new MapImageLayer({
          url: m.url
        });
      }

      this.esriMap.add(layer);
      this.mapService.mapView.whenLayerView(layer).then(() => {
        this.mapService.setMapViewInfo(layer, m);
      });
    });
  }

  async identify() {
    const [IdentifyTask, IdentifyParameters] = await loadModules(['esri/tasks/IdentifyTask', 'esri/tasks/support/IdentifyParameters']);

    this.idMapTask = this.map.map(m => new IdentifyTask(m.url));

    this.idMapParams = new IdentifyParameters();
    this.idMapParams.tolerance = 3;
    this.idMapParams.layerOption = 'all';
    this.idMapParams.width = this.mapService.mapView.width;
    this.idMapParams.height = this.mapService.mapView.height;
    this.idMapParams.returnGeometry = true;
  }

  identifyClick(event) {
    if (!this.mapService.toggleButtons.Identify) {
      this.onClosed(false);
      return 'Event not enabled';
    }

    this.mapService.idRecord = 0;
    this.idResults = [];

    this.idMapParams.geometry = event.mapPoint;
    this.idMapParams.mapExtent = this.mapService.mapView.extent;
    const observer = {
      next: results => {
        results.forEach(result => {
          console.log(result);
          this.idResults.push(result);
        });
        if (this.idResults.length > 0 ) {
          // this.idVisible = 'visible';
          this.mapService.idShow = true;
          this.currentMapName = this.idResults[this.mapService.idRecord].mapName;
          this.currentResult = this.idResults[this.mapService.idRecord].result;
        } else {
          // this.idVisible = 'hidden';
          this.onClosed(false);
        }
      }
    };

    this.mapService.getIdResults(this.idMapParams, this.idMapTask).forEach(data => {
      data.subscribe(observer);
    }).then(r => r);
  }

  ngOnInit() {
    this.initializeMap().then(r => {
      return r;
    });
  }

 ngOnChanges(changes: SimpleChanges): void {
    console.log('mapChanges', changes);
 }

 ngAfterContentInit() { }

  ngOnDestroy(): void {
    if (this.view) {
      this.view.container = null;
    }
  }

  onClosed(show) {
    this.mapService.showIdentify(show);
  }

 getIdShow() {
    return this.mapService.idShow;
 }

 getToggleState() {
    return this.mapService.toggleButtons;
 }
}
