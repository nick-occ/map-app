import {
  Component,
  OnInit,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { MapService } from '../shared/map.service';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatExpansionPanel} from '@angular/material/expansion';

export interface IdData {
  field: string;
  value: any;
}

@Component({
  selector: 'app-map-identify-results',
  templateUrl: './map-identify-results.component.html',
  styleUrls: ['./map-identify-results.component.css']
})
export class MapIdentifyResultsComponent implements OnInit, OnChanges {

  @Input() currentMapName = '';
  @Input() currentResult = {
    layerName: '',
    feature: {
      attributes: {}
    }
  };
  layerName: string;
  attributes: {};
  displayColumns: string[] = ['field', 'value'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private mapService: MapService) { }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes', changes);
    this.layerName = this.currentResult.layerName;
    this.attributes = this.currentResult.feature.attributes;
    this.dataSource = new MatTableDataSource(this.mapService.formatIdAttributes(this.attributes));
    this.dataSource.sort = this.sort;
  }

  ngOnInit() {  }

}
