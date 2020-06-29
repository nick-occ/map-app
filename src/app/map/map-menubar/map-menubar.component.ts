import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MapService} from "../shared/map.service";

@Component({
  selector: 'app-map-menubar',
  templateUrl: './map-menubar.component.html',
  styleUrls: ['./map-menubar.component.css']
})
export class MapMenubarComponent implements OnInit {
  @Input() projectName = '';
  mapTools = this.mapService.mapTools;

  constructor(private mapService: MapService) { }

  ngOnInit() {
  }

}
