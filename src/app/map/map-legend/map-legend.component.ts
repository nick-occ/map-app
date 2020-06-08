import {Component, OnInit, AfterContentInit, OnChanges, SimpleChanges} from '@angular/core';
import {loadModules} from 'esri-loader';
import {MapService} from '../shared/map.service';

@Component({
  selector: 'app-map-legend',
  templateUrl: './map-legend.component.html',
  styleUrls: ['./map-legend.component.css']
})
export class MapLegendComponent implements OnInit, AfterContentInit {

  constructor(private mapService: MapService) { }

  ngAfterContentInit(): void {
    this.mapService.legendOpen = true;
  }

  ngOnInit(): void {

  }



}
