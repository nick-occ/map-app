import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatButtonToggle} from "@angular/material/button-toggle";
import {MAP_TOOL} from "../shared/mock-map-tool";

@Component({
  selector: 'app-map-menubar',
  templateUrl: './map-menubar.component.html',
  styleUrls: ['./map-menubar.component.css']
})
export class MapMenubarComponent implements OnInit {
  @Input() projectName = '';
  mapTools = MAP_TOOL;

  constructor() { }

  ngOnInit() {
  }

}
