import { Component, OnInit } from '@angular/core';
import {MapService} from "../shared/map.service";
import {MapSearchResults} from "../shared/map-search-results";

@Component({
  selector: 'app-map-search-items',
  templateUrl: './map-search-items.component.html',
  styleUrls: ['./map-search-items.component.css']
})
export class MapSearchItemsComponent implements OnInit {

  constructor(private mapService: MapService) { }

  ngOnInit(): void {
  }

  layerClick(feature): void {
    this.mapService.highlightFeature(feature, feature.geometryType, true);
  }

  getSearchResults(): MapSearchResults[] {
    return this.mapService.searchResults;
  }

}
