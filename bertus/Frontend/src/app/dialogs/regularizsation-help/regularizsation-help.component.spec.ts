import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegularizsationHelpComponent } from './regularizsation-help.component';

describe('RegularizsationHelpComponent', () => {
  let component: RegularizsationHelpComponent;
  let fixture: ComponentFixture<RegularizsationHelpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegularizsationHelpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegularizsationHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
