import {Component, OnInit, AfterViewInit, OnChanges, SimpleChanges, Input} from '@angular/core';
import {loadModules} from 'esri-loader';
import {MapService} from '../shared/map.service';

@Component({
  selector: 'app-map-legend',
  templateUrl: './map-legend.component.html',
  styleUrls: ['./map-legend.component.css']
})
export class MapLegendComponent implements OnInit, AfterViewInit {

  constructor(private mapService: MapService) { }

  ngAfterViewInit(): void {}

  ngOnInit(): void {

  }



}
