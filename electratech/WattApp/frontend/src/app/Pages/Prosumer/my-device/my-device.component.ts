import { Component, OnInit, ViewChild} from '@angular/core';
import { GraphConsumption } from 'src/app/Models/consumptionDevice';
import { DeviceSumConsumption } from 'src/app/Models/deviceSumConsumption';
import { faBan, faCheck, faEdit } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from 'src/app/Component/dialog-box/dialog-box.component';
import { MyDeviceService, WorkRules } from 'src/app/Services/API/Prosumer-API/Device/my-device.service';
import { LineGraphProsumerComponent } from 'src/app/Component/line-graph-prosumer/line-graph-prosumer.component';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/Services/API/Security/Login/login.service';
import { NgToggleComponent } from 'ng-toggle-button';
import { catchError } from 'rxjs/operators';
import { WorkRulesComponent } from 'src/app/Component/work-rules/work-rules.component';

export interface GraphData {
  date: string;
  consumption: number;
}

export interface GraphDataProduction {
  date: string;
  production: number;
}

export interface DeviceForDevicePage {
  linkerId: number;
  proizvodjac: string;
  imeUredjaja: string;
  status: boolean;
  pristup: boolean;
  kontrola: boolean;
}

export interface SetDeviceName {
  linkerId: number;
  deviceName: string;
}

@Component({
  selector: 'app-my-device',
  templateUrl: './my-device.component.html',
  styleUrls: ['./my-device.component.css']
})
export class MyDeviceComponent implements OnInit{
  @ViewChild("graph") graph!: LineGraphProsumerComponent;
  @ViewChild("rule") workRule!: WorkRulesComponent;

  device = {} as DeviceForDevicePage;
  listGraphData!: GraphData[];
  listGraphDataProduction!: GraphDataProduction[];
  menuType:string;
  toggleLabels = {checked: 'ON', unchecked: 'OFF'};
  toggleColor ={checked: '#6E9C0C', unchecked: 'silver'};
  faEdit = faEdit;
  faCheck=faCheck;
  faBan=faBan;

  rola: string;
  constructor(private router: Router, private matDialog: MatDialog, private deviceService: MyDeviceService, private route: ActivatedRoute, private login: LoginService){
    this.rola = this.login.getRole();
    if(window.innerWidth <= 480)
      this.menuType = "bottom";
    else
      this.menuType = "left";
    
    this.route.params.subscribe(params => {
      this.deviceId = params['deviceId'];
    });
  }

  deviceId:string = '';

  graphInfo: GraphConsumption = {
    labels: [],
    data: [],
    timeConsumption: ""
  };

  whatItIs: string = "";
  isProduction: string = "";
  ngOnInit(): void {
    this.getDevice();
  }

  goBack() {
    this.router.navigate(['MyDevices']);
  }
  getWorkRules(linkerId:number){
    this.deviceService.getWorkRules(linkerId).subscribe(
      response=>{
        this.workRule.binding(response);
      },
      error=>{
        if (error.status === 400) {}
        else{
          console.error(error.error);
        }
      },
      ()=>{}
    )
  }

  getDevice() {
    this.deviceService.getDeviceForDevicePage(this.deviceId).subscribe(
      response => {
        this.device = response as DeviceForDevicePage;
        this.whatItIs = this.device.proizvodjac;
        this.getWorkRules(this.device.linkerId);
        if (this.device.status == false) {
          this.status = "OFF";
          this.statusColor = "#ED2B2A";
        }
        else {
          this.status = "ON";
          this.statusColor = "#5D9C59";
        }

        if (this.device.pristup == false) {
          this.pristup = "OFF";
          this.pristupColor = "#ED2B2A";
        }
        else {
          this.pristup = "ON";
          this.pristupColor = "#5D9C59";
        }

        if (this.device.kontrola == false) {
          this.kontrola = "OFF";
          this.kontrolaColor = "#ED2B2A";
        }
        else {
          this.kontrola = "ON";
          this.kontrolaColor = "#5D9C59";
        }

        if (this.rola == 'ROLE_PROSUMER_DEMO') {
          this.isDemo = true;
          this.pristup = "OFF";
          this.pristupColor = "#a9a9a9";
          this.kontrola = "OFF";
          this.kontrolaColor = "#a9a9a9";
        }
          
        if (this.whatItIs == "Proizvođač") {
          this.isProduction = "proizvodnja";
          this.getDailySumProduction();
          this.getTodayGraphProduction();
        }
        else {
          this.isProduction = "potrošnja";
          this.getDailySum();
          this.getTodayGraph();
        } 
      },
      error => {
        console.error("GRESKA");
      }
    );
  }

  isLoading = true;
  getTodayGraph() {
    this.isLoading = true;
    this.graph.deleteGraph();
    this.deviceService.getOverviewOfDailyConsumptionForDevice(this.device.linkerId).subscribe(
      response => {
        this.graphInfo = {
          labels: [],
          data: [],
          timeConsumption: ""
        };
        this.listGraphData = response as GraphData[];
        var hour = new Date().getHours();
        for (let i = 0; i < this.listGraphData.length; i++) {
          this.graphInfo.labels[i] = this.listGraphData[i].date;
          if (hour >= (Number)(this.listGraphData[i].date))
            this.graphInfo.data[i] = this.listGraphData[i].consumption;
        }
        this.graphInfo.timeConsumption = "Vreme u časovima";
        this.isLoading = false;
        this.graph.drawGraph(this.graphInfo);
      },
      error => {
        console.error("GRESKA");
      }
    );
  }

  getTodayGraphProduction() {
    this.isLoading = true;
    this.graph.deleteGraph();
    this.deviceService.getOverviewOfDailyProductionForDevice(this.device.linkerId).subscribe(
      response => {
        this.graphInfo = {
          labels: [],
          data: [],
          timeConsumption: ""
        };
        this.listGraphDataProduction = response as GraphDataProduction[];
        var hour = new Date().getHours();
        for (let i = 0; i < this.listGraphDataProduction.length; i++) {
          this.graphInfo.labels[i] = this.listGraphDataProduction[i].date;
          if (hour >= (Number)(this.listGraphDataProduction[i].date))
            this.graphInfo.data[i] = this.listGraphDataProduction[i].production;
        }
        this.graphInfo.timeConsumption = "Vreme u časovima";
        this.isLoading = false;
        console.log(this.graphInfo);
        this.graph.drawGraphProduction(this.graphInfo);
      },
      error => {
        console.error("GRESKA");
      }
    );
  }

  getWeekGraph() {
    this.isLoading = true;
    this.graph.deleteGraph();
    this.deviceService.getOverviewOfWeeklyConsumptionForDevice(this.device.linkerId).subscribe(
      response => {
        this.graphInfo = {
          labels: [],
          data: [],
          timeConsumption: ""
        };
        this.listGraphData = response as GraphData[];
        // this.listGraphData.reverse();
        for (let i = 0; i < this.listGraphData.length; i++) {
          this.graphInfo.labels[i] = this.listGraphData[i].date;
          this.graphInfo.data[i] = this.listGraphData[i].consumption;
        }
        this.graphInfo.timeConsumption = "Vreme u danima u nedelji";
        this.isLoading = false;
        this.graph.drawGraph(this.graphInfo);
      },
      error => {
        console.error("GRESKA");
      }
    );
  }

  getWeekGraphProduction() {
    this.isLoading = true;
    this.graph.deleteGraph();
    this.deviceService.getOverviewOfWeeklyProductionForDevice(this.device.linkerId).subscribe(
      response => {
        this.graphInfo = {
          labels: [],
          data: [],
          timeConsumption: ""
        };
        this.listGraphDataProduction = response as GraphDataProduction[];
        // this.listGraphDataProduction.reverse();
        for (let i = 0; i < this.listGraphDataProduction.length; i++) {
          this.graphInfo.labels[i] = this.listGraphDataProduction[i].date;
          this.graphInfo.data[i] = this.listGraphDataProduction[i].production;
        }
        this.graphInfo.timeConsumption = "Vreme u danima u nedelji";
        this.isLoading = false;
        this.graph.drawGraphProduction(this.graphInfo);
      },
      error => {
        console.error("GRESKA");
      }
    );
  }

  getMonthGraph() {
    this.isLoading = true;
    this.graph.deleteGraph();
    this.deviceService.getOverviewOfMonthlyConsumptionForDevice(this.device.linkerId).subscribe(
      response => {
        this.graphInfo = {
          labels: [],
          data: [],
          timeConsumption: ""
        };
        this.listGraphData = response as GraphData[];
        for (let i = 0; i < this.listGraphData.length; i++) {
          this.graphInfo.labels[i] = this.listGraphData[i].date.split('T')[0];
          this.graphInfo.data[i] = this.listGraphData[i].consumption;
        }
        this.graphInfo.timeConsumption = "Vreme u danima u mesecu";
        this.isLoading = false;
        this.graph.drawGraph(this.graphInfo);
      },
      error => {
        console.error("GRESKA");
      }
    );
  }

  getMonthGraphProduction() {
    this.isLoading = true;
    this.graph.deleteGraph();
    this.deviceService.getOverviewOfMonthlyProductionForDevice(this.device.linkerId).subscribe(
      response => {
        this.graphInfo = {
          labels: [],
          data: [],
          timeConsumption: ""
        };
        this.listGraphDataProduction = response as GraphDataProduction[];
        for (let i = 0; i < this.listGraphDataProduction.length; i++) {
          this.graphInfo.labels[i] = this.listGraphDataProduction[i].date.split('T')[0];
          this.graphInfo.data[i] = this.listGraphDataProduction[i].production;
        }
        this.graphInfo.timeConsumption = "Vreme u danima u mesecu";
        this.isLoading = false;
        this.graph.drawGraphProduction(this.graphInfo);
      },
      error => {
        console.error("GRESKA");
      }
    );
  }

  prod: DeviceSumConsumption = {
    vreme:"danas",
    tip: this.isProduction,
    price:"0din.",
    consumption:"0 W",
    pricePlus:"",
    pricePercentage:"",
    consumptionPlus:"",
    consumptionPercentage:""
  }

  getValueOfPrice(price: number) {
    if (price == 0)
      return "0din.";

    let randomNum = Math.floor(Math.random() * 11);
    let pomDin = Math.round(price / 100 * 100) / 100;

    if (randomNum % 2 == 0)
      pomDin = pomDin - 0.5;
    else
      pomDin = pomDin + 0.5;

    pomDin = Math.round(pomDin * 100) / 100;
    let pomDinStr;
    if (pomDin > 0)
      pomDinStr = "+" + pomDin + "din.";
    else
      pomDinStr = pomDin + "din.";
    return pomDinStr;
  }

  getValueOfKWH(value: number) {
    if (value == 0)
      return "0 kWh";

    let randomNum = Math.floor(Math.random() * 11);
    let pomKWH = Math.round(value / 100 * 100) / 100;

    if (randomNum % 2 == 0)
      pomKWH = pomKWH - 0.7;
    else
      pomKWH = pomKWH + 0.7;
    
    pomKWH = Math.round(pomKWH * 100) / 100;
    let pomDinStr;
    if (pomKWH > 0)
      pomDinStr = "+" + pomKWH + " kWh";
    else
      pomDinStr = pomKWH + " kWh";
    return pomDinStr;
  }

  getPercentageOfPrice(price: number) {
    if (price == 0)
      return "0din.";
    
    let randomNum = Math.floor(Math.random() * 11);
    let pomDin = Math.round(price / 100 * 100) / 100;

    if (randomNum % 2 == 0)
      pomDin = pomDin - 5.5;
    else
      pomDin = pomDin + 5.5;
    
    pomDin = Math.round(pomDin * 100) / 100;
    let pomDinStr;
    if (pomDin > 0)
      pomDinStr = "+" + pomDin + "%";
    else
      pomDinStr = pomDin + "%";
    return pomDinStr;
  }

  getPercentegeOfKWH(value: number) {
    if (value == 0)
      return "0 kWh";
    
    let randomNum = Math.floor(Math.random() * 11);
    let pomDin = Math.round(value / 100 * 100) / 100;

    if (randomNum % 2 == 0)
      pomDin = pomDin - 5.5;
    else
      pomDin = pomDin + 5.5;

    pomDin = Math.round(pomDin * 100) / 100;
    
    let pomDinStr;
    if (pomDin > 0)
      pomDinStr = "+" + pomDin + "%";
    else
      pomDinStr = pomDin + "%";
    return pomDinStr;
  }

  first: boolean = true;
  getDailySum() {
    this.deviceService.getSumOfDailyConsumptionForDevice(this.device.linkerId).subscribe(
      response => {
        let sum = response as number;
        this.prod.vreme = "danas";
        this.prod.tip = this.isProduction;
        this.prod.consumption = sum + " W";
        let price = 7.5 * (Number)(sum) / 1000;
        this.prod.price = Math.round(price * 100) / 100 + "din.";
        // treba dodati smisao ostalim vrednostima
        this.prod.pricePlus = this.getValueOfPrice(price);
        this.prod.consumptionPlus = this.getValueOfKWH(sum);
        this.prod.pricePercentage = this.getPercentageOfPrice(price);
        this.prod.consumptionPercentage = this.getPercentegeOfKWH(sum);
      },
      error => {
        console.error("GRESKA");
      }
    );
  }

  getDailySumProduction() {
    this.deviceService.getSumOfDailyProudctionForDevice(this.device.linkerId).subscribe(
      response => {
        let sum = response as number;
        this.prod.vreme = "danas";
        this.prod.tip = this.isProduction;
        this.prod.consumption = sum + " W";
        let price = 7.5 * (Number)(sum) / 1000;
        this.prod.price = Math.round(price * 100) / 100 + "din.";
        // treba dodati smisao ostalim vrednostima
        this.prod.pricePlus = this.getValueOfPrice(price);
        this.prod.consumptionPlus = this.getValueOfKWH(sum);
        this.prod.pricePercentage = this.getPercentageOfPrice(price);
        this.prod.consumptionPercentage = this.getPercentegeOfKWH(sum);
      },
      error => {
        console.error("GRESKA");
      }
    );
  }

  getWeeklySum() {
    this.deviceService.getSumOfWeeklyConsumptionForDevice(this.device.linkerId).subscribe(
      response => {
        let sum = response as number;
        this.prod.vreme = "proteklih nedelju dana";
        this.prod.tip = this.isProduction;
        this.prod.consumption = sum + " kWh";
        let price = 7.5 * (Number)(sum);
        this.prod.price = Math.round(price * 100) / 100 + "din.";
        // treba dodati smisao ostalim vrednostima
        this.prod.pricePlus = this.getValueOfPrice(price);
        this.prod.consumptionPlus = this.getValueOfKWH(sum);
        this.prod.pricePercentage = this.getPercentageOfPrice(price);
        this.prod.consumptionPercentage = this.getPercentegeOfKWH(sum);
      },
      error => {
        console.error("GRESKA");
      }
    );
  }

  getWeeklySumProduction() {
    this.deviceService.getSumOfWeeklyProductionForDevice(this.device.linkerId).subscribe(
      response => {
        let sum = response as number;
        this.prod.vreme = "proteklih nedelju dana";
        this.prod.tip = this.isProduction;
        this.prod.consumption = sum + " kWh";
        let price = 7.5 * (Number)(sum);
        this.prod.price = Math.round(price * 100) / 100 + "din.";
        // treba dodati smisao ostalim vrednostima
        this.prod.pricePlus = this.getValueOfPrice(price);
        this.prod.consumptionPlus = this.getValueOfKWH(sum);
        this.prod.pricePercentage = this.getPercentageOfPrice(price);
        this.prod.consumptionPercentage = this.getPercentegeOfKWH(sum);
      },
      error => {
        console.error("GRESKA");
      }
    );
  }

  getMonthlySum() {
    this.deviceService.getSumOfMonthlyConsumptionForDevice(this.device.linkerId).subscribe(
      response => {
        let sum = response as number;
        this.prod.vreme = "tekući mesec";
        this.prod.tip = this.isProduction;
        this.prod.consumption = sum + " kWh";
        let price = 7.5 * (Number)(sum);
        this.prod.price = Math.round(price * 100) / 100 + "din.";
        // treba dodati smisao ostalim vrednostima
        this.prod.pricePlus = this.getValueOfPrice(price);
        this.prod.consumptionPlus = this.getValueOfKWH(sum);
        this.prod.pricePercentage = this.getPercentageOfPrice(price);
        this.prod.consumptionPercentage = this.getPercentegeOfKWH(sum);
      },
      error => {
        console.error("GRESKA");
      }
    );
  }

  getMonthlySumProduction() {
    this.deviceService.getSumOfMonthlyProductionForDevice(this.device.linkerId).subscribe(
      response => {
        let sum = response as number;
        this.prod.vreme = "tekući mesec";
        this.prod.tip = this.isProduction;
        this.prod.consumption = sum + " kWh";
        let price = 7.5 * (Number)(sum);
        this.prod.price = Math.round(price * 100) / 100 + "din.";
        // treba dodati smisao ostalim vrednostima
        this.prod.pricePlus = this.getValueOfPrice(price);
        this.prod.consumptionPlus = this.getValueOfKWH(sum);
        this.prod.pricePercentage = this.getPercentageOfPrice(price);
        this.prod.consumptionPercentage = this.getPercentegeOfKWH(sum);
      },
      error => {
        console.error("GRESKA");
      }
    );
  }

  editTitle=false;
  setEditTitle(){
    switch(this.editTitle){
      case false:
        this.editTitle = true;
        break;
      case true:
        this.editTitle = false;
        break;
          
    }
  }

  changeTitle(title:string){
    if (this.device.imeUredjaja == title) {
      this.setEditTitle();
      return;
    }

    if(title.length>0) {
      var setDevice = {} as SetDeviceName;
      setDevice = {
        linkerId: this.device.linkerId,
        deviceName: title
      }
      this.deviceService.setDeviceName(setDevice).subscribe(
        response => {},
        error => console.log("name changed")
      )
      this.device.imeUredjaja = title;
    }
    this.setEditTitle();
  }

  status: string = "OFF";
  statusColor: string = "#ED2B2A";
  pristup: string = "OFF";
  pristupColor: string = "#ED2B2A";
  kontrola: string = "OFF";
  kontrolaColor: string = "#ED2B2A";
  isDemo: boolean = false;
  openModalStatus() {
    if (this.status == "OFF") {
      let dialogRef = this.matDialog.open(DialogBoxComponent, {
        data: {
          question: "Da li ste sigurni da želite da uključite uredjaj: " + this.device.imeUredjaja + "?",
          answer: ""
        }
      });
  
      dialogRef.afterClosed().subscribe(
        result => {
          if (result.answer == "Yes") {
            this.deviceService.turnOnOff(this.device.linkerId).subscribe(
              res => console.log('HTTP response', res),
              error => console.log("status changed")
            );
            this.status = "ON";
            this.statusColor = "#5D9C59";
            return;
          }
          this.status = "OFF";
          this.statusColor = "#ED2B2A";
        }
      )
    }
    else {
      let dialogRef = this.matDialog.open(DialogBoxComponent, {
        data: {
          question: "Da li ste sigurni da želite da isključite uredjaj: " + this.device.imeUredjaja + "?",
          answer: ""
        }
      });

      dialogRef.afterClosed().subscribe(
        result => {
          if (result.answer == "Yes") {
            this.deviceService.turnOnOff(this.device.linkerId).subscribe(
              res => console.log('HTTP response', res),
              error => console.log("status changed")
            );
            this.status = "OFF";
            this.statusColor = "#ED2B2A";
            return;
          }
          else {
            this.status = "ON";
            this.statusColor = "#5D9C59";
          }
        }
      )
    }
  }

  openModalPristup() {
    if (this.pristup == "OFF") {
      let dialogRef = this.matDialog.open(DialogBoxComponent, {
        data: {
          question: "Da li ste sigurni da želite da DSO-u date pristup uredjaju: " + this.device.imeUredjaja + "?",
          answer: ""
        }
      });
  
      dialogRef.afterClosed().subscribe(
        result => {
          if (result.answer == "Yes") {
            this.deviceService.allowDisallowAccess(this.device.linkerId).subscribe(
              res => console.log('HTTP response', res),
              error => console.log("access changed")
            );
            this.pristup = "ON";
            this.pristupColor = "#5D9C59";
            return;
          }
          else {
            this.pristup = "OFF";
            this.pristupColor = "#ED2B2A";
          }
            
        }
      )
    }
    else {
      let dialogRef = this.matDialog.open(DialogBoxComponent, {
        data: {
          question: "Da li ste sigurni da želite da DSO-u oduzmete pristup uredjaju: " + this.device.imeUredjaja + "?",
          answer: ""
        }
      });

      dialogRef.afterClosed().subscribe(
        result => {
          if (result.answer == "Yes") {
            this.deviceService.allowDisallowAccess(this.device.linkerId).subscribe(
              res => console.log('HTTP response', res),
              error => console.log("access changed")
            );
            this.pristup = "OFF";
            this.pristupColor = "#ED2B2A";
            this.kontrola = "OFF";
            this.kontrolaColor = "#ED2B2A"
            return;
          }
          else {
            this.pristup = "ON";
            this.pristupColor = "#5D9C59";
          }
        }
      )
    }
  }

  openModalKontrola() {
    if (this.kontrola == "OFF") {
      let dialogRef = this.matDialog.open(DialogBoxComponent, {
        data: {
          question: "Da li ste sigurni da želite da DSO-u date kontrolu uredjaja:  " + this.device.imeUredjaja + "?",
          answer: ""
        }
      });
  
      dialogRef.afterClosed().subscribe(
        result => {
          if (result.answer == "Yes") {
            this.deviceService.giveTakeControl(this.device.linkerId).subscribe(
              res => console.log('HTTP response', res),
              error => console.log("contol changed")
            );
            this.kontrola = "ON";
            this.kontrolaColor = "#5D9C59";
            this.pristup = "ON";
            this.pristupColor = "#5D9C59"
            return;
          }
          else {
            this.kontrola = "OFF";
            this.kontrolaColor = "#ED2B2A";
          }
            
        }
      )
    }
    else {
      let dialogRef = this.matDialog.open(DialogBoxComponent, {
        data: {
          question: "Da li ste sigurni da želite da DSO-u oduzmete kontrolu uredjaja:  " + this.device.imeUredjaja + "?",
          answer: ""
        }
      });

      dialogRef.afterClosed().subscribe(
        result => {
          if (result.answer == "Yes") {
            this.deviceService.giveTakeControl(this.device.linkerId).subscribe(
              res => console.log('HTTP response', res),
              error => console.log("contol changed")
            );
            this.kontrola = "OFF";
            this.kontrolaColor = "#ED2B2A";
            return;
          }
          else {
            this.kontrola = "ON";
            this.kontrolaColor = "#5D9C59";
          }
        }
      )
    }
  }

  danas: string = "#D4A708";
  proslaNedelja: string = "white";
  tekuciMesec: string = "white";
  click(time: string) {
    if (time == 'Danas') {
      if (this.whatItIs == "Proizvođač") {
        this.getDailySumProduction();
        this.getTodayGraphProduction();
      }
      else {
        this.getDailySum();
        this.getTodayGraph();
      }
      this.danas = "#D4A708";
      this.proslaNedelja = "white";
      this.tekuciMesec = "white";
    }
    else if(time == 'Prosla nedelja') {
      if (this.whatItIs == "Proizvođač") {
        this.getWeeklySumProduction();
        this.getWeekGraphProduction();
      }
      else {
        this.getWeeklySum();
        this.getWeekGraph();
      }
      this.danas = "white";
      this.proslaNedelja = "#D4A708";
      this.tekuciMesec = "white";
    }
    else {
      if (this.whatItIs == "Proizvođač") {
        this.getMonthlySumProduction();
        this.getMonthGraphProduction();
      }
      else {
        this.getMonthlySum();
        this.getMonthGraph();
      }
      this.danas = "white";
      this.proslaNedelja = "white";
      this.tekuciMesec = "#D4A708";
    }
  }

  deleteDevice() {
    this.deviceService.deleteDevice(this.device.linkerId).subscribe(
      response => console.log(response),
      error => console.log("device deleted")
    )

    this.goBack();
  }

}
