import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarChartAnalysisComponent } from './bar-chart-analysis.component';

describe('BarChartAnalysisComponent', () => {
  let component: BarChartAnalysisComponent;
  let fixture: ComponentFixture<BarChartAnalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarChartAnalysisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BarChartAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
