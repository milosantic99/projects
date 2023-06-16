import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterProsumerDsoComponent } from './register-prosumer-dso.component';

describe('RegisterProsumerDsoComponent', () => {
  let component: RegisterProsumerDsoComponent;
  let fixture: ComponentFixture<RegisterProsumerDsoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterProsumerDsoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterProsumerDsoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
