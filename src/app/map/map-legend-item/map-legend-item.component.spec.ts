import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapLegendItemComponent } from './map-legend-item.component';

describe('MapLegendItemComponent', () => {
  let component: MapLegendItemComponent;
  let fixture: ComponentFixture<MapLegendItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapLegendItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapLegendItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
