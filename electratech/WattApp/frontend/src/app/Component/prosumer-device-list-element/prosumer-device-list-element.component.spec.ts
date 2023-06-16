import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProsumerDeviceListElementComponent } from './prosumer-device-list-element.component';

describe('ProsumerDeviceListElementComponent', () => {
  let component: ProsumerDeviceListElementComponent;
  let fixture: ComponentFixture<ProsumerDeviceListElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProsumerDeviceListElementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProsumerDeviceListElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
