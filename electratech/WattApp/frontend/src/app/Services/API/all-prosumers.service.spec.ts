import { TestBed } from '@angular/core/testing';

import { AllProsumersService } from './all-prosumers.service';

describe('AllProsumersService', () => {
  let service: AllProsumersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllProsumersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
