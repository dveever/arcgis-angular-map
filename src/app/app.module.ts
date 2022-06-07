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
import {MatMenuModule} from "@angular/material/menu";
import {MatButtonModule} from "@angular/material/button";
import { FeatureNotImplementedComponent } from './components/feature-not-implemented/feature-not-implemented.component';
import {MatDialogModule} from "@angular/material/dialog";

@NgModule({
  declarations: [
    AppComponent,
    LayerListComponent,
    MapComponent,
    AttributeTableComponent,
    MapToolbarComponent,
    FeatureNotImplementedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
