import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapEditPanelComponent } from './map-edit-panel.component';

describe('MapEditPanelComponent', () => {
  let component: MapEditPanelComponent;
  let fixture: ComponentFixture<MapEditPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapEditPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapEditPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
