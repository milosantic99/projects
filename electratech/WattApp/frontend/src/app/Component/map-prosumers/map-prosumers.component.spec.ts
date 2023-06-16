import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapProsumersComponent } from './map-prosumers.component';

describe('MapProsumersComponent', () => {
  let component: MapProsumersComponent;
  let fixture: ComponentFixture<MapProsumersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapProsumersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapProsumersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
