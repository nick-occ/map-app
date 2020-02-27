import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapMenubarComponent } from './map-menubar.component';

describe('MapMenubarComponent', () => {
  let component: MapMenubarComponent;
  let fixture: ComponentFixture<MapMenubarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapMenubarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapMenubarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
