import { Component, Input } from '@angular/core';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import { DataAnalysis } from 'src/app/Pages/Prosumer/analysis-prosumer/analysis-prosumer.component';

@Component({
  selector: 'app-bar-chart-analysis',
  templateUrl: './bar-chart-analysis.component.html',
  styleUrls: ['./bar-chart-analysis.component.css']
})
export class BarChartAnalysisComponent {
  mybarChart = '' as any;
  consumption_triangle = '' as string;
  produce_triange = '' as string;
  
  consumption_triangle_value = 0 as number;
  produce_triange_value = 0 as number;

  @Input() info={} as DataAnalysis;

  ngOnInit(): void {
    this.generateBarChart(this.info);  
  }
  
  generateBarChart(model: any){
    if (this.mybarChart != '') {
      this.mybarChart.destroy();
    }

    Chart.register(...registerables); 
    var labels = model.labels
    var potrosnja = model.data
    var proizvodnja = model.prediction

    var barChartOptions : ChartConfiguration = {
      type:'bar',
      data:{
        labels: labels,
        datasets:[{
          label:"Potrošnja",
          data:potrosnja,
          backgroundColor: [
            'rgba(255, 99, 132, 1)'],
            borderRadius: 10,
            borderWidth:1,
            borderColor:'black'
          },
        {
          label:"Predikcija",
          data:proizvodnja,
          backgroundColor: [
            'rgba(108, 122, 137, 1)'],
          borderRadius: 0,
          borderWidth:1,
          borderColor:'black'
        }
      ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins:{
          tooltip:{
            callbacks:{
              label:(context)=>{
                const value = context.dataset.data[context.dataIndex];
                return `${value} kWh`;
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Jedinica energije [kWh]'
            }
          },
          x: {
            title: {
              display: true,
              text: model.time
            },
          }
        }
      }
    }

    this.mybarChart = new Chart ('my-bar-chart',barChartOptions);

  }

  generateBarChartProduction(model: any){
    if (this.mybarChart != '') {
      this.mybarChart.destroy();
    }

    Chart.register(...registerables); 
    var labels = model.labels
    var potrosnja = model.data
    var proizvodnja = model.prediction

    var barChartOptions : ChartConfiguration = {
      type:'bar',
      data:{
        labels: labels,
        datasets:[{
          label:"Proizvodnja",
          data:potrosnja,
          backgroundColor: [
            'rgba(37, 192, 10, 1)',],
            borderRadius: 5,
            borderWidth:1,
            borderColor:'black'
          },
        {
          label:"Predikcija",
          data:proizvodnja,
          backgroundColor: [
            'rgba(108, 122, 137, 1)'],
          borderRadius: 0,
          borderWidth:2,
          borderColor:'black'
        }
      ]
      },
      options: {
        plugins:{
          tooltip:{
            mode:'index',
            intersect: false,
            callbacks: {
              label: (context) => {
                const value = context.dataset.data[context.dataIndex];
                return `${value} kWh`;
              }
            }
          },
          legend:{
            display:true
          }
        },
        responsive:true,
        maintainAspectRatio:false,
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Jedinica energije [kWh]'
            }
          },
          x: {
            title: {
              display: true,
              text: model.time
            },
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
