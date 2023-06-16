import { Component, OnInit, Input} from '@angular/core';
import { Chart, ChartConfiguration, registerables} from 'chart.js';
import { DsoChartsService, ProsumerPageDsoBarChart } from 'src/app/Services/API/DSO-API/DSO_Charts/dso-charts.service';

@Component({
  selector: 'app-line-graph-three-in-one',
  templateUrl: './line-graph-three-in-one.component.html',
  styleUrls: ['./line-graph-three-in-one.component.css']
})
export class LineGraphThreeInOneComponent implements OnInit {

  // @Input() type='month' as string;
  @Input() prosumerId = '';
  myLineChart = '' as any;  
  barChart!:ProsumerPageDsoBarChart[];
  isLoading = true;

  constructor(private dsoService:DsoChartsService){}

  ngOnInit() {
    if(this.myLineChart == '')
      this.generateMonthChart();
    else{
      this.myLineChart.destroy();
    }
    this.generateMonthChart();

    this.metod('month');

  }  

  onResized(): void {
    this.myLineChart.resize();
  }

  line_data_month = new Array();
  line_data_month_2 = new Array();
  line_labels_month = new Array();

  line_data_prediciton = new Array();
  line_data_prediciton_2 = new Array();
  line_labels_prediction = new Array();

  metod(type:string){
    try{
      this.myLineChart.destroy();
    }
    catch(e){}

    if(type == 'month'){
      if(this.line_data_month.length!=0){
        this.generateMonthChart();
      }
      else{
        this.dsoService.getProsumerConsupmtionForThisMonth(this.prosumerId).subscribe(
          response=>{
            response.forEach(element => {
              if(element.consumption > 0)
                this.line_data_month_2.push(element.consumption);
              this.line_data_month.push(element.predictedConsumption);
              var splited = element.date.split('T')[0];
              this.line_labels_month.push(splited);
            });
            this.isLoading = false;
            this.generateMonthChart();
          }
        );
        this.dsoService.getProsumerProductionForThisMonth(this.prosumerId).subscribe(
          response=>{
            response.forEach(element => {
              if(element.production > 0 )
                this.line_data_prediciton_2.push(element.production);
              var splited = element.date.split('T')[0];
              this.line_data_prediciton.push(element.predictedProduction);
              this.line_labels_prediction.push(splited);
            });
            this.isLoading = false;
            this.generatePredictionChart();
          }
        );
      }
    }
    else if (type=='prediction'){
        if(this.line_data_prediciton.length!=0){
          this.generatePredictionChart();
        }
        else{
          this.dsoService.getProsumerProductionForThisMonth(this.prosumerId).subscribe(
            response=>{
              response.forEach(element => {
                if(element.production > 0 )
                  this.line_data_prediciton_2.push(element.production);
                var splited = element.date.split('T')[0];
                this.line_data_prediciton.push(element.predictedProduction);
                this.line_labels_prediction.push(splited);
              });
              this.isLoading = false;
              this.generatePredictionChart();
            }
          )
        }
    }
  }
  
  
  generateMonthChart(){
    if(this.myLineChart != '')
      this.myLineChart.destroy();
    Chart.register(...registerables);    
    var lineChartOptions: ChartConfiguration = {
      type: 'line',
      data: {
        labels: this.line_labels_month,
        datasets: [{
          label: 'Predikcija',
          data: this.line_data_month,
          fill: false,
          borderColor: 'rgba(108, 122, 137, 1)',
          tension: 0.2,
          borderWidth: 2,
          borderDash:[5,6]
        },
        {
          label: 'Potrošnja',
          data: this.line_data_month_2,
          fill: false,
          borderColor: 'rgba(255, 99, 132, 1)',
          tension: 0.2,
          borderWidth: 2,
        }
      ]
      },
      options: {
        plugins:{
          legend:{
            labels:{
              boxHeight: 0,
              font:{
                size:15.5
              }
            }
          },
          tooltip:{
            mode:'index',
            intersect: false,
            callbacks:{
              label:(context)=>{
                const value = context.dataset.data[context.dataIndex];
                return `${value} Wh`;
              }
            }
          }
        },
        responsive:true,
        maintainAspectRatio:true,
        scales: {
          y: {
            title: {
              display: true,
              text: 'Ukupna potrošnja [W]',
              font: {
                size: 18,
              }
            },
            beginAtZero: true,
            ticks:{
              callback: function(value,index,ticks){
                return value+"";
              }
            }
          },
          x:{
            title:{
              display: true,
              text: 'Datumi',
              font: {
                size: 18,
              }
            }
          }
        }
      }
    }
    this.myLineChart = new Chart("my-line-chart", lineChartOptions);
  }

  generatePredictionChart(){
    Chart.register(...registerables);    
    
   

    var lineChartOptions: ChartConfiguration = {
      type: 'line',
      data: {
        labels: this.line_labels_prediction,
        datasets: [{
          label: 'Predikcija',
          data: this.line_data_prediciton,
          fill: false,
          borderColor: 'rgba(108, 122, 137, 1)',
          tension: 0.2,
          borderWidth: 2,
          borderDash:[5,6]
        },
        {
          label: 'Proizvodnja',
          data: this.line_data_prediciton_2,
          fill: false,
          borderColor: 'rgba(37, 192, 10, 1)',
          tension: 0.2,
          borderWidth: 2
        }
      ]
      },
      options: {
        plugins:{
          legend:{
            labels:{
              boxHeight: 0,
              font:{
                size:15.5
              }
            }
          },
          tooltip:{
            mode:'index',
            intersect: false,
            callbacks:{
              label:(context)=>{
                const value = context.dataset.data[context.dataIndex];
                return `${value} Wh`;
              }
            }
          }
        },
        responsive:true,
        maintainAspectRatio:true,
        scales: {
          y: {
            title: {
              display: true,
              text: 'Ukupna proizvodnja [Wh]',
              font: {
                size: 18,
              }
            },
            beginAtZero: true,
            ticks:{
              callback: function(value){
                return value+"";
              }
            }
          }
        }
      }
    }
    this.myLineChart = new Chart("my-line-chart", lineChartOptions);
  }

}

