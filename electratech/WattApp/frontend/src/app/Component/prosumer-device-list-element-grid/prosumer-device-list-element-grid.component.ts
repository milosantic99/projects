import { Component, Input,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MyDeviceInterface } from 'src/app/Pages/Prosumer/my-devices/my-devices.component';

@Component({
  selector: 'app-prosumer-device-list-element-grid',
  templateUrl: './prosumer-device-list-element-grid.component.html',
  styleUrls: ['./prosumer-device-list-element-grid.component.css']
})
export class ProsumerDeviceListElementGridComponent implements OnInit{

  @Input() info = {} as MyDeviceInterface;

  status='' as string;

  constructor(private router: Router) {}

  ngOnInit(): void {
    switch(this.info.status){
      case false:
        this.status = 'Isključeno';
        break;
      case true:
        this.status = 'Uključeno';
        break;
    }
  }

  goToUrl() {
    this.router.navigate(['MyDevice/' + this.info.deviceId]);
  }
 
}
