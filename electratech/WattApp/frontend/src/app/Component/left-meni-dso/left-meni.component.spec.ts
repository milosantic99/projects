import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftMeniComponent } from './left-meni.component';

describe('LeftMeniComponent', () => {
  let component: LeftMeniComponent;
  let fixture: ComponentFixture<LeftMeniComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeftMeniComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeftMeniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
