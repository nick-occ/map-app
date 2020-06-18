import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MapService} from "../shared/map.service";

@Component({
  selector: 'app-map-legend-item-layers',
  templateUrl: './map-legend-item-layers.component.html',
  styleUrls: ['./map-legend-item-layers.component.css']
})
export class MapLegendItemLayersComponent implements OnInit {
  @Input() layer: {
    layerId: number;
    layerName: string;
    visible: boolean;
    sublayers: [];
  };
  @Input() mapUrl: string;
  @Input() mapType: string;
  @ViewChild('mapLayerLegend') mapLayerLegend: any;

  constructor(private mapService: MapService) { }

  ngOnInit(): void {
  }

  mapLegendChanged() {
    // console.log(this.mapUrl);
    // console.log(this.mapService.mapView);
    const output = this.mapService.mapView.layerViews.items.filter(item => {
      return item.layer.url === this.mapUrl;
    }).map(item => {
      // console.log(item.layer);
      return item.layer.sublayers.items.filter(layer => {
        return layer.id === this.layer.layerId;
      }).map(layer => {
        return layer.visible = this.mapLayerLegend.nativeElement.checked;
      });
    });
  }

}
