import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MapToolCategory} from "../shared/map-tool-category.enum";
import {MapTool} from "../shared/map-tool";
import {MatButtonToggle} from "@angular/material/button-toggle";
import {MapService} from "../shared/map.service";

@Component({
  selector: 'app-map-menubar-item',
  templateUrl: './map-menubar-item.component.html',
  styleUrls: ['./map-menubar-item.component.css']
})
export class MapMenubarItemComponent implements OnInit {
  @Input() tool: MapTool;
  @ViewChild('buttonToggle') buttonToggle: MatButtonToggle;

  constructor(private mapService: MapService) { }

  ngOnInit(): void {
  }

  buttonClick() {
    this.mapService.toggleButtons[this.tool.name] = this.buttonToggle.checked;
  }

}
