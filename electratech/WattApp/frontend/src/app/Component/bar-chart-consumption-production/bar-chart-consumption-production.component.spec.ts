import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarChartConsumptionProductionComponent } from './bar-chart-consumption-production.component';

describe('BarChartConsumptionProductionComponent', () => {
  let component: BarChartConsumptionProductionComponent;
  let fixture: ComponentFixture<BarChartConsumptionProductionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarChartConsumptionProductionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BarChartConsumptionProductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
