import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SnackBarComponent } from 'src/app/Component/snack-bar/snack-bar.component';
import { ProsumerDeviceCard } from 'src/app/Models/prosumer-device-card';
import { MyDeviceService } from 'src/app/Services/API/Prosumer-API/Device/my-device.service';

@Component({
  selector: 'app-list-devices',
  templateUrl: './list-devices.component.html',
  styleUrls: ['./list-devices.component.css']
})
export class ListDevicesComponent {
  menuType:string;

  cart!:any;
  strngCart!:string;

  constructor(private router:Router, private deviceService: MyDeviceService, private snackBar: MatSnackBar){
    if(window.innerWidth <= 480)
      this.menuType = "bottom";
    else
      this.menuType = "left";
  
    let info = sessionStorage.getItem('AddDevices');
    if(info!=null)
    {
      this.strngCart = info;
      this.cart =  JSON.parse(this.strngCart);
    }

  }

  ngOnInit(): void {
    this.listOfIds = [];
  }

  goBack(){
    this.router.navigate(['AddDevices']);
  }

  removeFromStorage(card:ProsumerDeviceCard){
    for(let i = 0; i<this.cart.length;i++){
      if(card.deviceId == this.cart[i].deviceId){
        this.cart.splice(i,1);
        sessionStorage.setItem('AddDevices',JSON.stringify(this.cart));
        break;
      }
    }
  }

  listOfIds: string[] = [];
  addDevice(){
    for (let i = 0; i < this.cart.length; i++)
      this.listOfIds[i] = this.cart[i].deviceId;

    this.deviceService.addDevices(this.listOfIds).subscribe(
      response => {
        
      },
      error => {
        this.getNotification();
        sessionStorage.setItem('AddDevices','[]'); 
        this.router.navigate(['MyDevices']);
      }
    );
  }

  getNotification() {
    this.openSnackBar("Uspešno dodavanje uređaja", "Okej");
  }

  openSnackBar(message: string, panelClass: string) {
    this.snackBar.openFromComponent(SnackBarComponent, {
      data: message,
      panelClass: panelClass,
      duration: 2500
    });
  }

}
