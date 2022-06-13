import {Injectable, OnDestroy} from '@angular/core';
import {map, Observable, shareReplay, Subject, takeUntil} from "rxjs";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";

@Injectable({
  providedIn: 'root'
})
export class BreakpointsService implements OnDestroy {
  isSmallView: Observable<boolean>;
  private onDestroy = new Subject<void>();

  constructor(private readonly breakpointObserver: BreakpointObserver) {
    this.isSmallView = this.breakpointObserver
      .observe([Breakpoints.Small, Breakpoints.Handset])
      .pipe(
        map(result => result.matches),
        shareReplay(1),
        takeUntil(this.onDestroy)
      );
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }
}
