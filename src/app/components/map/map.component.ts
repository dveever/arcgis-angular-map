import {ChangeDetectionStrategy, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {filter, map, Observable, Subject, takeUntil} from "rxjs";
import {MapManagementService} from "../../services/map-management.service";
import {MapModeEnum} from "../../enums/map-mode.enum";
import {MapModeEvent} from "../../interfaces/map-mode-event";
import ViewClickEvent = __esri.ViewClickEvent;
import SketchViewModelCreateEvent = __esri.SketchViewModelCreateEvent;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapComponent implements OnInit, OnDestroy {

  // Get a container link for map place
  @ViewChild('mapView', {static: true}) private readonly mapViewElement!: ElementRef;
  private onDestroy = new Subject<void>();
  private identifyHandle!: IHandle;
  private drawRectangleHandle!: IHandle;

  constructor(private readonly mapManagementService: MapManagementService) {
  }

  ngOnInit(): void {
    this.mapManagementService.loadMap(this.mapViewElement.nativeElement);
    this.mapManagementService.mapMode
      .pipe(takeUntil(this.onDestroy))
      .subscribe(mode => this.selectTool(mode));
  }

  identifyByClick = (event: ViewClickEvent): void => {
    this.mapManagementService.identifyByPoint(event.mapPoint)
      .pipe(
        filter(results => results?.length > 0),
        takeUntil(this.onDestroy)
      )
      .subscribe(results => {
        this.mapManagementService.mapView.popup.open({
          features: results,
          location: event.mapPoint,
        })
      });
  }

  drawRectangleCompleteHandler = (event: SketchViewModelCreateEvent): void => {
    if (event.state === "complete") {
      this.mapManagementService.selectByRectangle(event.graphic)
        .pipe(
          takeUntil(this.onDestroy),
        )
        .subscribe(results => {
          results.features.forEach(feature => {
            switch (feature.geometry.type) {
              case "polygon":
                feature.symbol = this.mapManagementService.simpleFillSymbol;
                break;
              case "polyline":
                feature.symbol = this.mapManagementService.simpleLineSymbol;
                break;
              case "point":
                feature.symbol = this.mapManagementService.simpleMarkerSymbol;
                break;
            }
          });
          this.mapManagementService.mapView.graphics.addMany(results.features);
          this.mapManagementService.drawGraphicsLayer.removeAll();
        });
    }
  }

  layerListVisible(): Observable<boolean> {
    return this.mapManagementService.layerListVisible;
  }

  attributesVisible(): Observable<boolean> {
    return this.mapManagementService.attributesVisible.pipe(map(event => event.layerId !== -1));
  }

  selectTool(mode: MapModeEvent): void {
    this.resetHandle();
    switch (mode.type) {
      case MapModeEnum.SELECTION:
        this.drawRectangleHandle = this.mapManagementService.sketchViewModel.on('create', this.drawRectangleCompleteHandler);
        this.mapManagementService.sketchViewModel.create('rectangle')
        break;
      case MapModeEnum.IDENTIFY_BY_CLICK:
        this.identifyHandle = this.mapManagementService.mapView.on('click', this.identifyByClick)
        break;
      default:
        this.resetHandle();
    }
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
    this.resetHandle();
  }

  private resetHandle(): void {
    this.drawRectangleHandle?.remove();
    this.identifyHandle?.remove();
    this.mapManagementService.sketchViewModel.cancel();
  }
}
