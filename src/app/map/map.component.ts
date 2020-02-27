import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { loadModules, loadCss } from 'esri-loader';
import { MatDialog } from '@angular/material/dialog';
import { MapMenubarComponent } from './map-menubar/map-menubar.component';
import { MapIdentifyComponent } from './map-identify/map-identify.component';
import { Map } from './shared/map';
import { MapService } from './shared/map.service';

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
  map: Map;
  mapIdentify: MapIdentifyComponent;

  // initialize map
  constructor(private mapService: MapService, public dialog: MatDialog) { }

  async initializeMap() {
    try {
      const options = { css: true };
      loadCss('https://js.arcgis.com/4.14/esri/css/main.css');
      // load modules
      const [EsriMap, MapView] = await loadModules(['esri/Map', 'esri/views/MapView'], options);

      // get map configuration
      await this.getMaps();

      // set map properties
      const {basemap, center, zoom} = this.map;

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
      this.loadLayer();

      this.view = new MapView(mapViewProp);

      this.identify();

      this.view.on('click', (event) => this.identifyClick(event));

      return this.view;
    } catch (error) {
      console.log('EsriLoader: ', error);
    }
  }

  // subscribe to service to get map properties
  getMaps(): void {
    this.mapService.getMaps()
      .subscribe(map => this.map = map);
  }

  // load layer into map
  async loadLayer() {

    const [MapImageLayer] = await loadModules(['esri/layers/MapImageLayer']);
    if (this.map.url) {
      const layer = new MapImageLayer({
        url: this.map.url
      });

      this.esriMap.add(layer);
    }
  }

  async identify() {
    const [IdentifyTask, IdentifyParameters] = await loadModules(['esri/tasks/IdentifyTask', 'esri/tasks/support/IdentifyParameters']);

    this.idMapTask = new IdentifyTask(this.map.url);

    this.idMapParams = new IdentifyParameters();
    this.idMapParams.tolerance = 3;
    this.idMapParams.layerOption = 'top';
    this.idMapParams.width = this.view.width;
    this.idMapParams.height = this.view.height;
  }

  identifyClick(event) {
    this.idMapParams.geometry = event.mapPoint;
    this.idMapParams.mapExtent = this.view.extent;
    this.idMapTask.execute(this.idMapParams).then((response) => {
      console.log(response);
      this.openDialog(response);
    });
  }

  openDialog(response): void {
    const dialogRef = this.dialog.open(MapIdentifyComponent, {
      height: '400px',
      width: '600px',
      data: {results: response.results[0]}
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
