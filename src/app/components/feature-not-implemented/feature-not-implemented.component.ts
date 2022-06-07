import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'app-feature-not-implemented',
  templateUrl: './feature-not-implemented.component.html',
  styleUrls: ['./feature-not-implemented.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeatureNotImplementedComponent {}
