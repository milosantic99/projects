import { TestBed } from '@angular/core/testing';

import { DsoService } from './dso.service';

describe('DsoService', () => {
  let service: DsoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DsoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
