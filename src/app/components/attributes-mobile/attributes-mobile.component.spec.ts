import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttributesMobileComponent } from './attributes-mobile.component';

describe('AttributesMobileComponent', () => {
  let component: AttributesMobileComponent;
  let fixture: ComponentFixture<AttributesMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttributesMobileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttributesMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
