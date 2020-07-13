import {
  Component,
  OnInit,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { MapService } from '../shared/map.service';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {loadModules} from 'esri-loader';

export interface IdData {
  field: string;
  value: any;
}

@Component({
  selector: 'app-map-identify-results',
  templateUrl: './map-identify-results.component.html',
  styleUrls: ['./map-identify-results.component.css']
})
export class MapIdentifyResultsComponent implements OnInit, OnChanges, OnDestroy {

  @Input() currentMapName = '';
  @Input() currentResult = {
    layerName: '',
    feature: {
      attributes: {}
    }
  };
  layerName: string;
  attributes: {};
  displayColumns: string[] = ['field', 'value'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  graphic: {};

  constructor(private mapService: MapService) { }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes', changes);
    this.mapService.removeGraphics();
    if (this.currentResult) {
      this.layerName = this.currentResult.layerName;
      this.attributes = this.currentResult.feature.attributes;
      this.dataSource = new MatTableDataSource(this.mapService.formatIdAttributes(this.attributes));
      this.dataSource.sort = this.sort;
      this.highlightArea(this.currentResult);
    }
  }

  // @ts-ignore
  async highlightArea(result): void {

    const [Graphic, SimpleMarkerSymbol, SimpleLineSymbol, SimpleFillSymbol] =
      await loadModules([
        'esri/Graphic',
        'esri/symbols/SimpleMarkerSymbol',
        'esri/symbols/SimpleLineSymbol',
        'esri/symbols/SimpleFillSymbol']);

    let symbol;
    switch (result.feature.geometry.type) {
      case 'polygon':
        symbol = {
          type: 'simple-fill',
          color: [ 255, 0, 0, 0.5 ],
          style: 'solid',
          outline: {
            color: 'white',
            width: 1
          }
        };
        break;
      case 'polyline':
        symbol =  {
          type: 'simple-line',
          color: 'orange',
          width: '5px',
          style: 'short-dot'
        };
        break;
      case 'point':
        symbol = {
          type: 'simple-marker',
          style: 'circle',
          color: 'red',
          size: '20px',
          outline: {
            color: [255, 255, 0, 0.5],
            width: 3
          }
        };
        break;
    }

    this.graphic = new Graphic({
      symbol,
      geometry: result.feature.geometry
    });

    this.mapService.mapView.graphics.add(this.graphic);

  }


  zoomToFeature() {
    this.mapService.mapView.goTo(this.graphic);
  }


  ngOnInit() {  }

  ngOnDestroy() {
    this.mapService.removeGraphics();
  }

}
