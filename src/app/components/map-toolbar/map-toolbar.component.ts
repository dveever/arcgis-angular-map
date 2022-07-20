import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {MapManagementService} from "../../services/map-management.service";
import {Observable} from "rxjs";
import {MapModeEnum} from "../../enums/map-mode.enum";

@Component({
  selector: 'app-map-toolbar',
  templateUrl: './map-toolbar.component.html',
  styleUrls: ['./map-toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapToolbarComponent implements OnInit {

  constructor(private readonly mapManagementService: MapManagementService) {
  }

  ngOnInit(): void {
  }

  layerListVisible(): Observable<boolean> {
    return this.mapManagementService.layerListVisible;
  }

  isSelectionMode(): boolean {
    return this.mapManagementService.mapMode.value.type === MapModeEnum.SELECTION;
  }

  isDefaultMode(): boolean {
    return this.mapManagementService.mapMode.value.type === MapModeEnum.DEFAULT;
  }

  isIdentifyByClickMode(): boolean {
    return this.mapManagementService.mapMode.value.type === MapModeEnum.IDENTIFY_BY_CLICK;
  }

  changeLayerListVisible(): void {
    this.mapManagementService.layerListVisible.next(!this.mapManagementService.layerListVisible.value);
  }

  selectPanTool(): void {
    this.mapManagementService.mapMode.next({type: MapModeEnum.DEFAULT});
  }

  selectIdentifyByClickTool(): void {
    this.mapManagementService.mapMode.next({type: MapModeEnum.IDENTIFY_BY_CLICK});
  }

  clearSelection(): void {
    this.mapManagementService.clearSelection();
  }
}
