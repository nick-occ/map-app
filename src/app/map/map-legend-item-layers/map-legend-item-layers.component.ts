import {AfterContentInit, AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {MapService} from '../shared/map.service';
import {MapLayer} from '../shared/models/map-layer';
import {MapLegend} from '../shared/models/map-legend';
import {MapViewInfo} from '../shared/models/map-view-info';

@Component({
  selector: 'app-map-legend-item-layers',
  templateUrl: './map-legend-item-layers.component.html',
  styleUrls: ['./map-legend-item-layers.component.css']
})
export class MapLegendItemLayersComponent implements OnInit, AfterContentInit, AfterViewInit {
  @Input() layer: MapLayer;
  @Input() mapUrl: string;
  @Input() mapType: string;
  @ViewChild('mapLayerLegend') mapLayerLegend: any;
  imageProperty = 'data:image/png;base64';
  legend: MapLegend[];

  constructor(private mapService: MapService) { }

  ngOnInit() { }

  ngAfterContentInit() {
    this.mapService.getLayerLegendItem(this.mapUrl, this.layer.layerId).forEach(item => {
      this.legend = item.legend;
    });
  }

  ngAfterViewInit() {
    // create array of layer objects with elements to reference
    this.mapService.mapLayerLegendElements.push({
      mapUrl: this.mapUrl,
      layerId: this.layer.layerId,
      element: this.mapLayerLegend
    });
  }

  layerChanged() {
    for (const map of this.mapService.mapView.layerViews.items) {
      if (map.layer.url === this.mapUrl) {
        // if map is found loop through all the layers
        for (const item of map.layer.allSublayers.items) {
          // match by layerId
          if (item.id === this.layer.layerId) {
            // set the visibility based on checked property of the checkbox
            item.visible = this.mapLayerLegend.nativeElement.checked;
            // see if there are sublayers under the layer
            // only if the checked state is true will we change sublayer checked state
            if (item.sublayers && this.mapLayerLegend.nativeElement.checked === true) {
              // loop through sublayers
              for (const subItem of item.sublayers.items) {
                // get the matching map and layer id of the sublayer
                this.mapService.mapLayerLegendElements.filter(m => m.mapUrl === this.mapUrl
                  && m.layerId === subItem.id)
                  .forEach(subLayer => {
                    // set the checked property
                    subLayer.element.nativeElement.checked = this.mapLayerLegend.nativeElement.checked;
                });
                // set the visibility of the sublayer
                subItem.visible = this.mapLayerLegend.nativeElement.checked;
              }
            } else if (!item.sublayers && this.mapLayerLegend.nativeElement.checked === true) {
              this.mapService.mapLayerLegendElements.filter(m => m.layerId === this.layer.parentId)
                .forEach(parent => {
                  parent.element.nativeElement.checked = this.mapLayerLegend.nativeElement.checked;
                });

              for (const lyr of map.layer.allSublayers.items) {
                // match by parentId
                if (lyr.id === this.layer.parentId) {
                  // set the visibility based on checked property of the checkbox
                  lyr.visible = this.mapLayerLegend.nativeElement.checked;
                }
              }
            }
            break;
          }
        }
      }
    }
  }
}
