import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestPercentageHelpComponent } from './test-percentage-help.component';

describe('TestPercentageHelpComponent', () => {
  let component: TestPercentageHelpComponent;
  let fixture: ComponentFixture<TestPercentageHelpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestPercentageHelpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestPercentageHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
