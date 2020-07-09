import { Project } from './project';


// test data
export const PROJECT: Project[] = [{
    projectId: 1,
    name: 'Campus Map',
    basemap: {
      id: 'neoterra',
      title: 'neoterra',
      url: 'https://openmaps.uncc.edu/opengis/rest/services/Basemaps/NeoTerra/MapServer'
    },
    center: [-80.7366, 35.3081],
    zoom: 17,
    maps: [4]
  },
  {
    projectId: 2,
    name: 'Construction Map',
    basemap: 'osm',
    center: [-80.7366, 35.3081],
    zoom: 17,
    maps: [3]
  },
  {
    projectId: 3,
    name: 'Campus Basemap',
    basemap: 'osm',
    center: [-80.7366, 35.3081],
    zoom: 17,
    maps: [2]
  }];
