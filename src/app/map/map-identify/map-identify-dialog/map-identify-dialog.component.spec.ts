import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapIdentifyDialogComponent } from './map-identify-dialog.component';

describe('MapIdentifyDialogComponent', () => {
  let component: MapIdentifyDialogComponent;
  let fixture: ComponentFixture<MapIdentifyDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapIdentifyDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapIdentifyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
