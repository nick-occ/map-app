import {MapLayer} from "./map-layer";

export interface MapViewInfo {
  mapName: string;
  mapUrl: string;
  visible: boolean;
  layers: MapLayer[];
}
