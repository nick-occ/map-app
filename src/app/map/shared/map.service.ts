import {Injectable} from '@angular/core';
import {from, Observable, of, Subject, Subscription} from 'rxjs';

import {Map} from './models/map';
import {Project} from './models/project';

import {MAPS} from './mocks/mock-map';
import {MAP_PANEL_VISIBLE, MAP_TOGGLE, MAP_TOOL} from './mocks/mock-map-tool';
import {PROJECT} from './mocks/mock-project';
import {map, subscribeOn} from 'rxjs/operators';
import {MapToggle, MapTool} from './models/map-tool';
import {HttpClient} from '@angular/common/http';
import {MapViewInfo} from './models/map-view-info';
import {MapView} from './models/map-view';
import {MapLayer} from './models/map-layer';
import {MapSearchResults} from './models/map-search-results';
import {loadModules} from 'esri-loader';
import {MapSearchResult} from './models/map-search-result';
import {MatButtonToggle} from '@angular/material/button-toggle';
import {MapToolCategory} from './enums/map-tool-category.enum';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  idRecord = 0;
  esriMap: any;
  mapView: any;
  maps: Map[];
  project: Project;
  toggleButtons = MAP_TOGGLE;
  panelVisible = MAP_PANEL_VISIBLE;
  mapTools: MapTool[];
  mapViewInfo: MapViewInfo[] = [];
  mapLegendItems: {
    mapUrl: string,
    layerId: number,
    layerName: string,
    legend: []
  }[] = [];
  searchResults: MapSearchResults[] = [];
  searchResult: MapSearchResult;
  mapLayerLegendElements: {
    mapUrl: string;
    layerId: number;
    element: any;
  }[] = [];

  constructor(private http: HttpClient) { }

  getMaps(): Observable<Map[]> {
    return of(MAPS.filter( m => this.project.maps.includes(m.mapId)));
  }

  getEditMaps(): Observable<Map[]> {
    return of(MAPS.filter( m => this.project.editMaps.includes(m.mapId)));
  }

  getMapByUrl(url: string): Map {
    return this.maps.filter(m => m.url === url).reduce((acc: any, it: Map) => it, { });
  }

  getProject(id: number): Observable<Project> {
    return of(PROJECT.filter((project) => project.projectId === id).reduce((acc: any, it: Project) => it, { }));
  }

  getMapTools(): Observable<MapTool[]> {
    return of(MAP_TOOL.filter(tool => this.project.mapTools.includes(tool.category)));
  }

  getIdResults(idMapParams: any, idMapTask: any): Observable<any> {
    return from(idMapTask.map(task => {
      return this.getIdResult(task.execute(idMapParams), this.getMapByUrl(task.url).name);
    }));
  }

  getIdResult(promise, mapName): any {
    return from(promise).pipe(map(res => this.getIdData(res, mapName)));
  }

  getIdData(data, mapName): any {
    return data.results.map(result => {
      return {mapName, result};
    });
  }

  formatIdAttributes(attributes): any {
    return Object.entries(attributes).map(attribute => {
      return {field: attribute[0], value: attribute[1]};
    });
  }

  setMapViewInfo(layer, map): any {
    const layerItem: MapViewInfo = {
      mapName: layer.title,
      mapUrl: layer.url,
      mapType: map.mapType,
      visible: layer.visible,
      layers: this.getLayers(layer.sublayers.items, layer.url)
    };
    this.mapViewInfo.push(layerItem);
  }

  getLayers(layers: [], mapUrl): MapLayer[] {
    return layers.map((layer: any) => {
      const layerObj: MapLayer = {
        layerName: layer.title,
        layerId: layer.id,
        visible: layer.visible,
      };

      if (layer.sublayers !== null) {
        layerObj.sublayers = layer.sublayers.items.map(item => {
          return {
            layerName: item.title,
            layerId: item.id,
            visible: item.visible,
            parentId: layer.id
          };
        });
      }
      return layerObj;
    });
  }

  getMapViewInfo(): Observable<any> {
    return of(this.mapViewInfo);
  }

  getMapLegend(url): Observable<any> {
    return this.http.get(`${url}/legend?f=json`);
  }

  getMapInfo(url): Observable<any> {
    return this.http.get(`${url}?f=json`);
  }

  getLayerLegendItem(mapUrl: string, layerId: number): any {
    return this.mapLegendItems.filter(item => item.mapUrl === mapUrl && item.layerId === layerId);
  }

  getLayerIds(url): any {
    let layers: number[];
    const subLayers = [];
    this.mapViewInfo.filter(m => m.mapUrl === url).map((m) => {
      layers = m.layers.map(layer => layer.layerId);

      m.layers.filter(layer => layer.sublayers)
        .forEach(layer => {
          layer.sublayers.forEach(subLayer => {
            subLayers.push(subLayer.layerId);
          });
        });
    });
    return layers.concat(subLayers);
  }

  getSearchResults(searchTerm): Observable<any> {
    this.searchResults = [];
    return of(this.mapViewInfo.map(m => {
      const formData = new FormData();
      formData.append('searchText', searchTerm);
      formData.append('contains', 'true');
      formData.append('returnGeometry', 'true');
      formData.append('layers', this.getLayerIds(m.mapUrl));
      formData.append('sr', '102100');
      formData.append('f', 'pjson');
      return {
        mapUrl: m.mapUrl,
        mapName: m.mapName,
        results: this.http.post(`${m.mapUrl}/find`, formData)
      };
    }));
  }

  setLegendToggle(): void {
    this.toggleButtons.Legend = true;
  }

  setToggleButton(name: string, state: boolean): void {
    this.toggleButtons[name] = state;
  }

  getToggleState(name: string): boolean {
    return this.toggleButtons[name];
  }

  removeGraphics() {
    this.mapView.graphics.removeAll();
  }

  // @ts-ignore
  async highlightFeature(feature, geometryType, zoom= false): void {

    const [Graphic, Point, Polyline, Polygon, projection, SpatialReference, Extent, webMercatorUtils] =
      await loadModules([
        'esri/Graphic',
        'esri/geometry/Point',
        'esri/geometry/Polyline',
        'esri/geometry/Polygon',
        'esri/geometry/projection',
        'esri/geometry/SpatialReference',
        'esri/geometry/Extent',
        'esri/geometry/support/webMercatorUtils']);

    let symbol = null;
    let geometry = null;
    if (['polygon', 'esriGeometryPolygon'].includes(geometryType)) {
      symbol = {
        type: 'simple-fill',
        color: [255, 0, 0, 0.5],
        style: 'solid',
        outline: {
          color: 'white',
          width: 1
        }
      };

      geometry = new Polygon(feature.geometry);
    } else if (['polyline', 'esriGeometryPolyline'].includes(geometryType)) {
        symbol = {
          type: 'simple-line',
          color: 'orange',
          width: '5px',
          style: 'short-dot'
        };
        geometry = new Polyline(feature.geometry);
      } else if (['point', 'esriGeometryPoint'].includes(geometryType)) {
        symbol = {
          type: 'simple-marker',
          style: 'circle',
          color: 'red',
          size: '20px',
          outline: {
            color: [255, 255, 0, 0.5],
            width: 3
          }
        };
        geometry = new Point(feature.geometry);
      }

    const graphic = new Graphic({
      symbol,
      geometry
    });

    this.mapView.graphics.add(graphic);

    if (zoom) { this.zoomToFeature(graphic); }
  }

  zoomToFeature(feature) {
    this.mapView.goTo(feature);
  }

  toggleButton(button: MapTool, state: boolean) {
    this.toggleButtons[button.name] = state;
    if (button.togglePanel || !state) { this.panelVisible[button.name] = state; }

    // uncheck buttons as needed
    if (button.uncheck && state) {
      this.mapTools.filter(tool => button.uncheck.includes(tool.id)).forEach(tool => {
        this.toggleButtons[tool.name] = false;
        if (button.hasPanel) {
          this.panelVisible[tool.name] = false;
        }
      });
    }
  }
}


