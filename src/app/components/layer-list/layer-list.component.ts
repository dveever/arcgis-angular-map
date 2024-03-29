import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {MapManagementService} from "../../services/map-management.service";
import {BehaviorSubject, filter, Subject, takeUntil} from "rxjs";
import MapImageLayer from "@arcgis/core/layers/MapImageLayer";
import {MatCheckboxChange} from "@angular/material/checkbox";
import Sublayer from "@arcgis/core/layers/support/Sublayer";
import {MapModeEnum} from "../../enums/map-mode.enum";

@Component({
  selector: 'app-layer-list',
  templateUrl: './layer-list.component.html',
  styleUrls: ['./layer-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayerListComponent implements OnInit, OnDestroy {

  layers = new BehaviorSubject<Sublayer[]>([]);
  private onDestroy = new Subject<void>();

  constructor(private readonly mapManagementService: MapManagementService) {
  }

  ngOnInit(): void {
    // When map view well be load we're receive map and extract layer from it
    this.mapManagementService.mapChange
      .pipe(filter(map => !!map), takeUntil(this.onDestroy))
      .subscribe(() => {
        this.loadLayer();
      });
    this.loadLayer();
  }

  loadLayer(): void {
    this.mapManagementService.map?.layers?.forEach(item => {
      if (item instanceof MapImageLayer) {
        this.layers.next(Array.from(item.allSublayers));
      }
    });
  }

  changeVisible(layer: Sublayer, event: MatCheckboxChange): void {
    layer.visible = event.checked;
  }

  showAttributes(layerId: number, layerTitle: string): void {
    this.mapManagementService.attributesVisible.next({layerId, layerTitle});
  }

  selectFeature(layerId: number): void {
    this.mapManagementService.mapMode.next({type: MapModeEnum.SELECTION, layerId: layerId});
  }

  featureNotImplemented(): void {
    this.mapManagementService.notImplementedClick();
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }
}
