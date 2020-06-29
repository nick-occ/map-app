import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { MapMenubarComponent } from './map/map-menubar/map-menubar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import {MatTableModule} from '@angular/material/table';

import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MapIdentifyPanelComponent } from './map/map-identify-panel/map-identify-panel.component';
import { MapIdentifyResultsComponent } from './map/map-identify-results/map-identify-results.component';
import {MatSortModule} from '@angular/material/sort';
import { MapLegendComponent } from './map/map-legend/map-legend.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { MapMenubarItemComponent } from './map/map-menubar-item/map-menubar-item.component';
import { MapLegendItemComponent } from './map/map-legend-item/map-legend-item.component';

import { HttpClientModule } from '@angular/common/http';
import { MapLegendItemLayersComponent } from './map/map-legend-item-layers/map-legend-item-layers.component';

import { OrderModule } from 'ngx-order-pipe';
import { MapSearchComponent } from './map/map-search/map-search.component';
import { MapSearchItemsComponent } from './map/map-search-items/map-search-items.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    MapMenubarComponent,
    MapIdentifyPanelComponent,
    MapIdentifyResultsComponent,
    MapLegendComponent,
    MapMenubarItemComponent,
    MapLegendItemComponent,
    MapLegendItemLayersComponent,
    MapSearchComponent,
    MapSearchItemsComponent,
  ],
    imports: [
      BrowserModule,
      NgbModule,
      BrowserAnimationsModule,
      FormsModule,
      MatInputModule,
      DragDropModule,
      MatCardModule,
      MatExpansionModule,
      MatTableModule,
      MatSortModule,
      MatSidenavModule,
      MatButtonModule,
      MatMenuModule,
      MatToolbarModule,
      MatButtonToggleModule,
      HttpClientModule,
      OrderModule
    ],
  entryComponents: [],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
