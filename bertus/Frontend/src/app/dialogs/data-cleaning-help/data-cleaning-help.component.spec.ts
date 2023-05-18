import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataCleaningHelpComponent } from './data-cleaning-help.component';

describe('DataCleaningHelpComponent', () => {
  let component: DataCleaningHelpComponent;
  let fixture: ComponentFixture<DataCleaningHelpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataCleaningHelpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataCleaningHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
