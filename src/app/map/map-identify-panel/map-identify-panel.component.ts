import { Component, OnInit } from '@angular/core';

import { MapService } from '../shared/map.service';

@Component({
  selector: 'app-map-identify-panel',
  templateUrl: './map-identify-panel.component.html',
  styleUrls: ['./map-identify-panel.component.css']
})
export class MapIdentifyPanelComponent implements OnInit {

  idPanelHidden: boolean;

  constructor(private mapService: MapService) {

  }

  ngOnInit() {
    this.idPanelHidden = this.mapService.getIdPanelHidden();
  }

}
