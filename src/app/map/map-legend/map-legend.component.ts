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

  constructor(private mapService: MapService) { }

  ngAfterViewInit(): void {
    this.mapService.getMapViewInfo().subscribe(info => {
      this.mapViewInfo = info;
      console.log('info', info);
    }, error => {
      console.log(error);
    });
  }

  ngOnInit(): void {

  }



}
