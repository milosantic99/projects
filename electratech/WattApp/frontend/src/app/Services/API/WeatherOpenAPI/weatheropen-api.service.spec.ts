import { TestBed } from '@angular/core/testing';

import { WeatheropenApiService } from './weatheropen-api.service';

describe('WeatheropenApiService', () => {
  let service: WeatheropenApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeatheropenApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
