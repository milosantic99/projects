import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftMeniProsumerComponent } from './left-meni-prosumer.component';

describe('LeftMeniProsumerComponent', () => {
  let component: LeftMeniProsumerComponent;
  let fixture: ComponentFixture<LeftMeniProsumerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeftMeniProsumerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeftMeniProsumerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
