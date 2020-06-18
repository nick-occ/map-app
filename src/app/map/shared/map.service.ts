import {Injectable} from '@angular/core';
import {from, Observable, of, Subject, Subscription} from 'rxjs';

import {Map} from './map';
import {Project} from './project';

import {MAPS} from './mock-map';
import {MAP_TOGGLE} from './mock-map-tool';
import {PROJECT} from './mock-project';
import {map} from 'rxjs/operators';
import {MapToggle} from './map-tool';
import {HttpClient} from '@angular/common/http';
import {MapViewInfo} from './map-view-info';
import {MapView} from './map-view';
import {MapLayer} from './map-layer';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  idRecord = 0;
  idShow = false;
  // mapView: {graphics: {add, removeAll}, goTo, ui, layerViews: {items}, width, height, on};
  mapView: any;
  toggleButtons = MAP_TOGGLE;
  mapViewInfo: MapViewInfo[] = [];

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
      layers: this.getLayers(layer.sublayers.items)
    };
    this.mapViewInfo.push(layerItem);
  }

  getLayers(layers: []): MapLayer[] {
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

}
