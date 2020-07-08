import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {MapSearchResult} from "../shared/map-search-result";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MapService} from "../shared/map.service";

@Component({
  selector: 'app-map-results',
  templateUrl: './map-results.component.html',
  styleUrls: ['./map-results.component.css']
})
export class MapResultsComponent implements OnInit, OnChanges {

  @Input() result: MapSearchResult;
  displayColumns: string[] = ['field', 'value'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private mapService: MapService) { }

  ngOnChanges(changes: SimpleChanges) {
    this.dataSource = new MatTableDataSource(this.mapService.formatIdAttributes(this.result.attributes));
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
  }

}
