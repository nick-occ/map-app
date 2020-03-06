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

  // getIdResults(idMapParams: any, idMapTask: any): Observable<MapIdentify[]> {
  //   const results: MapIdentify[] = [];
  //   idMapTask.map( task => {
  //     task.execute(idMapParams).then((response: any) => {
  //       results.push(response.results.map( res => {
  //         const mapIdentify = new MapIdentify(
  //           this.getMapByUrl(task.url),
  //           res
  //         );
  //         return of(mapIdentify);
  //       }));
  //     });
  //   });
  //   return of(results);
  // }


  getIdResults(idMapParams: any, idMapTask: any): Observable<any> {
    return idMapTask.map( task => {
      return of({
        mapName: this.getMapByUrl(task.url),
        results: of(task.execute(idMapParams))
      });
    });
  }

  getIdData(observers: Observable<any>): MapIdentify[] {
    const results: MapIdentify[] = [];
    observers.forEach(obs => {
      obs.subscribe({
        next(res) {
          res.results.subscribe(data => {
              data.then(rec => {
                rec.results.forEach(d => {
                  const mapIdentify = new MapIdentify(res.mapName, d);
                  results.push(mapIdentify);
                });
              });
          });
        }
      });
    });
    return results;
  }
}
