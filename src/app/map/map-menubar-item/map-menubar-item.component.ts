import {
  Component,
  Input,
  OnInit,
  ViewChild
} from '@angular/core';
import {MapToolCategory} from '../shared/map-tool-category.enum';
import {MapTool} from '../shared/models/map-tool';
import {MatButtonToggle} from '@angular/material/button-toggle';
import {MapService} from '../shared/map.service';

@Component({
  selector: 'app-map-menubar-item',
  templateUrl: './map-menubar-item.component.html',
  styleUrls: ['./map-menubar-item.component.css']
})
export class MapMenubarItemComponent implements OnInit {
  @Input() tool: MapTool;
  @ViewChild('buttonToggle') buttonToggle: MatButtonToggle;

  constructor(private mapService: MapService) {}

  setToggleButton(): void {
    this.mapService.toggleButtons[this.tool.name] = this.buttonToggle.checked;
  }

  getToggleState(name: string): boolean {
    return this.mapService.getToggleState(name);
  }

  closePanel(): void {
    if (this.tool.name in this.mapService.panelVisible && !this.buttonToggle.checked) {
      this.mapService.panelVisible[this.tool.name] = false;
      this.mapService.mapView.graphics.removeAll();
    }
  }

  ngOnInit(): void { }

  buttonClick() {
    this.setToggleButton();
    this.closePanel();
  }

  onKey(val): void {
    // TODO: add button to clear search results
    // TODO: limit only top 25 results and notify user that only those top results are being shown
    this.mapService.getSearchResults(val).subscribe(data => {
      data.forEach(res => {
        res.results.subscribe(r => {
          if (r.error) {
            alert(r.error.message);
            return r.error.code;
          }

          if (r.results.length > 0) {
            // show legend
            this.mapService.toggleButtons.Legend = true;
            this.mapService.searchResults.push(
              {
                mapName: res.mapName,
                results: r.results
              });
          } else {
            alert('No results found.');
          }
        });
      });
    });
  }

}
