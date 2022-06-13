import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttributesWebComponent } from './attributes-web.component';

describe('AttributesWebComponent', () => {
  let component: AttributesWebComponent;
  let fixture: ComponentFixture<AttributesWebComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttributesWebComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttributesWebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
