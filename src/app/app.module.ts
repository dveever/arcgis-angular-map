import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {LayerListComponent} from "./components/layer-list/layer-list.component";
import { MapComponent } from './components/map/map.component';
import { AttributesComponent } from './components/attributes/attributes.component';
import {MatIconModule} from "@angular/material/icon";
import { MapToolbarComponent } from './components/map-toolbar/map-toolbar.component';
import {MatMenuModule} from "@angular/material/menu";
import {MatButtonModule} from "@angular/material/button";
import { FeatureNotImplementedComponent } from './components/feature-not-implemented/feature-not-implemented.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import { AttributesWebComponent } from './components/attributes-web/attributes-web.component';
import { AttributesMobileComponent } from './components/attributes-mobile/attributes-mobile.component';
import {ScrollingModule} from "@angular/cdk/scrolling";
import {MatTooltipModule} from "@angular/material/tooltip";
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from "../environments/environment";
import {AngularFirestoreModule} from "@angular/fire/compat/firestore";
import {MatDividerModule} from "@angular/material/divider";

@NgModule({
  declarations: [
    AppComponent,
    LayerListComponent,
    MapComponent,
    AttributesComponent,
    MapToolbarComponent,
    FeatureNotImplementedComponent,
    AttributesWebComponent,
    AttributesMobileComponent
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
        MatTableModule,
        MatPaginatorModule,
        ScrollingModule,
        MatTooltipModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        MatDividerModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
