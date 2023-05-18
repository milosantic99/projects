import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LossTypeHelpComponent } from './loss-type-help.component';

describe('LossTypeHelpComponent', () => {
  let component: LossTypeHelpComponent;
  let fixture: ComponentFixture<LossTypeHelpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LossTypeHelpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LossTypeHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
