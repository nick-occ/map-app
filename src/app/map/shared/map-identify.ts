export class MapIdentify {
  mapName: string;
  result: object;

  constructor(mapName, results: any) {
    const {layerId, layerName, feature} = results;
    this.mapName = mapName;
    this.result = {
      layerId,
      layerName,
      feature
    };
  }
}
