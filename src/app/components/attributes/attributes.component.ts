import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import {MapManagementService} from "../../services/map-management.service";
import {BehaviorSubject, Observable, Subject, switchMap, takeUntil} from "rxjs";
import {MatPaginator} from "@angular/material/paginator";
import {BreakpointsService} from "../../services/breakpoints.service";

@Component({
  selector: 'app-attributes',
  templateUrl: './attributes.component.html',
  styleUrls: ['./attributes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AttributesComponent implements OnInit, OnDestroy {

  @Input() title!: string | undefined;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  attributes: BehaviorSubject<Record<string, string>[]> = new BehaviorSubject<Record<string, string>[]>([]);
  columns: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  isSmallView: Observable<boolean>;
  private onDestroy = new Subject<void>();


  constructor(
    private readonly mapManagementService: MapManagementService,
    private readonly breakpointsService: BreakpointsService,
    private readonly cdr: ChangeDetectorRef
  ) {
    this.isSmallView = breakpointsService.isSmallView;
  }

  ngOnInit(): void {
    this.mapManagementService.attributesVisible.pipe(
      switchMap(event => {
        this.title = event.layerTitle;
        return this.mapManagementService.getAttributes(event.layerId)
      }),
      takeUntil(this.onDestroy)
    ).subscribe(featureSet => {
      this.attributes.next(featureSet.features.map(feature => feature.attributes));
      this.columns.next(featureSet.fields.map(field => field.name));
      this.cdr.markForCheck();
    });
  }

  close(): void {
    this.mapManagementService.attributesVisible.next({ layerId: - 1 });
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

}
