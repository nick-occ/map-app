import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapResultsPanelComponent } from './map-results-panel.component';

describe('MapResultsPanelComponent', () => {
  let component: MapResultsPanelComponent;
  let fixture: ComponentFixture<MapResultsPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapResultsPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapResultsPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
