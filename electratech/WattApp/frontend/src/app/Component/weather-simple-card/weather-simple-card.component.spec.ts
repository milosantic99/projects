import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherSimpleCardComponent } from './weather-simple-card.component';

describe('WeatherSimpleCardComponent', () => {
  let component: WeatherSimpleCardComponent;
  let fixture: ComponentFixture<WeatherSimpleCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeatherSimpleCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeatherSimpleCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
