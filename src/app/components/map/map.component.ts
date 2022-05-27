import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {MapManagementService} from "../../services/map-management.service";
import ViewClickEvent = __esri.ViewClickEvent;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnDestroy {

  // Get a container link for map place
  @ViewChild('mapView', {static: true}) private readonly mapViewElement!: ElementRef;
  private onDestroy = new Subject<void>();
  private subscriptions: IHandle[] = [];

  constructor(private readonly mapManagementService: MapManagementService) {
  }

  ngOnInit(): void {
    this.mapManagementService.loadMap(this.mapViewElement.nativeElement);
    // Subscribe to click event and invoke identify function
    this.subscriptions.push(this.mapManagementService.mapView.on('click', this.identifyByClick));
  }

  identifyByClick = (event: ViewClickEvent): void => {
    this.mapManagementService.identifyByPoint(event.mapPoint)
      .pipe(takeUntil(this.onDestroy))
      .subscribe(results => {
        this.mapManagementService.mapView.popup.open({
          features: results,
          location: event.mapPoint,
        })
      });
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
    this.subscriptions.forEach(sub => sub.remove());
  }

}
