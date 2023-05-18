import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProblemTypeHelpComponent } from './problem-type-help.component';

describe('ProblemTypeHelpComponent', () => {
  let component: ProblemTypeHelpComponent;
  let fixture: ComponentFixture<ProblemTypeHelpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProblemTypeHelpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProblemTypeHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
