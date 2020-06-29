import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapSearchItemsComponent } from './map-search-items.component';

describe('MapSearchItemsComponent', () => {
  let component: MapSearchItemsComponent;
  let fixture: ComponentFixture<MapSearchItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapSearchItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapSearchItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
