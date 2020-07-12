import {AfterContentInit, AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {loadModules} from 'esri-loader';
import {MapService} from '../shared/map.service';
import {Map} from '../shared/models/map';


@Component({
  selector: 'app-map-edit-panel',
  templateUrl: './map-edit-panel.component.html',
  styleUrls: ['./map-edit-panel.component.css']
})
export class MapEditPanelComponent implements OnInit, AfterViewInit, OnDestroy {

  editMaps: Map[];
  selectedValue: number;
  featureLayerList: any;
  constructor(private mapService: MapService) { }

  ngOnInit(): void {
  }

  async ngAfterViewInit() {
    const [FeatureLayer, Editor] =
      await loadModules([
        'esri/layers/FeatureLayer',
        'esri/widgets/Editor'
      ]);
    this.mapService.getEditMaps().subscribe(em => this.editMaps = em);
    this.selectedValue = this.editMaps[0].mapId;
    console.log(this.selectedValue);
    this.addFeatureLayer();



    const editor = new Editor({
      view: this.mapService.mapView,
      container: 'editorDiv',
      allowedWorkflows: ['create', 'update']
    });
  }

  async selectionChanged(val) {
    console.log(val);
    this.addFeatureLayer();
  }

  async addFeatureLayer() {
    const [
      MapImageLayer,
      FeatureLayer] =
      await loadModules([
        'esri/layers/MapImageLayer',
        'esri/layers/FeatureLayer'
      ]);
    this.removeFeatureLayers();

    this.editMaps.filter(map => map.mapId === this.selectedValue).forEach(map => {
      // TODO: store somewhere
      this.mapService.getMapInfo(map.url).subscribe(m => {
        this.featureLayerList = m.layers.map(layer => {
          return new FeatureLayer({
            url: `${map.url}/${layer.id}`,
            id: 'edit-layers'
          });
        });
        this.mapService.esriMap.addMany(this.featureLayerList);
        console.log(this.mapService.esriMap);
      });
    });
  }

  removeFeatureLayers() {
    this.mapService.esriMap.removeMany(this.featureLayerList);
  }

  ngOnDestroy() {
    this.removeFeatureLayers();
  }

}
