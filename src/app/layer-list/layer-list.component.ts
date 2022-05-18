import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Layer} from '../interface/layer';

@Component({
  selector: 'app-layer-list',
  templateUrl: './layer-list.component.html',
  styleUrls: ['./layer-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayerListComponent implements OnInit {

  @Input() set map(value) {
    this._map = value;
    value?.layers.items.forEach(item => {
      console.log(item.allSublayers.items);
      console.log(item.allSublayers.items.length);
      for (const lyr of item.allSublayers.items) {
        console.log(lyr);
        this.layers.push(lyr);
      }

      // this.layers.push(item.allSublayers.items[0]);
      console.log(this._map);
      console.log(this.layers);
      // this.layers.push(item.allSublayers.items);
    });

    // this.l = value?.layers?.items?.reduce((acc, prev) => {
    //   if (!Array.isArray(acc)){
    //     acc = [];
    //   }
    //   console.log('sdsd');
    //   console.log(prev);
    //   // acc.push(prev.sublayers.items);
    // }); // this.layers.push(item));
  }

  layers: Layer[] = [];
  l = [];
  private _map: Layer;

  constructor() {
  }

  ngOnInit(): void {
  }

  changeVisible(layer, event): void {
    layer.visible = event.checked;
    console.log(this._map);
    console.log(this.layers);
    console.log(this.l);
  }
}
