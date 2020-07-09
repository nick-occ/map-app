import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MapSearchResult} from '../shared/models/map-search-result';
import {MapService} from '../shared/map.service';

@Component({
  selector: 'app-map-results-panel',
  templateUrl: './map-results-panel.component.html',
  styleUrls: ['./map-results-panel.component.css']
})
export class MapResultsPanelComponent implements OnInit {

  result: MapSearchResult;

  constructor(private mapService: MapService) { }

  ngOnInit(): void { }

  getResult(): MapSearchResult {
    return this.mapService.searchResult;
  }

  showSearch(): boolean {
    return this.mapService.searchShow;
  }

  closeSearch(): void {
    this.mapService.searchShow = false;
    this.mapService.mapView.graphics.removeAll();
  }
}
