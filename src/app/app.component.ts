import {ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MapManagementService} from "./service/map-management.service";
import {environment} from "../environments/environment";
import ArcGISMap from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import MapImageLayer from "@arcgis/core/layers/MapImageLayer";
import QueryTask from "@arcgis/core/tasks/QueryTask";
import Query from "@arcgis/core/rest/support/Query";
import PopupTemplate from "@arcgis/core/PopupTemplate";
import FeatureSet from "@arcgis/core/rest/support/FeatureSet";
import ViewClickEvent = __esri.ViewClickEvent;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  // Get a container link for map place
  @ViewChild('mapView', {static: true}) private readonly mapViewElement!: ElementRef;
  // main map view
  private mapView!: MapView;
  title = 'ArcGIS angular map';
  map!: ArcGISMap;

  constructor(private readonly mapManagementService: MapManagementService) {
  }

  ngOnInit() {
    this.loadMap();
  }

  loadMap() {
    // Load esri modules
    const mapProperties = {
      basemap: 'gray-vector'
    };
    // create map by default properties
    this.map = new ArcGISMap(mapProperties);
    // set default map view properties
    // container - element in html-template for locate map
    // zoom - default zoom parameter, value from 1 to 18
    const mapViewProperties = {
      map: this.map,
      container: this.mapViewElement.nativeElement,
      center: [-100.244, 42.052],
      zoom: 3
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
    // Waiting for the layer to be loaded and send map to map management service
    usaLayer.when(() => this.mapManagementService.setMap(this.map));
    // Handle map click and invoke identify method
    this.mapView.on('click', this.identify);
  }

  identify = (event: ViewClickEvent) => {
    const queryTask = new QueryTask();
    queryTask.url = `${environment.arcgisServiceUrl}/2`;
    const query = new Query();
    query.returnGeometry = true;
    query.geometry = event.mapPoint;
    queryTask.execute(query).then(result => this.showInfo(result));
    console.log(event);
  }

  showInfo = (featureSet: FeatureSet) => {
    const popupTemplate = new PopupTemplate();
    popupTemplate.title = 'Information';
    popupTemplate.content = '';
    this.mapView.graphics.removeAll();
    featureSet.features.forEach(item => {
      const graphic = item;
      Object.keys(graphic.attributes).forEach(key => popupTemplate.content += '<p>' + key + ': ' + graphic.attributes[key] + '</p>')
      graphic.popupTemplate = popupTemplate;
      this.mapView.graphics.add(graphic);
    });
    console.log(featureSet);
  }
}
