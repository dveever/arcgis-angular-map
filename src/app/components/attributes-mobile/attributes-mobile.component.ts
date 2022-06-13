import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
  selector: 'app-attributes-mobile',
  templateUrl: './attributes-mobile.component.html',
  styleUrls: ['./attributes-mobile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AttributesMobileComponent {
  @Input() set data(value: Record<string, string>[] | null) {
    this.dataSource = value || [];
  }

  dataSource!: Record<string, string>[];

  getKeys(attr: Record<string, string>): string[] {
    return Object.keys(attr);
  }

  getItemSize(): number {
    return Object.keys(this.dataSource?.[0] || [])?.length * 28 + 17 || 240;
  }
}
