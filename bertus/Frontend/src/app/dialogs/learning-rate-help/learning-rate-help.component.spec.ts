import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearningRateHelpComponent } from './learning-rate-help.component';

describe('LearningRateHelpComponent', () => {
  let component: LearningRateHelpComponent;
  let fixture: ComponentFixture<LearningRateHelpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LearningRateHelpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LearningRateHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
