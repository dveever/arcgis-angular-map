import {ChangeDetectionStrategy, Component, ElementRef, ViewChild} from '@angular/core';
import {loadModules} from 'esri-loader';
import {MapManagementService} from "./service/map-management.service";
import {environment} from "../environments/environment";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  // Get a container link for map place
  @ViewChild('mapView', {static: true}) private readonly mapViewElement!: ElementRef;
  // main map view
  private mapView: __esri.MapView;
  title = 'ArcGIS angular map';
  map: __esri.Map;

  constructor(private readonly mapManagementService: MapManagementService) {
    this.loadMap();
  }

  async loadMap() {
    // Load esri modules
    const [Map, MapView, MapImageLayer] = await loadModules(['esri/Map', 'esri/views/MapView', 'esri/layers/MapImageLayer']);
    const mapProperties = {
      basemap: 'gray'
    };
    // create map by default properties
    this.map = new Map(mapProperties);
    // set default map view properties
    // container - element in html-template for locate map
    // zoom - default zoom parameter, value from 1 to 18
    const mapViewProperties = {
      container: this.mapViewElement.nativeElement,
      zoom: 3,
      map: this.map
    };
    // create map view by default properties
    this.mapView = new MapView(mapViewProperties);

    // Set service properties
    // url - this address to MapServer from ArcGIS Enterprise
    const usaProperties = {
      url: environment.arcgisServiceUrl
    };
    // Create map image layer by properties
    // const oilSandsLayer = new MapImageLayer(oilSandLayerProperties);
    const usaLayer = new MapImageLayer(usaProperties);
    // Adding a layer into map
    this.map.add(usaLayer);
    // Waiting for the map view to be loaded and send map to map management service
    this.mapView.when(() => this.mapManagementService.setMap(this.map));
  }
}
