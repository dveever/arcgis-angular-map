import {MapModeEnum} from "../enums/map-mode.enum";

export interface MapModeEvent {
  type: MapModeEnum;
  layerId?: number | undefined;
}
