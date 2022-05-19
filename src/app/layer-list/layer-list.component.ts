import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {Layer} from '../interface/layer';
import {MapManagementService} from "../service/map-management.service";
import {BehaviorSubject, filter, Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-layer-list',
  templateUrl: './layer-list.component.html',
  styleUrls: ['./layer-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayerListComponent implements OnInit, OnDestroy {

  layers = new BehaviorSubject<Layer[]>([]);
  private onDestroy = new Subject<void>();

  constructor(private readonly mapManagementService: MapManagementService) {
  }

  ngOnInit(): void {
    // When map view well be load we're receive map and extract layer from it
    this.mapManagementService.map
      .pipe(filter(map => !!map), takeUntil(this.onDestroy))
      .subscribe(map => {
        map.layers.forEach(item => {
          this.layers.next(Array.from(item.get("allSublayers")));
        });
      });
  }

  changeVisible(layer, event): void {
    layer.visible = event.checked;
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }
}
