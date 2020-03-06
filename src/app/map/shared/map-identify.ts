export class MapIdentify {
  mapName: string;
  layerId: number;
  layerName: string;
  feature: object;

  constructor(mapName, results: any) {
    const {layerId, layerName, feature} = results;
    this.mapName = mapName;
    this.layerId = layerId;
    this.layerName = layerName;
    this.feature = feature;
  }
}
