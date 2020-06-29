import {MapToggle, MapTool} from './map-tool';
import {MapToolCategory} from './map-tool-category.enum';
import {MapToolInputType} from './map-tool-input-type.enum';

export const MAP_TOOL: MapTool[] = [
  {
    id: 1,
    category: MapToolCategory.public,
    name: 'Identify',
    inputType: MapToolInputType.toggleButton,
    checked: true
  }, {
    id: 2,
    category: MapToolCategory.edit,
    name: 'Edit',
    inputType: MapToolInputType.toggleButton,
    checked: false
  }, {
    id: 3,
    category: MapToolCategory.public,
    name: 'Legend',
    inputType: MapToolInputType.toggleButton,
    checked: false
  }, {
    id: 4,
    category: MapToolCategory.public,
    name: 'Search',
    inputType: MapToolInputType.textBox,
    checked: false
  }];

export const MAP_TOGGLE: MapToggle = {
  Identify: true,
  Edit: false,
  Legend: false
};
