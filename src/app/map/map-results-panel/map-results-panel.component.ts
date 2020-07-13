import {Component, OnInit} from '@angular/core';
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

  openSearch(): boolean {
    return this.mapService.panelVisible.Search;
  }

  closeSearch(): void {
    this.mapService.panelVisible.Search = false;
  }
}
