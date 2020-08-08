import { TestBed } from '@angular/core/testing';

import { LetraService } from './letra.service';

describe('LetraService', () => {
  let service: LetraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LetraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
