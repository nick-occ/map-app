import {Injectable} from '@angular/core';
import {from, Observable, of, Subject} from 'rxjs';

import {Map} from './map';
import {Project} from './project';

import {MAPS} from './mock-map';
import {PROJECT} from './mock-project';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  idPanelHidden = true;
  idResults: MapIdentify[] = [];
  idData: [];
  idRecord = 0;
  idTaskRec = 0;
  mapName = 'Testing';
  testData = '1';
  testSubject = new Subject();
  currentMapName = '';

  constructor() { }

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
}
