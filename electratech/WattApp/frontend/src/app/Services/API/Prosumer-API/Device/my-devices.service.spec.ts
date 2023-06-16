import { TestBed } from '@angular/core/testing';

import { MyDevicesService } from './my-devices.service';

describe('MyDevicesService', () => {
  let service: MyDevicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyDevicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
