import { Component, OnInit } from '@angular/core';
import { MapService } from '../shared/map.service';

@Component({
  selector: 'app-map-identify-results',
  templateUrl: './map-identify-results.component.html',
  styleUrls: ['./map-identify-results.component.css']
})
export class MapIdentifyResultsComponent implements OnInit {

  constructor(private mapService: MapService) { }

  ngOnInit() {

  }

}
