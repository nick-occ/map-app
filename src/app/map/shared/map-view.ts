export interface MapView {
  graphics:
    {
      add: any;
      removeAll: any;
    };
  goTo: any;
  ui: any;
  layerViews: {
    items
  };
  width: number ;
  height: number;
  on: any;
}
