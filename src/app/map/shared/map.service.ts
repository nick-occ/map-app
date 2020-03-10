import { Injectable } from '@angular/core';
import { Observable, of, from } from 'rxjs';
import { loadModules, loadCss } from 'esri-loader';

import { Map } from './map';
import { Project } from './project';
import { MapIdentify } from './map-identify';

import { MAPS } from './mock-map';
import {PROJECT} from './mock-project';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  idPanelHidden = true;
  idResults: MapIdentify[];
  idRecord = 0;

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




  getIdTasks(idMapParams: any, idMapTask: any): Observable<any> {
    return idMapTask.map( task => {
      return of({
        mapName: this.getMapByUrl(task.url),
        results: of(task.execute(idMapParams))
      });
    });
  }

  // getIdData(observers: Observable<any>): MapIdentify[] {
  //   observers.forEach(obs => {
  //     obs.subscribe({
  //       next(res) {
  //         res.results.subscribe(data => {
  //             data.then(rec => {
  //               rec.results.forEach(d => {
  //                 this.mapIdResults.push(new MapIdentify(res.mapName, d));
  //                 console.log('1', this.mapIdResults.length);
  //               });
  //             });
  //         });
  //       }
  //     });
  //   });
  //   console.log('2', this.mapIdResults.length);
  //   return this.mapIdResults;
  // }

  getIdPanelHidden(): boolean {
    return this.idPanelHidden;
  }

  setIdPanelHidden(state): boolean {
    return this.idPanelHidden = state;
  }

  getCurrentMapName(): string {
    if (this.idResults) {
      return this.idResults[this.idRecord].mapName;
    }
  }

}
