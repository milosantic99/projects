import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EpocheHelpComponent } from './epoche-help.component';

describe('EpocheHelpComponent', () => {
  let component: EpocheHelpComponent;
  let fixture: ComponentFixture<EpocheHelpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EpocheHelpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EpocheHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
