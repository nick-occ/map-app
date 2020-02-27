import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapIdentifyComponent } from './map-identify.component';

describe('MapIdentifyComponent', () => {
  let component: MapIdentifyComponent;
  let fixture: ComponentFixture<MapIdentifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapIdentifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapIdentifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
