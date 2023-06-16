import { TestBed } from '@angular/core/testing';

import { MyDeviceService } from './my-device.service';

describe('MyDeviceService', () => {
  let service: MyDeviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyDeviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
