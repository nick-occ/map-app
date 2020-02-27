import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { MapMenubarComponent } from './map/map-menubar/map-menubar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MapIdentifyComponent } from './map/map-identify/map-identify.component';
import { MapIdentifyDialogComponent } from './map/map-identify/map-identify-dialog/map-identify-dialog.component';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import {FormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    MapMenubarComponent,
    MapIdentifyComponent,
    MapIdentifyDialogComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    BrowserAnimationsModule,
    MatDialogModule,
    FormsModule,
    MatInputModule
  ],
  entryComponents: [
    MapIdentifyDialogComponent
  ],
  providers: [
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { appearance: 'fill'}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
