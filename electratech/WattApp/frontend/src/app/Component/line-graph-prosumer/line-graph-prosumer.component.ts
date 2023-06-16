import { Component, Input, OnInit } from '@angular/core';
import { Chart, ChartConfiguration, ScriptableLineSegmentContext, registerables } from 'chart.js';
import { GraphConsumption } from 'src/app/Models/consumptionDevice';

@Component({
  selector: 'app-line-graph-prosumer',
  templateUrl: './line-graph-prosumer.component.html',
  styleUrls: ['./line-graph-prosumer.component.css']
})
export class LineGraphProsumerComponent {
  myLineChartFirstPage = '' as any;

  @Input() info={} as GraphConsumption;

  // ngOnInit() {
  //   this.drawGraph(this.info);
  // } 

  deleteGraph() {
    if (this.myLineChartFirstPage != '') {
      this.myLineChartFirstPage.destroy();
    }
  }
  
  drawGraph(model: any) {
    if (this.myLineChartFirstPage != '') {
      this.myLineChartFirstPage.destroy();
    }

    Chart.register(...registerables);
    
    var line_data = model.data;
    var line_labels = model.labels;

    var lineChartOptions: ChartConfiguration = {
      type: 'line',
      data: {
        labels: line_labels,
        datasets: [{
          label: 'Potrošnja',
          data: line_data,
          fill: false,
          borderColor: 'rgba(255, 99, 132, 1)',
          tension: 0.2,
          borderWidth: 2,
        },
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
            ticks:{
              // callback: function(value,index,ticks){
              //   return value+" kWh ";
              // }
            }
          },
          x: {
            title: {
              display: true,
              text: model.timeConsumption,
              color:"black"
            }
          }
        }
      }
    }

    this.myLineChartFirstPage = new Chart("newId", lineChartOptions);
  }

  drawGraphProduction(model: any) {
    if (this.myLineChartFirstPage != '') {
      this.myLineChartFirstPage.destroy();
    }

    Chart.register(...registerables);
    
    var line_data = model.data;
    var line_labels = model.labels;

    var lineChartOptions: ChartConfiguration = {
      type: 'line',
      data: {
        labels: line_labels,
        datasets: [{
          label: 'Proizvodnja',
          data: line_data,
          fill: false,
          borderColor: 'rgba(37, 192, 10, 1)',
          tension: 0.2,
          borderWidth: 2,
        },
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
              },
              color:"black"
            }
          },
        },
        scales: {
          y: {
            title: {
              display: true,
              text: 'Jedinica energije [W]'
            }
          },
          x: {
            title: {
              display: true,
              text: model.timeConsumption
            }
          }
        }
      }
    }

    this.myLineChartFirstPage = new Chart("newId", lineChartOptions);
  }

   
}
