import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalysisProsumerComponent } from './analysis-prosumer.component';

describe('AnalysisProsumerComponent', () => {
  let component: AnalysisProsumerComponent;
  let fixture: ComponentFixture<AnalysisProsumerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnalysisProsumerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnalysisProsumerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
