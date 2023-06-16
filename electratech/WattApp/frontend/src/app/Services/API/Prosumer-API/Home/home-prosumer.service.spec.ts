import { TestBed } from '@angular/core/testing';

import { HomeProsumerService } from './home-prosumer.service';

describe('HomeProsumerService', () => {
  let service: HomeProsumerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HomeProsumerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
