import { TestBed } from '@angular/core/testing';

import { DsoSettingsService } from './dso-settings.service';

describe('DsoSettingsService', () => {
  let service: DsoSettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DsoSettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
