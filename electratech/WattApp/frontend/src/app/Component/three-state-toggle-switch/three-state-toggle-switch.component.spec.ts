import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreeStateToggleSwitchComponent } from './three-state-toggle-switch.component';

describe('ThreeStateToggleSwitchComponent', () => {
  let component: ThreeStateToggleSwitchComponent;
  let fixture: ComponentFixture<ThreeStateToggleSwitchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThreeStateToggleSwitchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThreeStateToggleSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
