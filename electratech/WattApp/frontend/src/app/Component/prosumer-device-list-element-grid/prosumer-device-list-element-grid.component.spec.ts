import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProsumerDeviceListElementGridComponent } from './prosumer-device-list-element-grid.component';

describe('ProsumerDeviceListElementGridComponent', () => {
  let component: ProsumerDeviceListElementGridComponent;
  let fixture: ComponentFixture<ProsumerDeviceListElementGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProsumerDeviceListElementGridComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProsumerDeviceListElementGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
