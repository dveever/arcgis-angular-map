import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureNotImplementedComponent } from './feature-not-implemented.component';

describe('FeatureNotImplementedComponent', () => {
  let component: FeatureNotImplementedComponent;
  let fixture: ComponentFixture<FeatureNotImplementedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeatureNotImplementedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeatureNotImplementedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
