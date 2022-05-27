import {Injectable} from '@angular/core';
import {from, Observable, of, Subject, switchMap} from "rxjs";
import ArcGISMap from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import {environment} from "../../environments/environment";
import MapImageLayer from "@arcgis/core/layers/MapImageLayer";
import Point from "@arcgis/core/geometry/Point";
import PopupTemplate from "@arcgis/core/PopupTemplate";
import IdentifyParameters from "@arcgis/core/rest/support/IdentifyParameters";
import IdentifyTask from "@arcgis/core/tasks/IdentifyTask";
import Graphic from "@arcgis/core/Graphic";
import {IdentifyExecuteResult} from "../interfaces/identify-execute-result";

@Injectable({
  providedIn: 'root'
})
export class MapManagementService {
  map!: ArcGISMap;
  mapChange = new Subject<ArcGISMap>();
  mapView!: MapView;
  private usaLayer!: MapImageLayer;
  private identify: IdentifyTask;

  constructor() {
    this.identify = new IdentifyTask();
  }

  loadMap(container: HTMLDivElement) {
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
      container: container,
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
    this.usaLayer = new MapImageLayer(usaProperties);
    // Adding a layer into map
    this.map.add(this.usaLayer);
    // Waiting for the layer to be loaded and send map to map management service
    this.usaLayer.when(() => this.mapChange.next(this.map));
    // Handle map click and invoke identify method
  }

  identifyByPoint = (mapPoint: Point): Observable<Graphic[]> => {
    const identifyParams = new IdentifyParameters();
    identifyParams.tolerance = 3;
    identifyParams.layerIds = [...this.usaLayer.sublayers.map(layer => layer.id)];
    identifyParams.layerOption = "visible";
    identifyParams.width = this.mapView.width;
    identifyParams.height = this.mapView.height;
    identifyParams.geometry = mapPoint;
    identifyParams.mapExtent = this.mapView.extent;
    this.identify.url = environment.arcgisServiceUrl;
    return from(this.identify.execute(identifyParams))
      .pipe(
        switchMap((identifyExecuteResult: IdentifyExecuteResult) => this.getTemplates(identifyExecuteResult))
      );
  }

  private getTemplates = (identifyResult: IdentifyExecuteResult): Observable<Graphic[]> => {
    return of(identifyResult.results.map(result => {
      const feature = result.feature;
      const popupTemplate = new PopupTemplate();
      popupTemplate.title = result.layerName;
      popupTemplate.content = Object.keys(feature.attributes).reduce((acc, prev) => acc += `<p><b>${prev}</b>: ${feature.attributes[prev]}</p>`, '')
      feature.popupTemplate = popupTemplate;
      return feature;
    }));
  }
}
