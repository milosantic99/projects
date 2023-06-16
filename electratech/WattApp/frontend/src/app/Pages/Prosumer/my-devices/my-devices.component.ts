import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { faSearch,faTableCellsLarge,faTableList } from '@fortawesome/free-solid-svg-icons';
import { ThreeStateToggleSwitchComponent } from 'src/app/Component/three-state-toggle-switch/three-state-toggle-switch.component';
import { MyDevicesService } from 'src/app/Services/API/Prosumer-API/Device/my-devices.service';

export interface MyDeviceInterface{
  deviceId:string,
  linkerId:number,
  name:string,
  originalName:string,
  type:string,
  subType:string,
  image:string,
  status:boolean,
  consumption:number,
  percent:number
}

@Component({
  selector: 'app-my-devices',
  templateUrl: './my-devices.component.html',
  styleUrls: ['./my-devices.component.css']
})
export class MyDevicesComponent {
  @ViewChild("radio") radio!: ThreeStateToggleSwitchComponent;
  displayedColumns: string[] = ['naziv_uredjaja','model','status','consumption','percent'];

  faSearch = faSearch;
  faTableCells = faTableCellsLarge;
  faTableList = faTableList;

  menuType:string;
  type:any;                            //Za skrin, da li ce prikazivati potrosace ili proizvodjace

  displayType:string;                 //Za nacin prikazivanja uredjaja na stranici
  sortConsumption = 'off' as string;  //Za sortiranje po potrosnji, off->opadajuca->rastuca
  sortStatus = '' as string;       //Za sortiranje po statusu, da li su ukljuceni/iskljuceni 

  constructor(private router: Router, private deviceService: MyDevicesService) {
    this.type = "Potrošač";          
    this.displayType = "row";        
    if(window.innerWidth <= 480)
      this.menuType = "bottom";
    else
      this.menuType = "left";
  }

  ngOnInit(): void {
    this.getDevicesConsumption();
    this.getDeviceTypes();
  }

  goToUrl(id:string) {
    this.router.navigate(['MyDevice/' + id.toString()])
  }

  temporaryList: MyDeviceInterface[] = [];
  name: string = "";
  defaultFilter() {
    this.temporaryList = this.listOfDevices;
    if (this.radio.status == "yes")
      this.temporaryList = this.temporaryList.filter(x => x.status == true);
    else if (this.radio.status == "no")
      this.temporaryList = this.temporaryList.filter(x => x.status == false);
    
    if (this.name != "")
      this.temporaryList = this.temporaryList.filter(x => x.name.toLowerCase().indexOf(this.name.toLowerCase()) !== -1)  

    if (this.sortConsumption == "down")
      this.temporaryList = this.temporaryList.sort((x, y) => x.consumption - y.consumption).reverse();
    else if (this.sortConsumption == "up")
      this.temporaryList = this.temporaryList.sort((x, y) => x.consumption - y.consumption);

    if (this.selectOption != "Sve kategorije")
      this.temporaryList = this.temporaryList.filter(x => x.type.includes(this.selectOption));
  }

  listOfDevices: MyDeviceInterface[] = [];
  getDevicesConsumption() {
    this.deviceService.getDevices("potrosac").subscribe(
      response => {
        this.listOfDevices = response as MyDeviceInterface[];
        for (let i = 0; i < this.listOfDevices.length; i++){
          if (this.listOfDevices[i].percent < 0)
            this.listOfDevices[i].percent = 0;
          switch(this.listOfDevices[i].subType){
            case "TV":
              this.listOfDevices[i].image = "televizor";
              break;
            case "Frižideri":
              this.listOfDevices[i].image = "frizider";
              break;
            case "Grejači":
              this.listOfDevices[i].image = "grejaci";
              break;
            case "Mašine":
              this.listOfDevices[i].image = "vesMasina";  
              break;
            case "Aspiratori":
              this.listOfDevices[i].image = "aspirator";
              break;
            case "Šporeti":
              this.listOfDevices[i].image = "rerna";
              break;
            case "Bojleri":
              this.listOfDevices[i].image = "bojler";
              break;
            case "Aparati":
              this.listOfDevices[i].image = "aparati";  
              break;
            case "Klime":
              this.listOfDevices[i].image = "Klima";
              break;
            case "Ostalo":
              this.listOfDevices[i].image = "ostalo"; 
              break;
            case "Proizvođači":
              this.listOfDevices[i].image = "proizvodnja"; 
              break;
          }
        }
          

        this.temporaryList = this.listOfDevices;
        this.defaultFilter();
      },
      error => {
        console.error("GRESKA");
      }
    );
  }

  getDevicesProduction() {
    this.deviceService.getDevices("Proizvođač").subscribe(
      response => {
        this.listOfDevices = response as MyDeviceInterface[];
        for (let i = 0; i < this.listOfDevices.length; i++)
          this.listOfDevices[i].image = "proizvodnja";

        this.temporaryList = this.listOfDevices;
        this.defaultFilter();
      },
      error => {
        console.error("GRESKA");
      }
    );
  }

  listOfTypes: string[] = [];
  getDeviceTypes() {
    this.deviceService.getDevicesTypes().subscribe(
      response => {
        this.listOfTypes = response as string[];
      },
      error => {
        console.error("GRESKA");
      }
    );
  }

  selectOption: string = "Sve kategorije";
  setSelectFilter(option: string) {
    this.selectOption = option;
    this.defaultFilter();
  }


  setType(type:String){
    this.type = type;
    if (this.type == "Potrošač")
      this.getDevicesConsumption();
    else
      this.getDevicesProduction();
  }

  setDisplayType(type:string){
    this.displayType = type;
    this.sortConsumption = 'off';
    this.sortStatus = '';
  }

  setSortConsumption(){
    switch(this.sortConsumption){
      case 'off':
        this.sortConsumption = 'down';
        break;
      case 'down':
        this.sortConsumption = 'up';
        break;
      case 'up':
        this.sortConsumption = 'off';
        break;
    }
    
    this.defaultFilter();
  }

  selectedOn: boolean = false;
  selectedOff: boolean = false;

  setSortStatus(status:string){
    if(this.sortStatus == status){
      this.selectedOn = this.selectedOff = false;
    }
    else{
      switch(status){
        case 'on':
          this.selectedOn = true;
          this.selectedOff = false;
          break;
        case 'off':
          this.selectedOn = false;
          this.selectedOff = true;
          break;
      }
    }
  }

}
