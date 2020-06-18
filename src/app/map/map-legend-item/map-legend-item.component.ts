import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MapService} from "../shared/map.service";

@Component({
  selector: 'app-map-legend-item',
  templateUrl: './map-legend-item.component.html',
  styleUrls: ['./map-legend-item.component.css']
})
export class MapLegendItemComponent implements OnInit {
  @Input() item: {
    visible: boolean;
    mapName: string;
    mapUrl: string;
    mapType: string;
    layers: [];
  };
  @ViewChild('mapLegend') mapLegend: any;
  constructor(private mapService: MapService) { }

  ngOnInit(): void {
  }

  mapLegendChanged(legend): void {
    this.mapService.mapView.layerViews.items.filter(item => item.layer.url === legend.mapUrl)
      .forEach(item => item.visible = this.mapLegend.nativeElement.checked);
  }

}
