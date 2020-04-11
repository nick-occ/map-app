import {Component, OnInit, Input, AfterViewChecked, AfterContentChecked, OnChanges, SimpleChanges} from '@angular/core';
import { MapService } from '../shared/map.service';

@Component({
  selector: 'app-map-identify-results',
  templateUrl: './map-identify-results.component.html',
  styleUrls: ['./map-identify-results.component.css']
})
export class MapIdentifyResultsComponent implements OnInit, OnChanges {

  @Input() currentMapName = '';
  @Input() currentResult = {
      layerName: ''
  };
  layerName: string;
  // attributes = {};

  constructor(private mapService: MapService) { }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes', changes);
    this.layerName = this.currentResult.layerName;
  }

  ngOnInit() {

  }

}
