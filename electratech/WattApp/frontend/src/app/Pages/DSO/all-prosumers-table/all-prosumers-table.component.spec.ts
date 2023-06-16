import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllProsumersTableComponent } from './all-prosumers-table.component';

describe('AllProsumersTableComponent', () => {
  let component: AllProsumersTableComponent;
  let fixture: ComponentFixture<AllProsumersTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllProsumersTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllProsumersTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
