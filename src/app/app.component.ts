import {Component, ElementRef, ViewChild} from '@angular/core';
import {loadModules} from 'esri-loader';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // Div for card
  @ViewChild('mapView', {static: true}) private readonly mapViewElement: ElementRef;
  // main map view
  private mapView;
  title = 'ArcGIS angular map';

  constructor() {
    loadModules(['esri/Map', 'esri/views/MapView'])
      .then(([Map, MapView]: [__esri.MapConstructor, __esri.MapViewConstructor]) => {
        // set default map properties
        const mapProperties = {
          basemap: 'gray'
        }
        // create map by default properties
        const map = new Map(mapProperties);

        // set default map view properties
        // container - element in html-template for locate map
        // zoom - default zoom param
        const mapViewProperties = {
          container: this.mapViewElement.nativeElement,
          zoom: 3,
          map
        }

        // create map view by default properties
        this.mapView = new MapView(mapViewProperties);
      });
  }
}
