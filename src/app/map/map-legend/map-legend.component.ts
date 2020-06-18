import {
  Component,
  OnInit,
  AfterViewInit,
  OnChanges,
  SimpleChanges,
  Input,
  ViewChild,
  ElementRef,
  Renderer2,
  RendererFactory2,
  RendererType2,
  TemplateRef,
  ViewChildren,
  ContentChild,
  Directive,
  AfterContentInit,
  ViewRef, Inject
} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {loadModules} from 'esri-loader';
import {MapService} from '../shared/map.service';
import {MapViewInfo} from "../shared/map-view-info";


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
      console.log('info', info);
    }, error => {
      console.log(error);
    });
  }


  mapLegendChanged(evt): void {
    console.log(evt.target.checked);
    console.log(this.mapService.mapView);
    console.log(evt);
    this.mapService.mapView.layerViews.items[0].visible = evt.target.checked;
  }

  mapLayerLegendChanged(evt): void {
    console.log(evt.target.checked);
  }

  mapSublayerLegendChanged(evt): void {
    console.log(evt.target.checked);
  }

  ngOnInit(): void {

  }



}
