import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutlierHelpComponent } from './outlier-help.component';

describe('OutlierHelpComponent', () => {
  let component: OutlierHelpComponent;
  let fixture: ComponentFixture<OutlierHelpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutlierHelpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OutlierHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
