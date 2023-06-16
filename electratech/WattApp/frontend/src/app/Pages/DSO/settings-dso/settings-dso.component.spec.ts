import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsDsoComponent } from './settings-dso.component';

describe('SettingsDsoComponent', () => {
  let component: SettingsDsoComponent;
  let fixture: ComponentFixture<SettingsDsoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingsDsoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingsDsoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
