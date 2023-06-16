import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenWeatherWidgetTodayComponent } from './open-weather-widget-today.component';

describe('OpenWeatherWidgetTodayComponent', () => {
  let component: OpenWeatherWidgetTodayComponent;
  let fixture: ComponentFixture<OpenWeatherWidgetTodayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpenWeatherWidgetTodayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpenWeatherWidgetTodayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
