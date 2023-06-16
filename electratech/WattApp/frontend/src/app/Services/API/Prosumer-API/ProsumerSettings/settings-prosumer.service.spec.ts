import { TestBed } from '@angular/core/testing';

import { SettingsProsumerService } from './settings-prosumer.service';

describe('SettingsProsumerService', () => {
  let service: SettingsProsumerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SettingsProsumerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
