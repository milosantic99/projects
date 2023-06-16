import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsProsumerComponent } from './settings-prosumer.component';

describe('SettingsProsumerComponent', () => {
  let component: SettingsProsumerComponent;
  let fixture: ComponentFixture<SettingsProsumerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingsProsumerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingsProsumerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
