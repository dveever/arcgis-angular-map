import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {MapManagementService} from "../../services/map-management.service";
import {Observable} from "rxjs";

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

  changeLayerListVisible(): void {
    this.mapManagementService.layerListVisible.next(!this.mapManagementService.layerListVisible.value);
  }

  clearSelection(): void {
    this.mapManagementService.notImplementedClick();
  }
}
