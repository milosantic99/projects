import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegularizationRateHelpComponent } from './regularization-rate-help.component';

describe('RegularizationRateHelpComponent', () => {
  let component: RegularizationRateHelpComponent;
  let fixture: ComponentFixture<RegularizationRateHelpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegularizationRateHelpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegularizationRateHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
