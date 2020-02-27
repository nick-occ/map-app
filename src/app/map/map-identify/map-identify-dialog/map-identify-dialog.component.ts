import {Component, Inject, OnInit} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MapIdentify } from '../../shared/map-identify';

@Component({
  selector: 'app-map-identify-dialog',
  templateUrl: './map-identify-dialog.component.html',
  styleUrls: ['./map-identify-dialog.component.css']
})
export class MapIdentifyDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<MapIdentifyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public results: MapIdentify) { }

    onNoClick(): void {
      this.dialogRef.close();
    }
  ngOnInit() {
  }

}
