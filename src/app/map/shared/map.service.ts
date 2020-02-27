import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { loadModules, loadCss } from 'esri-loader';

import { Map } from './map';
import { MAPS } from './mock-map';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor() { }

  getMaps(): Observable<Map> {
    return of(MAPS);
  }
}
