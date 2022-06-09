import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {MapManagementService} from "../../services/map-management.service";
import {Subject, switchMap, takeUntil} from "rxjs";

@Component({
  selector: 'app-attribute-table',
  templateUrl: './attribute-table.component.html',
  styleUrls: ['./attribute-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AttributeTableComponent implements OnInit, OnDestroy {

  data!: Record<string, string>[];
  columns!: string[];
  private onDestroy = new Subject<void>();

  constructor(
    private readonly mapManagementService: MapManagementService,
    private readonly cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.mapManagementService.attributesVisible.pipe(
      switchMap(layerId => this.mapManagementService.getAttributes(layerId)),
      takeUntil(this.onDestroy)
    ).subscribe(featureSet => {
      console.log(featureSet);
      this.data = featureSet.features.map(feature => feature.attributes);
      // console.log(Object.fromEntries([this.features[0].attributes]));
      this.columns = featureSet.fields.map(field => field.name);
      this.cdr.markForCheck();
    });
  }

  close(): void {
    this.mapManagementService.attributesVisible.next(-1);
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

}
