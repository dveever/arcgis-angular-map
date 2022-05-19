import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MapManagementService {
  map = new BehaviorSubject<__esri.Map>(null);

  setMap(map: __esri.Map): void {
    this.map.next(map);
  }
}
