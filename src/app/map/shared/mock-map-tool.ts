import {MapTool} from './map-tool';
import {MapToolCategory} from './map-tool-category.enum';
import {MapToolInputType} from './map-tool-input-type.enum';

export const MAP_TOOL: MapTool[] = [
  {
  id: 1,
  category: MapToolCategory.public,
  name: 'Identify',
  inputType: MapToolInputType.toggleButton,
  checked: true
},
  {
    id: 2,
    category: MapToolCategory.edit,
    name: 'Edit',
    inputType: MapToolInputType.toggleButton,
    checked: false
  }];
