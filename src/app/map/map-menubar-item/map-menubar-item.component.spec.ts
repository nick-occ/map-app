import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapMenubarItemComponent } from './map-menubar-item.component';

describe('MapMenubarItemComponent', () => {
  let component: MapMenubarItemComponent;
  let fixture: ComponentFixture<MapMenubarItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapMenubarItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapMenubarItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
