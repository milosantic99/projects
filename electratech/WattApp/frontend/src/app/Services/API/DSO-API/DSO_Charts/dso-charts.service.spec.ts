import { TestBed } from '@angular/core/testing';

import { DsoChartsService } from './dso-charts.service';

describe('DsoChartsService', () => {
  let service: DsoChartsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DsoChartsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
