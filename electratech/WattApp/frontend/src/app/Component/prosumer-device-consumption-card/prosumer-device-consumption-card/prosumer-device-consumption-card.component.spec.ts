import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProsumerDeviceConsumptionCardComponent } from './prosumer-device-consumption-card.component';

describe('ProsumerDeviceConsumptionCardComponent', () => {
  let component: ProsumerDeviceConsumptionCardComponent;
  let fixture: ComponentFixture<ProsumerDeviceConsumptionCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProsumerDeviceConsumptionCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProsumerDeviceConsumptionCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
