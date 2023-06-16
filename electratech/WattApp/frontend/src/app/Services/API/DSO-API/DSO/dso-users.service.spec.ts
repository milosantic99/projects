import { TestBed } from '@angular/core/testing';

import { DsoUsersService } from './dso-users.service';

describe('DsoUsersService', () => {
  let service: DsoUsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DsoUsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
