import { Project } from './project';

// test data
export const PROJECT: Project[] = [{
    projectId: 1,
    name: 'Campus Map',
    // TODO: allow adding basemap from map service
    basemap: 'osm',
    center: [-80.7366, 35.3081],
    zoom: 17,
    maps: [4]
  },
  {
    projectId: 2,
    name: 'Construction Map',
    // TODO: allow adding basemap from map service
    basemap: 'osm',
    center: [-80.7366, 35.3081],
    zoom: 17,
    maps: [3]
  },
  {
    projectId: 3,
    name: 'Campus Basemap',
    // TODO: allow adding basemap from map service
    basemap: 'osm',
    center: [-80.7366, 35.3081],
    zoom: 17,
    maps: [2]
  }];
