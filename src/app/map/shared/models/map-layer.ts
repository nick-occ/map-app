export interface MapLayer {
  layerName: string;
  layerId: number;
  visible: boolean;
  image?: string;
  element?: any;
  parentId?: number;
  sublayers?: MapLayer[];
}
