import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProsumptionAnalysisComponent } from './prosumption-analysis.component';

describe('ProsumptionAnalysisComponent', () => {
  let component: ProsumptionAnalysisComponent;
  let fixture: ComponentFixture<ProsumptionAnalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProsumptionAnalysisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProsumptionAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
