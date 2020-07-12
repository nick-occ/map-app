import {Component, Input, OnInit} from '@angular/core';
import {MapService} from '../shared/map.service';
import {MapTool} from '../shared/models/map-tool';

@Component({
  selector: 'app-map-menubar',
  templateUrl: './map-menubar.component.html',
  styleUrls: ['./map-menubar.component.css']
})
export class MapMenubarComponent implements OnInit {
  @Input() projectName = '';

  constructor(private mapService: MapService) { }

  ngOnInit() {}

  getMapTools(): MapTool[] {
    return this.mapService.mapTools;
  }
}
