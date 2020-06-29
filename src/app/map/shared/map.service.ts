import {Injectable} from '@angular/core';
import {from, Observable, of, Subject, Subscription} from 'rxjs';

import {Map} from './map';
import {Project} from './project';

import {MAPS} from './mock-map';
import {MAP_TOGGLE, MAP_TOOL} from './mock-map-tool';
import {PROJECT} from './mock-project';
import {map, subscribeOn} from 'rxjs/operators';
import {MapToggle} from './map-tool';
import {HttpClient} from '@angular/common/http';
import {MapViewInfo} from './map-view-info';
import {MapView} from './map-view';
import {MapLayer} from './map-layer';
import {MapSearchResults} from './map-search-results';
import {loadModules} from 'esri-loader';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  idRecord = 0;
  idShow = false;
  // mapView: {graphics: {add, removeAll}, goTo, ui, layerViews: {items}, width, height, on};
  mapView: any;
  toggleButtons = MAP_TOGGLE;
  mapTools = MAP_TOOL;
  mapViewInfo: MapViewInfo[] = [];
  mapLegendItems: {
    mapUrl: string,
    layerId: number,
    layerName: string,
    legend: []
  }[] = [];
  searchResults: MapSearchResults[] = [];

  constructor(private http: HttpClient) { }

  getMaps(ids: number[]): Observable<Map[]> {
    return of(MAPS.filter( map => ids.includes(map.mapId)));
  }

  getMapByUrl(url: string): string {
    return MAPS.filter(map => map.url === url)[0].name;
  }

  getProject(id: number): Observable<Project> {
    return of(PROJECT.filter((project) => project.projectId === id)[0]);
  }

  getIdResults(idMapParams: any, idMapTask: any): Observable<any> {
    return from(idMapTask.map(task => {
      return this.getIdResult(task.execute(idMapParams), this.getMapByUrl(task.url));
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

  showIdentify(show= false): void {
    this.idShow = show;
    this.mapView.graphics.removeAll();
  }

  getLegend(url): Observable<any[]> {
    return this.http.get<any[]>(url);
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
            visible: item.visible
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

    this.mapView.graphics.removeAll();

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
        console.log(geometry);
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
}


