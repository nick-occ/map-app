import { Map } from '../models/map';

// test data
export const MAPS: Map[] = [{
  mapId: 1,
  name: 'Construction Map',
  url: 'https://openmaps.uncc.edu/opengis/rest/services/Construction/Construction/MapServer',
  mapType: 'tileLayer'
  }, {
  mapId: 2,
  name: 'Basemap Map',
  url: 'https://openmaps.uncc.edu/opengis/rest/services/Basemaps/NeoTerra/MapServer',
  mapType: 'tileLayer'
  },
  {
    mapId: 3,
    name: 'FY16-20 Map',
    url: 'https://openmaps.uncc.edu/opengis/rest/services/Construction/FY16_FY20_Construction/MapServer',
    mapType: 'dynamic'
  },
  {
    mapId: 4,
    name: 'Campus Map',
    url: 'https://openmaps.uncc.edu/opengis/rest/services/AllCampusNew/MapServer',
    mapType: 'dynamic'
  }
];
