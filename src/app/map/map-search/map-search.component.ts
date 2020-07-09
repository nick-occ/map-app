import {Component, OnInit, OnChanges, SimpleChanges} from '@angular/core';
import {MapSearchResults} from '../shared/models/map-search-results';
import {MapService} from '../shared/map.service';

@Component({
  selector: 'app-map-search',
  templateUrl: './map-search.component.html',
  styleUrls: ['./map-search.component.css']
})
export class MapSearchComponent implements OnInit {

  constructor(private mapService: MapService) { }

  ngOnInit(): void {
  }

  getSearchResults(): MapSearchResults[] {
    // TODO: show layer name as list item
    return this.mapService.searchResults;
  }

}
