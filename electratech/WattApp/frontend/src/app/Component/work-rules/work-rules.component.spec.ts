import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkRulesComponent } from './work-rules.component';

describe('WorkRulesComponent', () => {
  let component: WorkRulesComponent;
  let fixture: ComponentFixture<WorkRulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkRulesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkRulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
