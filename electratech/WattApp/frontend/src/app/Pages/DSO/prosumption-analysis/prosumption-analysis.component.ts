import { Component } from '@angular/core';
import Chart, { ChartConfiguration } from 'chart.js/auto';
import { AllProsumersService, EnergyData } from 'src/app/Services/API/all-prosumers.service';
import { faArrowLeft, faArrowRight, faL } from "@fortawesome/free-solid-svg-icons";
import { SimpleCardModel } from 'src/app/Models/SimpleCardModel';
import { DsoChartsService } from 'src/app/Services/API/DSO-API/DSO_Charts/dso-charts.service';

@Component({
  selector: 'app-prosumption-analysis',
  templateUrl: './prosumption-analysis.component.html',
  styleUrls: ['./prosumption-analysis.component.css']
})
export class ProsumptionAnalysisComponent {
  
  lineChart: Chart | undefined;
  barChart: Chart | undefined;
  barChart2: Chart | undefined;
  dataSource = new Array();
  constructor(private allProsumersService: AllProsumersService, private dsoService:DsoChartsService) {
  }
  daysOfYear: string[] = [];
  consumptionData: number[] = [];
  productionData: number[] = [];

  displayedColumns: string[] = ['mesec', 'proizvodnja', 'potrosnja', 'razlika'];
  // dataSource = ELEMENT_DATA;

  tabs = ['Potrošnja', 'Proizvodnja'];
  selected: number = 0;
  arrowLeftIco = faArrowLeft;
  arrowRightIco = faArrowRight;

  selectedButton = 'left';

  setSelectedButton(value: string,num:number) {
    if (num >= 0 && num < this.tabs.length) 
      this.selected = num;
    this.selectedButton = value;
  }
  
  simpleCard1 = {
    title: 'Proizvedeno',
    subtitle:'U prethodnih nedelju dana',
    value:'',
    arrow:'rotate--45'  //HARDCORE
  } as SimpleCardModel;

  simpleCard2 = {
    title: 'Potrošeno',
    subtitle:'U prethodnih nedelju dana',
    value:'',
    arrow:'rotate--45'  //HARDCORE
  } as SimpleCardModel;

  simpleCard3 = {
    title: 'Očekivana potrošnja',
    subtitle:'Za narednu nedelju',
    value:'',
    arrow:'rotate--45'  //HARDCORE
  } as SimpleCardModel;

  simpleCard4 = {
    title: 'Očekivana proizvodnja',
    subtitle:'U domoćinstvima za ovu nedelju',
    value:'',
    arrow:'rotate-45'  //HARDCORE
  } as SimpleCardModel;

  lineChartConfig: ChartConfiguration = {
    type: 'line',
    data: {
      labels: this.daysOfYear,
      datasets: [
        {
          label: "Potrošnja",
          borderColor: "rgba(255, 99, 132, 1)",
          tension: 0.2,
          borderWidth: 2,
          data: []
        },
        {
          label: "Proizvodnja",
          borderColor: "rgba(37, 192, 10, 1)",
          tension: 0.2,
          borderWidth: 2,
          data: []
        },
        {
          label: "Predikcija potrošnje",
          borderColor: "rgba(255, 99, 132, 1)",
          tension: 0.2,
          borderWidth: 2,
          borderDash:[5,6],
          data: []
        },
        {
          label: "Predikcija proizvodnje",
          borderColor: "rgba(37, 192, 10, 1)",
          tension: 0.2,
          borderWidth: 2,
          borderDash:[5,6],
          data: []
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins:{
        legend:{
          labels:{
            boxHeight: 0
          }
        },
        tooltip: {
          mode:'index',
          intersect: false,
          callbacks: {
            label: function(context) {
              let label = context.dataset.label;
              const value = context.dataset.data[context.dataIndex];

              if ((context.datasetIndex == 2 || context.datasetIndex == 3) 
                  && context.dataIndex - 1 > 0 
                  && context.dataset.data[context.dataIndex-1] == null) return "";

              if (label) {
                label += ': ';
              }
              if (context.parsed.y !== null) {
                  label += value + " kWh";
              }
              return label;
            }
          }
        }
      },
      scales: {
        x:{
          offset:false,
          title: {
            display: true,
            text: 'Vremenski period',
            font: {
              size: 18,
            }
          }
        },
        y: {
          title: {
            display: true,
            text: 'Potrošeno/Proizvedeno [kWh]',
            font: {
              size: 18,
            }
          }
        }
      }
    }
  }

  potrosnja1 = new Array();
  prediktovanaPotrosnja1 = new Array();
  labela1 = new Array();

  barChartConfig: ChartConfiguration = {
    type: 'bar',
    data: {
      labels: this.labela1,
      datasets: [
        {
          label: "Realizacija",
          barPercentage: 0.3,
          backgroundColor: " rgba(255, 99, 132, 1)",
          data: this.potrosnja1,
          barThickness: 35
        },
        {
          label: "Predikcija",
          barPercentage: 0.3,
          backgroundColor: " rgba(108, 122, 137, 1)",
          data: this.prediktovanaPotrosnja1,
          barThickness: 35,
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins:{
        tooltip:{
          callbacks:{
            label: function(context) {
              let label = context.dataset.label;
              const value = context.dataset.data[context.dataIndex];

              if (label) {
                label += ': ';
              }
              if (context.parsed.y !== null) {
                  label += value + " kWh";
              }
              return label;
            }
          }
        }
      },
      scales: {
        x:{
          title: {
            display: true,
            text: 'Vremenski period',
            font: {
              size: 18,
            }
          }
        },
        y: {
          title: {
            display: true,
            text: 'Potrošeno [kWh]',
            font: {
              size: 18,
            }
          }
        }
      }
    }
  }

  proizvodnja1 = new Array();
  prediktovanaProizvodnja1 = new Array();
  labela2 = new Array();

  barChartConfig2: ChartConfiguration = {
    type: 'bar',
    data: {
      labels: this.labela2,
      datasets: [
        {
          label: "Realizacija",
          barPercentage: 0.3,
          backgroundColor: " rgba(37, 192, 10, 1)",
          data: this.proizvodnja1,
          barThickness: 35
        },
        {
          label: "Predikcija",
          barPercentage: 0.3,
          backgroundColor: "rgba(108, 122, 137, 1)",
          data: this.prediktovanaProizvodnja1,
          barThickness: 35
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins:{
        tooltip:{
          callbacks:{
            label: function(context) {
              let label = context.dataset.label;
              const value = context.dataset.data[context.dataIndex];

              if (label) {
                label += ': ';
              }
              if (context.parsed.y !== null) {
                  label += value + " kWh";
              }
              return label;
            }
          }
        }
      },
      scales: {
        x:{
          title: {
            display: true,
            text: 'Vremenski period',
            font: {
              size: 18,
            }
          }
        },
        y: {
          title: {
            display: true,
            text: 'Proizvedeno [kWh]',
            font: {
              size: 18,
            }
          }
        }
      },
    }
  }

  

  ngOnInit(){
    this.writeTable();
    this.getSimpleCards();


    this.lineChart = new Chart("my-line-chart-analysis", this.lineChartConfig);
  }

  isLoading = true;

  isLoadingTable = true;
  writeTable(){
    this.dsoService.getTabela().subscribe(
      response=>{
        this.dataSource = response;
        this.isLoadingTable = false;
        for(let i=response.length-4;i<response.length;i++){
          let element = response[i];
          this.potrosnja1.push(element.consumption);
          this.prediktovanaPotrosnja1.push(element.predictedConsumption);
          this.labela1.push(element.month);
          
          this.proizvodnja1.push(element.production);
          this.prediktovanaProizvodnja1.push(element.predictedProduction);
          this.labela2.push(element.month);
          
        }
        this.barChart = new Chart("bar-chart", this.barChartConfig);
        this.barChart2 = new Chart("bar-chart2", this.barChartConfig2);
        this.isLoading = false;
      }
    )
  }

  getSimpleCards(){
    var info = sessionStorage.getItem('AllInOne');
    if(info == null)
    {
      this.dsoService.getAllInOneSimpleCard().subscribe(
        response=>{
          this.simpleCard1.value = response[3].sum+" kWh";
          this.simpleCard2.value = response[2].sum+" kWh";
          this.simpleCard3.value = response[0].sum+" kWh";
          this.simpleCard4.value = response[1].sum+" kWh";

          var list = [this.simpleCard1,this.simpleCard2,this.simpleCard3,this.simpleCard4];
          sessionStorage.setItem('AllInOne',JSON.stringify(list));
        }
      )
    }
    else{
      info = JSON.parse(info);
      if(typeof info === 'object' && info !==null ){
        this.simpleCard1 = info[0];
        this.simpleCard2 = info[1];
        this.simpleCard3 = info[2];
        this.simpleCard4 = info[3];
      }
    }
    
  }

  datesCompare(date1: Date, date2: Date): boolean{
    if (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
   ) {
      return true;
   } else {
      
      return false;
   }
  }
  
  makeDateRangeArray(start: Date, end: Date): string[]{
    let tmpDates: string[] = [];

    let startTS = Date.UTC(start.getFullYear(), start.getMonth(), start.getDate());

    let d = startTS;
    while (!this.datesCompare(new Date(d), end)){
      tmpDates.push(new Date(d).toLocaleDateString('sr-RS'));
      d += 86400000;
    }
    tmpDates.push(new Date(d).toLocaleDateString('sr-RS'));
    return tmpDates;
  }

  isLoadingLine = true;
  today: Date = new Date();
  changeChartDateRange(dateRange: {start: Date | null, end: Date | null} | null){
    var energyData: EnergyData[] = [];
    if (dateRange != null && dateRange.start != null && dateRange.end != null){
      
      this.daysOfYear = this.makeDateRangeArray(dateRange.start, dateRange.end);
      
      let date1 = dateRange.start.getFullYear() + "-" + String(dateRange.start.getMonth() + 1).padStart(2, "0") + "-" + String(dateRange.start.getDate()).padStart(2, "0");
      let date2 = dateRange.end.getFullYear() + "-" + String(dateRange.end.getMonth() + 1).padStart(2, "0") + "-" + String(dateRange.end.getDate()).padStart(2, "0");
      let dateToday = this.today.getFullYear() + "-" + String(this.today.getMonth() + 1).padStart(2, "0") + "-" + String(this.today.getDate()).padStart(2, "0");
      
      this.allProsumersService
        .overviewOfConsumptionAndProductionForDsoDateToDate(date1, date2)
        .subscribe({
          next: (data) => {            
            energyData = data;
            
            let consumptionData: (number | null)[] = [];
            let productionData: (number | null)[] = [];
            let consumptionDataP: (number | null)[] = [];
            let productionDataP: (number | null)[] = [];
            let a = false;
            if (dateRange.start! > this.today){
              a = true;
            }
            energyData.forEach((ed) => {
              
              if (ed.date.split('T')[0] == dateToday) {
                consumptionDataP.push(ed.consumpition);
                productionDataP.push((ed.production));
                a = true;
              }
              if ((a == false) || (a == true && ed.date.split('T')[0] == dateToday)) {
                consumptionData.push(ed.consumpition);
                productionData.push((ed.production));
                if (ed.date.split('T')[0] != dateToday){
                  consumptionDataP.push(null);
                  productionDataP.push(null);
                }
              }
              else if ((a == true && ed.date.split('T')[0] != dateToday)) {
                consumptionDataP.push(ed.predictedConsumpition);
                productionDataP.push((ed.predictedProduction));
                consumptionData.push(null);
                productionData.push(null);
              }
            });
            
            this.lineChartConfig.data.datasets[0].data = consumptionData;
            this.lineChartConfig.data.datasets[1].data = productionData;
            this.lineChartConfig.data.datasets[2].data = consumptionDataP;
            this.lineChartConfig.data.datasets[3].data = productionDataP;
            
            this.isLoadingLine = false;
            this.lineChart!.update();
          },
          error: (error) => {
            console.log(error.error);
          }
        })
    }
    if (this.daysOfYear.length == 1) this.lineChartConfig!.options!.scales = {
      x:{
        offset:true,
        title: {
          display: true,
          text: 'Vremenski period',
          font: {
            size: 18,
          }
        }
      },
      y: {
        title: {
          display: true,
          text: 'Potrošeno/Proizvedeno [kWh]',
          font: {
            size: 18,
          }
        }
      }
    };
    else this.lineChartConfig!.options!.scales =  {
      x:{
        offset:false,
        title: {
          display: true,
          text: 'Vremenski period',
          font: {
            size: 18,
          }
        }
      },
      y: {
        title: {
          display: true,
          text: 'Potrošeno/Proizvedeno [kWh]',
          font: {
            size: 18,
          }
        }
      }
    };
    this.lineChartConfig.data.labels = this.daysOfYear;
    if (this.lineChart != null)
    this.lineChart.update();
  }
}
