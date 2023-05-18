import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivationFunctionHelpComponent } from './activation-function-help.component';

describe('ActivationFunctionHelpComponent', () => {
  let component: ActivationFunctionHelpComponent;
  let fixture: ComponentFixture<ActivationFunctionHelpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivationFunctionHelpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivationFunctionHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
