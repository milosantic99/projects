import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptimizerTypeHelpComponent } from './optimizer-type-help.component';

describe('OptimizerTypeHelpComponent', () => {
  let component: OptimizerTypeHelpComponent;
  let fixture: ComponentFixture<OptimizerTypeHelpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OptimizerTypeHelpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OptimizerTypeHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
