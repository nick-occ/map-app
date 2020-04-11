import {AfterContentChecked, AfterViewInit, Component, OnChanges, OnInit, SimpleChanges, Input} from '@angular/core';
import { MapService } from '../shared/map.service';
import { MapIdentifyResultsComponent } from '../map-identify-results/map-identify-results.component';

@Component({
  selector: 'app-map-identify-panel',
  templateUrl: './map-identify-panel.component.html',
  styleUrls: ['./map-identify-panel.component.css']
})
export class MapIdentifyPanelComponent implements OnInit, OnChanges {

  idPrevVisRec: string;
  idNextVisRec: string;
  @Input() idResults = [];
  @Input() currentMapName = '';
  @Input() currentResult: any;
  @Input() totalResults = 0;

  constructor(private mapService: MapService) {}

  ngOnInit() {}


  ngOnChanges(changes: SimpleChanges): void {
    // console.log('changes', changes);
    this.setRecButtonVis();
  }

  recClick(record: string): void {
    switch (record) {
      case 'prev': {
        this.mapService.idRecord -= 1;
        break;
      }
      case 'next': {
        this.mapService.idRecord += 1;
        break;
      }
    }
    this.currentResult = this.idResults[this.mapService.idRecord].result;
    this.currentMapName = this.idResults[this.mapService.idRecord].mapName;
    this.setRecButtonVis();
  }

  setRecButtonVis(): void {
    this.idPrevVisRec = this.mapService.idRecord > 0 ? 'visible' : 'hidden';
    this.idNextVisRec = this.mapService.idRecord < (this.totalResults - 1) ? 'visible' : 'hidden';
  }

}
