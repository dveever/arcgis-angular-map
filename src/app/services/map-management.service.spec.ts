import { TestBed } from '@angular/core/testing';

import { MapManagementService } from './map-management.service';

describe('MapManagementService', () => {
  let service: MapManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MapManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
