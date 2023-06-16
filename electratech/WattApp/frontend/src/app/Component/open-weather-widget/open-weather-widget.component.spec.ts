import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenWeatherWidgetComponent } from './open-weather-widget.component';

describe('OpenWeatherWidgetComponent', () => {
  let component: OpenWeatherWidgetComponent;
  let fixture: ComponentFixture<OpenWeatherWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpenWeatherWidgetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpenWeatherWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
