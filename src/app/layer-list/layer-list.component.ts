import { Component, OnInit, Input } from '@angular/core';
import { Layer }

@Component({
  selector: 'app-layer-list',
  templateUrl: './layer-list.component.html',
  styleUrls: ['./layer-list.component.scss']
})
export class LayerListComponent implements OnInit {

  @Input() layers: any[] = [{visible: true, name: "layer"}];
  @Input() set map(value) {
    this._map = value;
    this._layers = value.layers.items.reduce((acc, prev) => acc = [], []);
  };
  private _layers: Layer;
  private _map: Layer;

  constructor() { }

  ngOnInit(): void {
  }

  changeVisible(): void {
    console.log(this._map);
    console.log(this._layers);
  }
}
