import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { MapMenubarComponent } from './map/map-menubar/map-menubar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatCardModule } from '@angular/material/card';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MapIdentifyPanelComponent } from './map/map-identify-panel/map-identify-panel.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    MapMenubarComponent,
    MapIdentifyPanelComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    BrowserAnimationsModule,
    FormsModule,
    MatInputModule,
    DragDropModule,
    MatCardModule
  ],
  entryComponents: [],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
