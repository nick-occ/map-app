import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapLegendItemLayersComponent } from './map-legend-item-layers.component';

describe('MapLegendItemLayersComponent', () => {
  let component: MapLegendItemLayersComponent;
  let fixture: ComponentFixture<MapLegendItemLayersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapLegendItemLayersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapLegendItemLayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
