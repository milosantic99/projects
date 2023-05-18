import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncoderHelpComponent } from './encoder-help.component';

describe('EncoderHelpComponent', () => {
  let component: EncoderHelpComponent;
  let fixture: ComponentFixture<EncoderHelpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EncoderHelpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EncoderHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
