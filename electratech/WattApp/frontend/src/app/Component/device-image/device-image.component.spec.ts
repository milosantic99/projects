import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceImageComponent } from './device-image.component';

describe('DeviceImageComponent', () => {
  let component: DeviceImageComponent;
  let fixture: ComponentFixture<DeviceImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeviceImageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeviceImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
