import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map-identify-results-table',
  templateUrl: './map-identify-results-table.component.html',
  styleUrls: ['./map-identify-results-table.component.css']
})
export class MapIdentifyResultsTableComponent implements OnInit {
  idColumns = ['Field', 'Value'];
  idSource = [];

  constructor() { }

  ngOnInit(): void {
  }

}
