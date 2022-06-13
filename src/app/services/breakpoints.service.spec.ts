import { TestBed } from '@angular/core/testing';

import { BreakpointsService } from './breakpoints.service';

describe('BreakpointsService', () => {
  let service: BreakpointsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BreakpointsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
