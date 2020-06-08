import {MapToolCategory} from './map-tool-category.enum';
import {MapToolInputType} from './map-tool-input-type.enum';

export interface MapTool {
  id: number;
  category: MapToolCategory;
  name: string;
  inputType: MapToolInputType;
  checked: boolean;
}
