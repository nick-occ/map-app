export interface MapLayer {
  layerName: string;
  layerId: number;
  visible: boolean;
  image?: string;
  sublayers?: MapLayer[];
}
