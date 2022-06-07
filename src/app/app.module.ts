import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {LayerListComponent} from "./components/layer-list/layer-list.component";
import { MapComponent } from './components/map/map.component';
import { AttributeTableComponent } from './components/attribute-table/attribute-table.component';
import {MatIconModule} from "@angular/material/icon";
import { MapToolbarComponent } from './components/map-toolbar/map-toolbar.component';

@NgModule({
  declarations: [
    AppComponent,
    LayerListComponent,
    MapComponent,
    AttributeTableComponent,
    MapToolbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
