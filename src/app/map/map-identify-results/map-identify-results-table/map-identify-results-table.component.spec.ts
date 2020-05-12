import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapIdentifyResultsTableComponent } from './map-identify-results-table.component';

describe('MapIdentifyResultsTableComponent', () => {
  let component: MapIdentifyResultsTableComponent;
  let fixture: ComponentFixture<MapIdentifyResultsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapIdentifyResultsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapIdentifyResultsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
