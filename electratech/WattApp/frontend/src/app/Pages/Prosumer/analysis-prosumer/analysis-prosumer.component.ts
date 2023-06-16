import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { faArrowLeft, faArrowRight, faL } from '@fortawesome/free-solid-svg-icons';
import { response } from 'express';
import { BarChartAnalysisComponent } from 'src/app/Component/bar-chart-analysis/bar-chart-analysis.component';
import { DialogBoxComponent } from 'src/app/Component/dialog-box/dialog-box.component';
import { LineGraphAnalysisComponent } from 'src/app/Component/line-graph-analysis/line-graph-analysis.component';
import { SnackBarComponent } from 'src/app/Component/snack-bar/snack-bar.component';
import { SimpleCardModel } from 'src/app/Models/SimpleCardModel';
import { AnalysisService } from 'src/app/Services/API/Prosumer-API/Analysis/analysis.service';
import { HomeProsumerService } from 'src/app/Services/API/Prosumer-API/Home/home-prosumer.service';
import { LoginService } from 'src/app/Services/API/Security/Login/login.service';

export interface DataAnalysis {
  labels: string[],
  data: number[],
  prediction: number[],
  time: string
}

export interface OneData {
  time: string;
  consumption: number;
}

export interface fromBack {
  date: string;
  consumption: number;
  predictedConsumption: number;
  production: number;
  predictedProduction: number;
}

export interface SumCardAnalysis {
  consumption: number;
  production: number;
}

@Component({
  selector: 'app-analysis-prosumer',
  templateUrl: './analysis-prosumer.component.html',
  styleUrls: ['./analysis-prosumer.component.css']
})
export class AnalysisProsumerComponent {
  @ViewChild("graph") graph!: LineGraphAnalysisComponent;
  menuType:string;
  faArrowLeft=faArrowLeft;
  faArrowRight=faArrowRight;

  dataToShow!: OneData[];

  todayGraph!: DataAnalysis;
  todayGraphProduction!: DataAnalysis;
  weekGraph!: DataAnalysis;
  weekGraphProduction!: DataAnalysis;
  monthGraph!: DataAnalysis;
  monthGraphProduction!: DataAnalysis;
  typeOfDevice:any;

  constructor(private analysisService: AnalysisService, private prosumerService:HomeProsumerService ,private snackBar: MatSnackBar, private checkRoleService: LoginService, private matDialog: MatDialog) {
    this.rola = checkRoleService.getRole();
    this.typeOfDevice = "Potrošač"; 
    if(window.innerWidth <= 480)
      this.menuType = "bottom";
    else
      this.menuType = "left";
  }
  dsoId: string = '00000000-0000-0000-0000-000000000000';
  isLoading2: boolean = true;
  rola!: string;
  ngOnInit() {
    if (this.rola != "ROLE_PROSUMER_DEMO") {
      this.dsoId = "";
      this.getTodayData();
      this.getWeekData();
      this.getMonthData();
      this.getSums();
    }
  }

  getNotification() {
    this.openSnackBar("Uspešno ste poslali zahtev", "Okej");
  }

  openSnackBar(message: string, panelClass: string) {
    this.snackBar.openFromComponent(SnackBarComponent, {
      data: message,
      panelClass: panelClass,
      duration: 2500
    });
  }

  sendRequest(){
    let dialogRef = this.matDialog.open(DialogBoxComponent, {
      data: {
        question: "Da li ste sigurni da želite da se priključite DSO-u?",
        answer: ""
      }
    });
  
    dialogRef.afterClosed().subscribe(
      result => {
        if (result.answer == "Yes") {
          this.analysisService.sendRequestDso().subscribe(
            response=>{},
            error=>{},
            ()=>{}
          )
          this.getNotification();
        }
      }
    )

  }

  isZeroOrEmpty(broj: any) {
    if (broj == 0 || broj == null)
      return 0;
    
    return broj;
  }

  isLoading: boolean = true;
  getTodayData() {
    this.todayGraph = {
      labels: [],
      data: [],
      prediction: [],
      time: "Vreme u časovima danas"
    }
    this.todayGraphProduction = {
      labels: [],
      data: [],
      prediction: [],
      time: "Vreme u časovima danas"
    }
    this.analysisService.getOverviewOfDailyConsumptionAndProductionWithPredictionForProsumer().subscribe(
      response => {
        var res = response as fromBack[];
        var hour = new Date().getHours();
        for (let i = 0; i < res.length; i++) {
          this.todayGraph.labels[i] = res[i].date;
          if (hour >= (Number)(res[i].date))
            this.todayGraph.data[i] = res[i].consumption;
          this.todayGraph.prediction[i] = res[i].predictedConsumption;
          this.todayGraphProduction.labels[i] = res[i].date;
          if (hour >= (Number)(res[i].date))
            this.todayGraphProduction.data[i] = res[i].production;
          this.todayGraphProduction.prediction[i] = res[i].predictedProduction;
        }

        this.isLoading = false;
        // console.log(this.todayGraph);
        this.graph.drawGraph(this.todayGraph);
      },
      error => console.error("GRESKA")
    )
  }

  getWeekData() {
    this.weekGraph = {
      labels: [],
      data: [],
      prediction: [],
      time: "Vreme u danima u nedelji"
    }
    this.weekGraphProduction = {
      labels: [],
      data: [],
      prediction: [],
      time: "Vreme u danima u nedelji"
    }
    this.analysisService.getOverviewOfWeeklyConsumptionAndProductionWithPredictionForProsumer().subscribe(
      response => {
        var res = response as fromBack[];
        for (let i = 0; i < res.length; i++) {
          this.weekGraph.labels[i] = res[i].date;
          this.weekGraph.data[i] = res[i].consumption;
          this.weekGraph.prediction[i] = res[i].predictedConsumption;
          this.weekGraphProduction.labels[i] = res[i].date;
          this.weekGraphProduction.data[i] = res[i].production;
          this.weekGraphProduction.prediction[i] = res[i].predictedProduction;
        }
        
      },
      error => console.error("GRESKA")
    )
  }

  getMonthData() {
    this.monthGraph = {
      labels: [],
      data: [],
      prediction: [],
      time: "Vreme mesecima"
    }
    this.monthGraphProduction = {
      labels: [],
      data: [],
      prediction: [],
      time: "Vreme mesecima"
    }
    this.analysisService.getOverviewOfMonthlyConsumptionAndProductionWithPredictionForProsumer().subscribe(
      response => {
        var res = response as fromBack[];
        for (let i = 0; i < res.length; i++) {
          this.monthGraph.labels[i] = res[i].date;
          this.monthGraph.data[i] = res[i].consumption;
          this.monthGraph.prediction[i] = res[i].predictedConsumption;
          this.monthGraphProduction.labels[i] = res[i].date;
          this.monthGraphProduction.data[i] = res[i].production;
          this.monthGraphProduction.prediction[i] = res[i].predictedProduction;
        }
        
        // this.graph.drawGraph(this.todayGraph);
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
        var res = response as SumCardAnalysis[];
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

  whatItIs: string = "potrošnje";
  type: boolean = false; // potrosnja
  setType(type:String) {
    if (type == "Proizvodjač") {
      // prebaci na proizvodnju
      this.typeOfDevice = "Proizvodjač";
      this.type = true;
      this.whatItIs = "proizvodnje";
      if (this.isToday())
        this.graph.drawGraphProduction(this.todayGraphProduction);
      if (this.isMonth())
        this.graph.generateBarChartProduction(this.monthGraphProduction);
      if (this.isWeek())
        this.graph.drawGraphProduction(this.weekGraphProduction);
      return;
    }
    if (type == "Potrošač") {
      // prebaci na potrosnju
      this.typeOfDevice = "Potrošač";
      this.type = false
      this.whatItIs = "potrošnje";
      if (this.isToday())
        this.graph.drawGraph(this.todayGraph);
      if (this.isMonth())
        this.graph.generateBarChart(this.monthGraph);
      if (this.isWeek())
        this.graph.drawGraph(this.weekGraph);
      return;
    }
  }

  typeProduction() {
    if (this.type == true)
      return true;
    return false
  }

  typeConsumption() {
    if (this.type == false)
      return true;
    return false;
  }

  whichGraph: string = "today";
  left() {
    if (this.whichGraph == "week") {
      this.whichGraph = "today";
      if (this.type == false)
        this.graph.drawGraph(this.todayGraph);
      else
        this.graph.drawGraphProduction(this.todayGraphProduction);
      return;
    }

    if (this.whichGraph == "month") {
      this.whichGraph = "week";
      if (this.type == false)
        this.graph.drawGraph(this.weekGraph);
      else
        this.graph.drawGraphProduction(this.weekGraphProduction);
      return;
    }
      
  }

  right() {
    if (this.whichGraph == "today") {
      this.whichGraph = "week";
      if (this.type == false)
        this.graph.drawGraph(this.weekGraph);
      else
        this.graph.drawGraphProduction(this.weekGraphProduction);
      return;
    }
      
    if (this.whichGraph == "week") {
      this.whichGraph = "month";
      if (this.type == false)
        this.graph.generateBarChart(this.monthGraph);
      else
        this.graph.generateBarChartProduction(this.monthGraphProduction);
      return;
    }
      
  }

  tabs = ['today', 'week','month'];
  selected: number = 0;
  arrowLeftIco = faArrowLeft;
  arrowRightIco = faArrowRight;

  selectedButton = 'left';
  unselectedButton = 'right';

  setSelectedButton(value1: string, value2: string, num: number) {
    if (num >= 0 && num < 3) {
      this.selected = num;
    }
    if (num == 0) {
      this.selectedButton = value1;
      this.unselectedButton = value2;
    } 
    else if (num == 2) {
      this.selectedButton = value2;
      this.unselectedButton = value1;
    } 
    else if (num == 1) {
      this.selectedButton = value1 + ' ' + value2;
      this.unselectedButton = value2 + ' ' + value1;
    }
  }
  
  isToday() {
    if (this.whichGraph == "today")
      return true;
    return false;
  }

  isWeek() {
    if (this.whichGraph == "week")
      return true;
    return false;
  }

  isMonth() {
    if (this.whichGraph == "month")
      return true;
    return false;
  }

  simpleCard1: SimpleCardModel = {
    title:"Proizvodnja",
    subtitle:"U proteklih mesec dana",
    value:"",
    arrow:"rotate-45"
  }

  simpleCard2: SimpleCardModel = {
    title:"Potrošnja",
    subtitle:"U proteklih mesec dana",
    value:"",
    arrow:"rotate--45"
  }

}
