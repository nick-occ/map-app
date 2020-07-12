import {MapPanelVisible, MapToggle, MapTool} from '../models/map-tool';
import {MapToolCategory} from '../enums/map-tool-category.enum';
import {MapToolInputType} from '../enums/map-tool-input-type.enum';

export const MAP_TOOL: MapTool[] = [
  {
    id: 1,
    category: MapToolCategory.base,
    name: 'Identify',
    inputType: MapToolInputType.toggleButton,
    checked: true,
    togglePanel: false
  }, {
    id: 2,
    category: MapToolCategory.edit,
    name: 'Edit',
    inputType: MapToolInputType.toggleButton,
    checked: false,
    togglePanel: true,
    uncheck: [1]
  }, {
    id: 3,
    category: MapToolCategory.base,
    name: 'Legend',
    inputType: MapToolInputType.toggleButton,
    checked: false
  }, {
    id: 4,
    category: MapToolCategory.base,
    name: 'Search',
    inputType: MapToolInputType.textBox
  }];

export const MAP_TOGGLE: MapToggle = {
  Identify: true,
  Edit: false,
  Legend: false
};

export const MAP_PANEL_VISIBLE: MapPanelVisible = {
  Identify: false,
  Edit: false,
  Search: false
};
