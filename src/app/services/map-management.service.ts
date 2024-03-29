import {Injectable} from '@angular/core';
import {BehaviorSubject, from, Observable, of, Subject, switchMap} from "rxjs";
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
import {MatDialog} from "@angular/material/dialog";
import {FeatureNotImplementedComponent} from "../components/feature-not-implemented/feature-not-implemented.component";
import QueryTask from "@arcgis/core/tasks/QueryTask";
import Query from "@arcgis/core/rest/support/Query";
import FeatureSet from "@arcgis/core/rest/support/FeatureSet";
import {AttributeShowEvent} from "../interfaces/attribute-show-event";
import {MapModeEnum} from "../enums/map-mode.enum";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import SketchViewModel from "@arcgis/core/widgets/Sketch/SketchViewModel";
import {MapModeEvent} from "../interfaces/map-mode-event";
import SimpleMarkerSymbol from "@arcgis/core/symbols/SimpleMarkerSymbol";
import SimpleLineSymbol from "@arcgis/core/symbols/SimpleLineSymbol";
import SimpleFillSymbol from "@arcgis/core/symbols/SimpleFillSymbol";
import MapImageLayerProperties = __esri.MapImageLayerProperties;
import MapViewProperties = __esri.MapViewProperties;
import MapProperties = __esri.MapProperties;

@Injectable({
  providedIn: 'root'
})
export class MapManagementService {
  simpleLineSymbol: SimpleLineSymbol = new SimpleLineSymbol({
    color: [0, 252, 252, 1],
    width: 3,
    style: "solid"
  });
  simpleFillSymbol: SimpleFillSymbol = new SimpleFillSymbol({
    color: [0, 252, 252, 1],
    outline: {
      color: [0, 252, 252],
      width: 3
    }
  });
  simpleMarkerSymbol: SimpleMarkerSymbol = new SimpleMarkerSymbol({
    style: "circle",
    color: [0, 252, 252, 1],
    size: 4,
    outline: {
      color: [0, 0, 0],
      width: 1
    }
  });
  map!: ArcGISMap;
  mapChange = new Subject<ArcGISMap>();
  mapView!: MapView;
  sketchViewModel!: SketchViewModel;
  layerListVisible = new BehaviorSubject<boolean>(true);
  mapMode = new BehaviorSubject<MapModeEvent>({type: MapModeEnum.DEFAULT});
  attributesVisible = new BehaviorSubject<AttributeShowEvent>({layerId: -1});
  drawGraphicsLayer!: GraphicsLayer;
  private usaLayer!: MapImageLayer;
  private identify: IdentifyTask;
  private queryTask: QueryTask;

  constructor(public dialog: MatDialog) {
    this.identify = new IdentifyTask();
    this.queryTask = new QueryTask();
  }

  loadMap(container: HTMLDivElement) {
    // Load esri modules
    const mapProperties: MapProperties = {
      basemap: 'gray-vector'
    };
    // create map by default properties
    this.map = new ArcGISMap(mapProperties);
    // set default map view properties
    // container - element in html-template for locate map
    // zoom - default zoom parameter, value from 1 to 18
    const mapViewProperties: MapViewProperties = {
      map: this.map,
      container: container,
      center: [-100.244, 42.052],
      popup: { collapseEnabled: false },
      zoom: 3
    };
    // create map view by default properties
    this.mapView = new MapView(mapViewProperties);

    // Set service properties
    // url - this address to MapServer from ArcGIS Enterprise
    const usaProperties: MapImageLayerProperties = {
      url: environment.arcgisServiceUrl
    };
    // Create map image layer by properties
    // const oilSandsLayer = new MapImageLayer(oilSandLayerProperties);
    this.usaLayer = new MapImageLayer(usaProperties);
    // Adding a layer into map
    this.map.add(this.usaLayer);
    // Waiting for the layer to be loaded and send map to map management service
    this.usaLayer.when(() => this.mapChange.next(this.map));
    // add layer for draw graphics
    this.drawGraphicsLayer = new GraphicsLayer();
    this.map.add(this.drawGraphicsLayer);
    // create a new sketch view model set its layer
    this.sketchViewModel = new SketchViewModel({
      view: this.mapView,
      layer: this.drawGraphicsLayer
    });
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

  getAttributes = (id: number): Observable<FeatureSet> => {
    const query = new Query();
    query.returnGeometry = false;
    query.outFields = ["*"];
    query.where = "1=1";
    this.queryTask.url = environment.arcgisServiceUrl + `/${id}`;
    return from(this.queryTask.execute(query));
  }

  selectByRectangle = (graphic: Graphic): Observable<FeatureSet> => {
    const query = new Query();
    query.geometry = graphic.geometry;
    query.outFields = ["*"];
    query.returnGeometry = true;
    this.queryTask.url = environment.arcgisServiceUrl + `/${this.mapMode.value.layerId}`;
    return from(this.queryTask.execute(query));
  }

  clearSelection(): void {
    this.mapView.graphics.removeAll();
    this.drawGraphicsLayer.removeAll();
  }

  notImplementedClick(): void {
    this.dialog.open(FeatureNotImplementedComponent);
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
