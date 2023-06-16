import { Component, ViewChild } from '@angular/core';
import { SimpleCardModel } from 'src/app/Models/SimpleCardModel';
import { MyDeviceInterface } from '../my-devices/my-devices.component';
import { prosumerPageInformation } from 'src/app/Models/prosumerTableInfo';
import { HomeProsumerService } from 'src/app/Services/API/Prosumer-API/Home/home-prosumer.service';
import { AnalysisService } from 'src/app/Services/API/Prosumer-API/Analysis/analysis.service';
import { LineGraphHomeProsumerComponent } from 'src/app/Component/line-graph-home-prosumer/line-graph-home-prosumer/line-graph-home-prosumer.component';
import { OneData } from '../analysis-prosumer/analysis-prosumer.component';
import { Router } from '@angular/router';
import { ImageBase64Service } from 'src/app/Services/ImageBase64/image-base64.service';

export interface LineGraphHomeProsumerPage {
  labels:string[];
  thisWeek:number[];
  lastWeek:number[];
}

@Component({
  selector: 'app-home-prosumer',
  templateUrl: './home-prosumer.component.html',
  styleUrls: ['./home-prosumer.component.css']
})
export class HomeProsumerComponent{
  @ViewChild("graph") graph!: LineGraphHomeProsumerComponent;
  debt = 0;

  graphInfo!: LineGraphHomeProsumerPage;
  pomGraph!: OneData[];

  menuType:string;
  constructor(private prosumerService: HomeProsumerService, private analysisService: AnalysisService, private router: Router,private image: ImageBase64Service){
    if(window.innerWidth <= 480)
      this.menuType = "bottom";
    else
      this.menuType = "left";
  }  

  ngOnInit() {
    this.getProsumer();
    this.getSums();
  }
  profilePicture!:any;
  prosumerInformation = {} as prosumerPageInformation;
  getProsumer(){
    var prosumerInfo = sessionStorage.getItem('prosumerInfo');
    if(prosumerInfo == null)
    {
      this.prosumerService.getProsumer().subscribe(
        response=>{
          this.prosumerInformation = response;
          this.debt = this.prosumerInformation.debit;
          this.profilePicture = this.image.getPicture(this.prosumerInformation.image);
          sessionStorage.setItem('prosumerInfo',JSON.stringify(response)); 
          this.getTopThree();
          this.getDataForGraph();
        }
      )
    }
    else
    {
      var response = JSON.parse(prosumerInfo);
      this.prosumerInformation = response
      this.debt = response.debit;
      this.profilePicture = this.image.getPicture(response.image);
      this.getTopThree();
      this.getDataForGraph();
    }
    
    
  }

  listOfTopThreeDevices: MyDeviceInterface[] = [];
  getTopThree() {
    this.prosumerService.getTopThree().subscribe(
      response => {
        this.listOfTopThreeDevices = response;
      },
      error => console.error("GRESKA")
    )
  }

  getSums() {
    this.simpleCard2 = {
      title:"Potrošnja",
      subtitle:"U proteklih mesec dana",
      value:"",
      arrow:"rotate-45"
    }
    this.simpleCard1 = {
      title:"Proizvodnja",
      subtitle:"U proteklih mesec dana",
      value:"",
      arrow:"rotate--45"
    }
    this.analysisService.getConsumptionAndProductionInCurrentMonthForProsumer().subscribe(
      response => {
        var res = response;
        if(res.length > 0)
        {
          this.simpleCard2.value = res[0].consumption + " kWh";
          this.simpleCard1.value = res[0].production + " kWh";
        }
      },
      error => {
        console.log("GRESKA")
      }
    )
  }

  first: boolean = false;
  second: boolean = false;
  isLoadingGraph = true;
  getDataForGraph() {
    var list = ["Ponedeljak", "Utorak", "Sreda", "Četvrtak", "Petak", "Subota", "Nedelja"];
    this.isLoadingGraph = true;
    this.graphInfo = {
      labels: list,
      thisWeek: [],
      lastWeek: []
    }
    this.prosumerService.getConsumptionForThisWeekForProsumer().subscribe(
      response => {
        this.pomGraph = response as OneData[];
        for (let i = 0; i < this.pomGraph.length; i++)
          this.graphInfo.thisWeek[i] = this.pomGraph[i].consumption;

        this.first = true;
        if (this.second == true) {
          this.isLoadingGraph = false;
          this.graph.drawGraph(this.graphInfo);
      }
        
      },
      error => console.error("GRESKA")
    )

    this.prosumerService.getConsumptionForPastWeekForProsumer().subscribe(
      response => {
        this.pomGraph = response as OneData[];
        for (let i = 0; i < this.pomGraph.length; i++)
          this.graphInfo.lastWeek[i] = this.pomGraph[i].consumption;

        this.second = true;
        if (this.first == true) {
          this.isLoadingGraph = false;
          this.graph.drawGraph(this.graphInfo);
        }

      },
      error => console.error("GRESKA")
    )

  }

  simpleCard1!:SimpleCardModel
  simpleCard2!:SimpleCardModel
  information = [this.simpleCard1,this.simpleCard2];
}
