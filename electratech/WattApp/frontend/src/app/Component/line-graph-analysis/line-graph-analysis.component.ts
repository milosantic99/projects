import { Component, Input } from '@angular/core';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import { DataAnalysis } from 'src/app/Pages/Prosumer/analysis-prosumer/analysis-prosumer.component';

@Component({
  selector: 'app-line-graph-analysis',
  templateUrl: './line-graph-analysis.component.html',
  styleUrls: ['./line-graph-analysis.component.css']
})
export class LineGraphAnalysisComponent {
  myLineChartFirstPage = '' as any;
  mybarChart = '' as any;

  @Input() info={} as DataAnalysis;

  // ngOnInit() {
  //   this.drawGraph(this.info);
  // } 

  drawGraph(model: any) {
    if (this.myLineChartFirstPage != '') {
      this.myLineChartFirstPage.destroy();
    }

    Chart.register(...registerables);    
    
    var data_production = model.data;
    var data_consumption = model.prediction;
    var line_labels = model.labels;

    var lineChartOptions: ChartConfiguration = {
      type: 'line',
      data: {
        labels: line_labels,
        datasets: [{
          label: 'Potrošnja',
          data: data_production,
          fill: false,
          borderColor: 'rgba(255, 99, 132, 1)',
          tension: 0.2,
          borderWidth: 2,
        },
        {
          label: 'Predikcija',
          data: data_consumption,
          fill: false,
          borderColor: 'rgba(108, 122, 137, 1)',
          tension: 0.2,
          borderWidth: 2,
          borderDash:[5,5]
        }
      ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins:{
          tooltip:{
            mode:'index',
            intersect: false,
            callbacks: {
              label: (context) => {
                const value = context.dataset.data[context.dataIndex];
                return `${value} W`;
              }
            }
          },
          legend:{
            labels:{
              usePointStyle: true,
              pointStyle: 'line',
              font:{
                size:15.5
              }
            }
          },
        },
        scales: {
          y: {
            title: {
              display: true,
              text: 'Jedinica energije [W]',
              color:"black"
            },
          },
          x: {
            title: {
              display: true,
              text: model.time,
              color:"black"
            },
          }
        }
      }
    }

    this.myLineChartFirstPage = new Chart("newIdAnalysis", lineChartOptions);
  }

  drawGraphProduction(model: any) {
    if (this.myLineChartFirstPage != '') {
      this.myLineChartFirstPage.destroy();
    }

    Chart.register(...registerables);    
    
    var data_production = model.data;
    var data_consumption = model.prediction;
    var line_labels = model.labels;

    var lineChartOptions: ChartConfiguration = {
      type: 'line',
      data: {
        labels: line_labels,
        datasets: [{
          label: 'Proizvodnja',
          data: data_production,
          fill: false,
          borderColor: 'rgba(37, 192, 10, 1)',
          tension: 0.2,
          borderWidth: 2,
        },
        {
          label: 'Predikcija',
          data: data_consumption,
          fill: false,
          borderColor: 'rgba(108, 122, 137, 1)',
          tension: 0.2,
          borderWidth: 2,
          borderDash:[5,5]
        }
      ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins:{
          tooltip:{
            mode:'index',
            intersect: false,
            callbacks: {
              label: (context) => {
                const value = context.dataset.data[context.dataIndex];
                return `${value} W`;
              }
            }
          },
          legend:{
            labels:{
              usePointStyle: true,
              pointStyle: 'line',
              font:{
                size:15.5
              }
            }
          },
        },
        scales: {
          y: {
            title: {
              display: true,
              text: 'Jedinica energije [W]',
              color:"black"
            }
          },
          x: {
            title: {
              display: true,
              text: model.time,
              color:"black"
            },
          }
        }
      }
    }

    this.myLineChartFirstPage = new Chart("newIdAnalysis", lineChartOptions);
  }

  //consumption
  generateBarChart(model: any){
    if (this.myLineChartFirstPage != '') {
      this.myLineChartFirstPage.destroy();
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
            intersect: false
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
              text: 'Jedinica energije [kWh]',
              color:"black"
            },
            ticks:{
              callback: function(value,index,ticks){
                return value
              }
            }
          },
          x: {
            title: {
              display: true,
              text: model.time,
              color:"black"
            },
          }
        }
      }
    }

    this.myLineChartFirstPage = new Chart ('newIdAnalysis',barChartOptions);

  }

  
  generateBarChartProduction(model: any){
    if (this.myLineChartFirstPage != '') {
      this.myLineChartFirstPage.destroy();
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
            intersect: false
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
              text: 'Jedinica energije [kWh]',
              color:"black"
            },
            ticks:{
              callback: function(value,index,ticks){
                return value
              }
            }
          },
          x: {
            title: {
              display: true,
              text: model.time,
              color:"black"
            },
          }
        }
      }
    }

    this.myLineChartFirstPage = new Chart ('newIdAnalysis',barChartOptions);

  }

}
