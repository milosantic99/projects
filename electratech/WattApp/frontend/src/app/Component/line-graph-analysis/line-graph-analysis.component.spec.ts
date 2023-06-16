import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineGraphAnalysisComponent } from './line-graph-analysis.component';

describe('LineGraphAnalysisComponent', () => {
  let component: LineGraphAnalysisComponent;
  let fixture: ComponentFixture<LineGraphAnalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LineGraphAnalysisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LineGraphAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
