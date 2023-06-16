import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { SnackBarComponent } from 'src/app/Component/snack-bar/snack-bar.component';
import { ProsumerDeviceCard } from 'src/app/Models/prosumer-device-card';
import { MyDevicesService } from 'src/app/Services/API/Prosumer-API/Device/my-devices.service';

export interface DeviceFromApi {
  id: string;
  type: string;
  manufacturer: string;
  model: string;
  consumption: number;
}

@Component({
  selector: 'app-add-devices',
  templateUrl: './add-devices.component.html',
  styleUrls: ['./add-devices.component.css']
})
export class AddDevicesComponent {

  faSearch = faSearch;

  menuType:string;
  type:string;
  selectOption:string = "all";

  cart!:any;
  strngCart!:string;
  numInCart:number;

  constructor(private router:Router, private deviceService: MyDevicesService, private snackBar: MatSnackBar){
    this.type = 'Potrošač';
    if(window.innerWidth <= 480)
      this.menuType = "bottom";
    else
      this.menuType = "left";

    let info = sessionStorage.getItem('AddDevices');
    if(info!=null)
    {
      this.strngCart = info;
      this.cart = JSON.parse(this.strngCart);
    }
    else
    {
      sessionStorage.setItem('AddDevices','[]');
      let info = sessionStorage.getItem('AddDevices');
      if(info!=null)
      {
        this.strngCart = info;
        this.cart = JSON.parse(this.strngCart);
      }
    }
    this.numInCart = this.cart.length;
  }

  ngOnInit(): void{
    this.getDeviceTypes();
    this.getDevices();
  }

  getNotification() {
    this.openSnackBar("Uređaj je spreman za dodavanje", 'snack-bar');
  }

  openSnackBar(message: string, panelClass: string) {
  this.snackBar.openFromComponent(SnackBarComponent, {
    data: message,
    panelClass: panelClass,
    duration: 2500
  });
}


  typesOfDevices: string[] = []
  getDeviceTypes() {
    this.deviceService.getDevicesTypes().subscribe(
      response => {
        this.typesOfDevices = response as string[];
      },
      error => {
        console.error("ERROR");
      }
    );
  }

  devices: ProsumerDeviceCard[] = [];
  getDevices() {
    this.deviceService.GetDevicesForAddDevicePage().subscribe(
      response => {
        this.devices = response as ProsumerDeviceCard[];
        for (let i = 0; i < this.devices.length; i++) {
          switch(this.devices[i].subType){
            case "TV":
              this.devices[i].image = "televizor";
              break;
            case "Frižideri":
              this.devices[i].image = "frizider";
              break;
            case "Grejači":
              this.devices[i].image = "grejaci";
              break;
            case "Mašine":
              this.devices[i].image = "vesMasina";  
              break;
            case "Aspiratori":
              this.devices[i].image = "aspirator";
              break;
            case "Šporeti":
              this.devices[i].image = "rerna";
              break;
            case "Bojleri":
              this.devices[i].image = "bojler";
              break;
            case "Aparati":
              this.devices[i].image = "aparati";  
              break;
            case "Klime":
              this.devices[i].image = "klima";
              break;
            case "Ostalo":
              this.devices[i].image = "ostalo"; 
              break;
            case "Proizvođači":
              this.devices[i].image = "proizvodnja"; 
              break;
          }
        }

        this.defaultFilter();
        
      },
      error => {
        console.error("ERROR");
      }
    );
  }

  temporaryList: ProsumerDeviceCard[] = [];
  name: string = "";
  defaultFilter() {
    this.temporaryList = this.devices;

    if (this.type == "Potrošač")
      this.temporaryList = this.temporaryList.filter(x => !x.type.includes("Proizvođač"));
    else
      this.temporaryList = this.temporaryList.filter(x => x.type.includes("Proizvođač"));

    if (this.name != "")
      this.temporaryList = this.temporaryList.filter(x => x.title.toLowerCase().indexOf(this.name.toLowerCase()) !== -1)  

    if (this.selectOption != "all")
      this.temporaryList = this.temporaryList.filter(x => x.type.includes(this.selectOption));  
  }

  setSelectFilter(option: string) {
    this.selectOption = option;
    this.defaultFilter();
  }

  goToViewList(){
    this.router.navigate(['AddDevices/List']);
  }

  setType(type: string){
    this.type = type;
    this.defaultFilter();
  }

  addToSession(card:ProsumerDeviceCard){
    this.getNotification();
    var newCard = {
      deviceId:card.deviceId,
      image:card.image,
      type:card.type,
      title:card.title,
      subtitle:card.subtitle,
      icon:'faMinus'
    } as ProsumerDeviceCard;
    this.cart.push(newCard);
    this.numInCart += 1;
    sessionStorage.setItem('AddDevices',JSON.stringify(this.cart));
  }

}
