import {Component, Input, OnInit} from '@angular/core';
import {MapService} from '../shared/map.service';
import {MapSearchResult} from '../shared/models/map-search-result';

@Component({
  selector: 'app-map-search-items',
  templateUrl: './map-search-items.component.html',
  styleUrls: ['./map-search-items.component.css']
})
export class MapSearchItemsComponent implements OnInit {
  TRIM_LENGTH = 25;
  @Input() result: MapSearchResult;
  displayName: string;


  constructor(private mapService: MapService) { }

  ngOnInit(): void {
    this.displayName = this.result.attributes[this.result.displayFieldName];
    this.displayName = this.displayName.length > this.TRIM_LENGTH
      ? this.displayName.substr(0, this.TRIM_LENGTH) + '...'
      : this.displayName;
  }

  layerClick(feature): void {
    this.mapService.highlightFeature(feature, feature.geometryType, true);
    this.mapService.searchResult = this.result;
    this.mapService.searchShow = true;
  }
}
