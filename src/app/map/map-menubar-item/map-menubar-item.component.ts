import {
  Component,
  Input,
  OnInit,
  AfterContentInit,
  ViewChild,
  AfterViewInit,
  Output,
  EventEmitter
} from '@angular/core';
import {MapToolCategory} from '../shared/map-tool-category.enum';
import {MapTool} from '../shared/map-tool';
import {MatButtonToggle} from '@angular/material/button-toggle';
import {MapService} from '../shared/map.service';

@Component({
  selector: 'app-map-menubar-item',
  templateUrl: './map-menubar-item.component.html',
  styleUrls: ['./map-menubar-item.component.css']
})
export class MapMenubarItemComponent implements OnInit, AfterViewInit {
  @Input() tool: MapTool;
  @ViewChild('buttonToggle') buttonToggle: MatButtonToggle;

  constructor(private mapService: MapService) {}

  setToggleButton(): void {
    this.mapService.toggleButtons[this.tool.name] = this.buttonToggle.checked;
  }

  closeIdentify(): void {
    if (this.tool.name == 'Identify' && !this.buttonToggle.checked) {
      this.mapService.showIdentify();
    }
  }

  ngAfterViewInit() {
    this.setToggleButton();
  }

  ngOnInit(): void {

  }

  buttonClick() {
    this.setToggleButton();
    this.closeIdentify();
  }

  onKey(val): void {
    this.mapService.getSearchResults(val).subscribe(data => {
      data.forEach(res => {
        res.results.subscribe(r => {
          if (r.results.length > 0) {
            // show legend
            this.mapService.toggleButtons.Legend = true;
            this.mapService.searchResults.push(
              {
                mapName: res.mapName,
                results: r.results
              });
          }
        });
      });
    });
    console.log(this.mapService.searchResults);
  }

}
