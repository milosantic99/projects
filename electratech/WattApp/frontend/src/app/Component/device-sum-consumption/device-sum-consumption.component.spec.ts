import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceSumConsumptionComponent } from './device-sum-consumption.component';

describe('DeviceSumConsumptionComponent', () => {
  let component: DeviceSumConsumptionComponent;
  let fixture: ComponentFixture<DeviceSumConsumptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeviceSumConsumptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeviceSumConsumptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
