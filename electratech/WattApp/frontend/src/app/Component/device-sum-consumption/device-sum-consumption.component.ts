import { Component, Input } from '@angular/core';
import { DeviceSumConsumption } from 'src/app/Models/deviceSumConsumption';

@Component({
  selector: 'app-device-sum-consumption',
  templateUrl: './device-sum-consumption.component.html',
  styleUrls: ['./device-sum-consumption.component.css']
})
export class DeviceSumConsumptionComponent {
  
  @Input() info={} as DeviceSumConsumption;

  color: string = "green";

  checkColor(br: string) {
    var pom = br[0];
    if (pom == "-")
      this.color = "green";
    else
      this.color = "red";
    
    return this.color;
  }

}
