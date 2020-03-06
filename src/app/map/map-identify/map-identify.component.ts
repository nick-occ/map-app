import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

import { MapIdentify } from '../shared/map-identify';
import {Observable} from "rxjs";
@Component({
  selector: 'app-map-identify',
  templateUrl: './map-identify.component.html',
  styleUrls: ['./map-identify.component.css']
})
export class MapIdentifyComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<MapIdentifyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MapIdentifyComponent) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


  ngOnInit() {}
}
