import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild
} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {loadModules} from 'esri-loader';
import {MapService} from '../shared/map.service';
import {MapViewInfo} from '../shared/models/map-view-info';


@Component({
  selector: 'app-map-legend',
  templateUrl: './map-legend.component.html',
  styleUrls: ['./map-legend.component.css']
})
export class MapLegendComponent implements OnInit, AfterViewInit {

  mapViewInfo: MapViewInfo[] = [];
  @ViewChild('mapLegend') mapLegend: any;
  @ViewChild('mapLayerLegend') mapLayerLegend: any;
  @ViewChild('mapSublayerLegend') mapSublayerLegend: any;

  constructor(private mapService: MapService) { }

  ngAfterViewInit(): void {
    this.mapService.getMapViewInfo().subscribe(info => {
      this.mapViewInfo = info;
    }, error => {
      console.log(error);
    });
  }

  ngOnInit(): void {

  }



}
