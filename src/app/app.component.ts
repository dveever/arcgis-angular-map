import {Component, ElementRef, ViewChild} from '@angular/core';
import {loadModules} from 'esri-loader';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // Get a container link for map place
  @ViewChild('mapView', {static: true}) private readonly mapViewElement: ElementRef;
  // main map view
  private mapView;
  title = 'ArcGIS angular map';

  constructor() {
    // This function to load Dojo's require the classes listed in the array modules
    loadModules(['esri/Map', 'esri/views/MapView', 'esri/layers/MapImageLayer'])
      .then(([Map, MapView, MapImageLayer]: [__esri.MapConstructor, __esri.MapViewConstructor,
        __esri.MapImageLayerConstructor]) => {
        // set default map properties
        //
        const mapProperties = {
          basemap: 'gray'
        };
        // create map by default properties
        const map = new Map(mapProperties);
        // set default map view properties
        // container - element in html-template for locate map
        // zoom - default zoom parameter, value from 1 to 18
        const mapViewProperties = {
          container: this.mapViewElement.nativeElement,
          zoom: 3,
          map
        };
        // create map view by default properties
        this.mapView = new MapView(mapViewProperties);

        // Set service properties
        // url - this address to MapServer from ArcGIS Enterprise
        // sublayers - this are the settings for the inner layers of the service.
        // id = 1 it tell us that will be displayed only one layer with the identifier
        const oilSandLayerProperties = {
          url: 'https://sampleserver6.arcgisonline.com/arcgis/rest/services/OilSandsProjectBoundaries/MapServer',
          sublayers: [{id: 1}]
        };
        // Create map image layer by properties
        const oilSandsLayer = new MapImageLayer(oilSandLayerProperties);
        // Adding a layer into map
        map.add(oilSandsLayer);
      });
  }
}
