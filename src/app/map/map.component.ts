import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { loadModules, loadCss } from 'esri-loader';
import { MatDialog } from '@angular/material/dialog';
import { MapMenubarComponent } from './map-menubar/map-menubar.component';
import { MapIdentifyComponent } from './map-identify/map-identify.component';
import { Map } from './shared/map';
import { MapIdentify } from './shared/map-identify';
import { MapService } from './shared/map.service';
import {Project} from './shared/project';
import {Observable} from "rxjs";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, OnDestroy {
  @ViewChild('mapViewNode', { static: true }) private mapViewEl: ElementRef;
  view: any;
  esriMap: any;
  idMapTask: any;
  idMapParams: any;
  map: Map[];
  project: Project;
  mapIdentify: MapIdentify;

  // initialize map
  constructor(private mapService: MapService, public dialog: MatDialog) { }

  async initializeMap() {
    try {
      const options = { css: true };
      loadCss('https://js.arcgis.com/4.14/esri/css/main.css');
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

    // this.idMapTask = new IdentifyTask(this.map[0].url);
    this.idMapTask = this.map.map(m => new IdentifyTask(m.url));
    console.log('idMapTask', this.idMapTask);

    this.idMapParams = new IdentifyParameters();
    this.idMapParams.tolerance = 3;
    this.idMapParams.layerOption = 'top';
    this.idMapParams.width = this.view.width;
    this.idMapParams.height = this.view.height;
  }

  identifyClick(event) {
    this.idMapParams.geometry = event.mapPoint;
    this.idMapParams.mapExtent = this.view.extent;
    const observers = this.mapService.getIdResults(this.idMapParams, this.idMapTask);
    const data = this.mapService.getIdData(observers);
    console.log(data);
    this.openDialog(data);
  }


  openDialog(results): void {
    const dialogRef = this.dialog.open(MapIdentifyComponent, {
      width: '500px',
      data: {results}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('dialog closed');
    });
  }

  ngOnInit() {
    this.initializeMap().then(r => r);
  }

  ngOnDestroy(): void {
    if (this.view) {
      this.view.container = null;
    }
  }

}
