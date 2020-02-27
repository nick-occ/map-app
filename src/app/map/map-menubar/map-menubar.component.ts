import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map-menubar',
  templateUrl: './map-menubar.component.html',
  styleUrls: ['./map-menubar.component.css']
})
export class MapMenubarComponent implements OnInit {

  model = {
    left: true,
    middle: false,
    right: false
  };
  constructor() { }

  ngOnInit() {
  }

}
