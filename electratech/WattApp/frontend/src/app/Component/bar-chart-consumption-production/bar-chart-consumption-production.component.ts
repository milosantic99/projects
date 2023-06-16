import { Component, OnInit, Input } from '@angular/core';
import { Chart, ChartConfiguration, registerables} from 'chart.js';
import { DsoChartsService } from 'src/app/Services/API/DSO-API/DSO_Charts/dso-charts.service';

@Component({
  selector: 'app-bar-chart-consumption-production',
  templateUrl: './bar-chart-consumption-production.component.html',
  styleUrls: ['./bar-chart-consumption-production.component.css']
})
export class BarChartConsumptionProductionComponent implements OnInit {

  mybarChart:any;
  consumption_triangle = '' as string;
  produce_triange = '' as string;

  isLoading = true;

  @Input() prosumerId!:string;

  consumption_triangle_value = 0 as number;
  produce_triange_value = 0 as number;

  constructor(private dsoService:DsoChartsService){
    var date = new Date();
    var mesec = date.getMonth();
    var godina = date.getFullYear();
    switch(mesec){
      case 0:
        this.labels = [`Januar ${godina}`,`Januar ${godina-1}`]
        break;
      case 1:
        this.labels = [`Februar ${godina}`,`Februar ${godina-1}`]
        break;
      case 2:
        this.labels = [`Mart ${godina}`,`Mart ${godina-1}`]
        break;
      case 3:
        this.labels = [`April ${godina}`,`April ${godina-1}`]
        break;
      case 4:
        this.labels = [`Maj ${godina}`,`Maj ${godina-1}`]
        break;
      case 5:
        this.labels = [`Jun ${godina}`,`Jun ${godina-1}`]
        break;
      case 6:
        this.labels = [`Jul ${godina}`,`Jul ${godina-1}`]
        break;
      case 7:
        this.labels = [`Avgust ${godina}`,`Avgust ${godina-1}`]
        break;
      case 8:
        this.labels = [`Septembar ${godina}`,`Septembar ${godina-1}`]
        break;
      case 9:
        this.labels = [`Oktobar ${godina}`,`Oktobar ${godina-1}`]
        break;
      case 10:
        this.labels = [`Novembar ${godina}`,`Novembar ${godina-1}`]
        break;
      case 11:
        this.labels = [`Decembar ${godina}`,`Decembar ${godina-1}`]
        break;
    }
  }
  
  labels = ['April 2022.','April 2023.'];
  potrosnja = new Array();
  proizvodnja = new Array();

  callGetProsumerConsumptionForBarChart(){
    this.dsoService.getProsumerConsumptionForBarChart(this.prosumerId).subscribe(
      response=>{
        this.potrosnja = [response[1].prosumption,response[3].prosumption];
        this.proizvodnja = [response[0].prosumption,response[2].prosumption];
        this.isLoading = false;
        this.generateBarChart();
      },
      err=>{
        console.log(err);
      },
      () => {}
    )
  }

  ngOnInit(): void {
    // this.generateBarChart(); 
    this.callGetProsumerConsumptionForBarChart(); 
  }

  setClasses(potrosnja:any,proizvodnja:any){
    this.consumption_triangle_value = potrosnja[1] - potrosnja[0];
    if(potrosnja[0] > potrosnja[1])
      this.consumption_triangle = 'bad';
    else
      this.consumption_triangle = 'good';
    this.produce_triange_value = proizvodnja[1] - proizvodnja[0];
    if(proizvodnja[0] > proizvodnja[1])
      this.produce_triange = 'good';
    else
      this.produce_triange = 'bad';
  }

  generateBarChart(){
    Chart.register(...registerables);  
    this.setClasses(this.potrosnja,this.proizvodnja);

    var barChartOptions : ChartConfiguration = {
      type:'bar',
      data:{
        labels: this.labels,
        datasets:[{
          label:"Potrošeno",
          data:this.potrosnja,
          backgroundColor: [
            'rgba(255, 99, 132, 0.8)'],
            borderRadius: 10,
            borderWidth:2,
            borderColor:'black'
          },
        {
          label:"Proizvedeno",
          data:this.proizvodnja,
          backgroundColor: [
            'rgba(37, 192, 10, 0.8)'],
          borderRadius: 10,
          borderWidth:2,
          borderColor:'black'
        }
      ]
      },
      options: {
        plugins:{
          legend:{
                display:true
              },
          tooltip:{
            mode:'index',
            intersect: false,
            callbacks:{
              label:(context)=>{
                const value = context.dataset.data[context.dataIndex];
                return `${value} kWh`;
              }
            }
          }
        },
        responsive:true,
        scales: {
          x:{
            title: {
              display: true,
              text: 'Godine',
              font: {
                size: 18,
              }
            }
          },
          y: {
            title: {
              display: true,
              text: 'Potrošnja i proizvodnja [kWh]',
              font: {
                size: 16,
              }
            },
            beginAtZero: true,
            ticks:{
              callback: function(value,index,ticks){
                var num : number =+value;
                if(num%100 == 0)
                  return value+" KWh ";
                return null;
              }
            }
          }
        }
      }
    }

    this.mybarChart = new Chart ('my-bar-chart',barChartOptions);

  }
  onResized(){
    this.mybarChart.resize();
  }
}
