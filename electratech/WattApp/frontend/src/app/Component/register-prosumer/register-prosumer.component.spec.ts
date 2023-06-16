import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterProsumerComponent } from './register-prosumer.component';

describe('RegisterProsumerComponent', () => {
  let component: RegisterProsumerComponent;
  let fixture: ComponentFixture<RegisterProsumerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterProsumerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterProsumerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
