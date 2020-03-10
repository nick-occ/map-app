import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapIdentifyPanelComponent } from './map-identify-panel.component';

describe('MapIdentifyPanelComponent', () => {
  let component: MapIdentifyPanelComponent;
  let fixture: ComponentFixture<MapIdentifyPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapIdentifyPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapIdentifyPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
