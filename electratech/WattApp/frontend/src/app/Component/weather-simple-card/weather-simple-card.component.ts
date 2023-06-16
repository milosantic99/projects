import { Component,Input } from '@angular/core';
import { faCloud } from '@fortawesome/free-solid-svg-icons';
import { WeatherModel } from 'src/app/Models/weather';

@Component({
  selector: 'app-weather-simple-card',
  templateUrl: './weather-simple-card.component.html',
  styleUrls: ['./weather-simple-card.component.css']
})
export class WeatherSimpleCardComponent {

  @Input() info = {} as WeatherModel;
  constructor(){
    // this.info.time=this.info.time.split("T")[0];
  }

  faCloud = faCloud;
}
