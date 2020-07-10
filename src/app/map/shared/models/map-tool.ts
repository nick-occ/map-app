import {MapToolCategory} from '../map-tool-category.enum';
import {MapToolInputType} from '../map-tool-input-type.enum';

export interface MapTool {
  id: number;
  category: MapToolCategory;
  name: string;
  inputType: MapToolInputType;
  checked?: boolean;
  togglePanel?: boolean;
}

export interface MapToggle {
  Identify: boolean;
  Edit: boolean;
  Legend: boolean;
}

export interface MapPanelVisible {
  Identify: boolean;
  Search: boolean;
  Edit: boolean;
}