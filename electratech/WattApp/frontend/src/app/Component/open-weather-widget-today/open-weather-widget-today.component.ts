import { Component } from '@angular/core';
import { environment } from 'src/app/Enviroments/environment';

@Component({
  selector: 'app-open-weather-widget-today',
  templateUrl: './open-weather-widget-today.component.html',
  styleUrls: ['./open-weather-widget-today.component.css']
})
export class OpenWeatherWidgetTodayComponent {

  WeatherData: any;
  private apikey: string = environment.weatherAPIKey;
  
  ngOnInit(){
    this.WeatherData = {
      main: {temp: 0,
      temp_min: 0,
      temp_max: 0,
      feels_like: 0,
      humidity: 0
    },
      name: "",
      weather: [{icon: "10d"}]
    }
    this.getWeatherData();
  }

  getWeatherData(){
    fetch('https://api.openweathermap.org/data/2.5/weather?q=kragujevac&units=metric&appid=' + this.apikey)
    .then(response => response.json())
    .then((data) => {this.setWeatherData(data);});
  }

  setWeatherData(data: any){
    this.WeatherData = data;
    this.WeatherData.main.temp = this.WeatherData.main.temp.toFixed(0);
    this.WeatherData.main.temp_min = this.WeatherData.main.temp_min.toFixed(0);
    this.WeatherData.main.temp_max = this.WeatherData.main.temp_max.toFixed(0);
    this.WeatherData.main.feels_like = this.WeatherData.main.feels_like.toFixed(0);
  }
}
