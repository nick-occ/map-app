import {Component, Inject, OnInit} from '@angular/core';

'../map.component';
import { MapIdentify } from '../shared/map-identify';
import {MatDialogRef} from "@angular/material/dialog";
@Component({
  selector: 'app-map-identify',
  templateUrl: './map-identify.component.html',
  styleUrls: ['./map-identify.component.css']
})
export class MapIdentifyComponent implements OnInit {

  results: MapIdentify;

  constructor() { }

  ngOnInit() {}
}
