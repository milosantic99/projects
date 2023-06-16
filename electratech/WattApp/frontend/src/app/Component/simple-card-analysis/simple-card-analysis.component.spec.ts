import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleCardAnalysisComponent } from './simple-card-analysis.component';

describe('SimpleCardAnalysisComponent', () => {
  let component: SimpleCardAnalysisComponent;
  let fixture: ComponentFixture<SimpleCardAnalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimpleCardAnalysisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimpleCardAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
