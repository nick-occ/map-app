import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapIdentifyResultsComponent } from './map-identify-results.component';

describe('MapIdentifyResultsComponent', () => {
  let component: MapIdentifyResultsComponent;
  let fixture: ComponentFixture<MapIdentifyResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapIdentifyResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapIdentifyResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
