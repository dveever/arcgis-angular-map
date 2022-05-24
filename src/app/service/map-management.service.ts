import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import ArcGISMap from "@arcgis/core/Map";

@Injectable({
  providedIn: 'root'
})
export class MapManagementService {
  map = new Subject<ArcGISMap>();

  setMap(map: ArcGISMap): void {
    this.map.next(map);
  }
}
