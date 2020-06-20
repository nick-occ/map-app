import {AfterContentInit, AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {MapService} from '../shared/map.service';
import {MapLayer} from "../shared/map-layer";
import {MapLegend} from "../shared/map-legend";

@Component({
  selector: 'app-map-legend-item-layers',
  templateUrl: './map-legend-item-layers.component.html',
  styleUrls: ['./map-legend-item-layers.component.css']
})
export class MapLegendItemLayersComponent implements OnInit, AfterContentInit {
  @Input() layer: MapLayer;
  @Input() mapUrl: string;
  @Input() mapType: string;
  @ViewChild('mapLayerLegend') mapLayerLegend: any;
  imageProperty = 'data:image/png;base64';
  imageSrc = `${this.imageProperty},iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAA7EAAAOxAGVKw4bAAABwUlEQVQ4ja3UsWsTYRjH8e9zd+mgtmkqFLVCI4IO6r/gVnFwaIdmEbRtqoiLaLVXxSFbbEqdXETT1ri1myCdVNDJyVGQIq0gSkHzGhcred/HQVtybY40h7/p4O79vL/nXngD/nOCVh+YmfEjCv2irsM6/3PPr773Uii4tkAtDHeYvfuuqMpVVXccQAHPs5g9n9arpbGnfr1e7LpT+dYSrBZHssb3nqGckuYleoEJGwSjZjqf6w7LL2LB9dLIAfDeAIfjRmpIj4oum5nRs9235l82BVNIZZfY1hJVWfxxP38sfaP8PQKa6fEBxQ20gW1mv60TAmEEVNELCTAABD2vypQI2jCyOw0xx9A6fbV7+aNQXmkA5WBSDcClOAQ0gvwGUklBT90GRE5ZV0FOJAU3VNcioMKyQDJQedcbLnyNgL71Hjpfr5FkbJEHm49bYPp2ecWUxmYVptorx9tMtvZkBwiQzv68a1Y7TwLndul9tKlgSHJLtikouSWri8OD1bXOoijXt7/fVu25b+sXM5NzkRtnx4J/u03WZi89ttZeBs4A/fz9t1+A1yiVTDj3qtk+sQ26Jh59AG7GNoxJyxu73fwBwnqW1fDZDiEAAAAASUVORK5CYII=`;
  legend: MapLegend[];

  constructor(private mapService: MapService) { }

  ngOnInit() { }

  ngAfterContentInit() {
    this.mapService.getLayerLegendItem(this.mapUrl, this.layer.layerId).forEach(item => {
      console.log(item.legend);
      this.legend = item.legend;
    });
  }

  mapLegendChanged() {
    return this.mapService.mapView.layerViews.items.filter(item => {
      return item.layer.url === this.mapUrl;
    }).map(item => {
      return item.layer.sublayers.items.filter(layer => {
        return layer.id === this.layer.layerId;
      }).map(layer => {
        return layer.visible = this.mapLayerLegend.nativeElement.checked;
      });
    });
  }

}
