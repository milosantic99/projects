import { Component } from '@angular/core';
import { environment } from 'src/app/Enviroments/environment';

@Component({
  selector: 'app-open-weather-widget',
  templateUrl: './open-weather-widget.component.html',
  styleUrls: ['./open-weather-widget.component.css']
})
export class OpenWeatherWidgetComponent {

  WeatherData: any;
  private apikey: string = environment.weatherAPIKey;

  imageDescription = [
    {
      img: "clear sky",
      descriptions: ["clear sky"]
    },
    {
      img: "few clouds",
      descriptions: ["few clouds"]
    },
    {
      img: "scattered clouds",
      descriptions: ["scattered clouds"]
    },
    {
      img: "broken clouds",
      descriptions: ["broken clouds", "overcast clouds"]
    },
    {
      img: "shower rain",
      descriptions: [
      "shower rain", 
      "light intensity drizzle", 
      "drizzle", 
      "heavy intensity drizzle", 
      "light intensity drizzle rain", 
      "drizzle rain", 
      "heavy intensity drizzle rain",
      "shower rain and drizzle",
      "heavy shower rain and drizzle",
      "light intensity shower rain",
      "shower rain",
      "heavy intensity shower rain",
      "ragged shower rain",
      "shower drizzle"
    ]},
    {
      img: "thunderstorm",
      descriptions: [
      "thunderstorm with light rain", 
      "thunderstorm with rain", 
      "thunderstorm with heavy rain", 
      "light thunderstorm", 
      "thunderstorm", 
      "heavy thunderstorm", 
      "ragged thunderstorm",
      "thunderstorm with light drizzle",
      "thunderstorm with drizzle",
      "thunderstorm with heavy drizzle"
    ]},
    {
      img: "rain",
      descriptions: [
      "rain", 
      "light rain", 
      "moderate rain", 
      "heavy intensity rain", 
      "very heavy rain", 
      "extreme rain"
    ]},
    {
      img: "snow",
      descriptions: [
      "freezing rain", 
      "light snow", 
      "snow", 
      "heavy snow", 
      "sleet", 
      "light shower sleet", 
      "shower sleet", 
      "light rain and snow", 
      "rain and snow", 
      "light shower snow", 
      "shower snow", 
      "heavy shower snow", 
      "extreme rain"
    ]},
    {
      img: "mist",
      descriptions: [
      "mist", 
      "smoke", 
      "haze", 
      "sand/dust whirls", 
      "fog", 
      "sand", 
      "dust", 
      "volcanic ash", 
      "squalls", 
      "tornado"
    ]}
  ]

  searchObj: {descriptions: descImg[]} = {descriptions: []};
  createSearchObj(){
    this.imageDescription.forEach(obj => {
      obj.descriptions.forEach(desc => this.searchObj.descriptions.push({description: desc, img: obj.img}));
    });
  }
  
  getForecastImageName(description: string): string{
    let imgName = "";
    for (let i = 0; i < this.searchObj.descriptions.length; i++){
      let obj = this.searchObj.descriptions[i];
      if (obj.description === description) {
        imgName = obj.img;
        break;
      }
    }
    return imgName;
  }

  constructor() {}

  ngOnInit(){
    this.getWeatherData();
    this.WeatherData = {
      list: [],
      city: {name: ""}
    }
    
    for (let i=0; i<5; i++) 
    this.WeatherData.list.push({dt: 0, dt_txt:"",
    main: {
      temp: 0,
      feels_like: 0,

    },
    weather: [{icon: "10d"}]}
    );
  }

  getWeatherData(){
    fetch('https://api.openweathermap.org/data/2.5/forecast?q=Kragujevac&cnt=40&units=metric&appid=' + this.apikey)
    .then(response => response.json())
    .then((data) => {this.setWeatherData(data);});
  }

  setWeatherData(data: any){
    this.WeatherData = data;
    for (let i=0; i<5; i++){
      this.WeatherData.list[i*8].main.temp = this.WeatherData.list[i*8].main.temp.toFixed(0);
      this.WeatherData.list[i*8].main.temp_min = this.WeatherData.list[i*8].main.temp_min.toFixed(0);
      this.WeatherData.list[i*8].main.temp_max = this.WeatherData.list[i*8].main.temp_max.toFixed(0);
      this.WeatherData.list[i*8].main.feels_like = this.WeatherData.list[i*8].main.feels_like.toFixed(0);
      this.WeatherData.list[i*8].dt_txt = new Date(this.WeatherData.list[i*8].dt_txt).toLocaleDateString("sr-RS");
      this.WeatherData.list[i] = this.WeatherData.list[i*8];
    }
    
  }
}

export interface descImg {
  description: string;
  img: string;
}