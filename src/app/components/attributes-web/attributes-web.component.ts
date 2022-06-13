import {AfterViewInit, ChangeDetectionStrategy, Component, Input, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-attributes-web',
  templateUrl: './attributes-web.component.html',
  styleUrls: ['./attributes-web.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AttributesWebComponent implements AfterViewInit {
  @Input() set data(value: Record<string, string>[] | null) {
    this.dataSource.data = value || [];
  }

  @Input() columns!: string[] | null;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource = new MatTableDataSource<Record<string, string>>();

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

}
