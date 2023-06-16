import { Component, Input, OnInit } from '@angular/core';
import { Chart, ChartConfiguration, registerables} from 'chart.js';
import { LineGraphHomeProsumerPage } from 'src/app/Pages/Prosumer/home-prosumer/home-prosumer.component';

@Component({
  selector: 'app-line-graph-home-prosumer',
  templateUrl: './line-graph-home-prosumer.component.html',
  styleUrls: ['./line-graph-home-prosumer.component.css']
})
export class LineGraphHomeProsumerComponent {
  @Input() info={} as LineGraphHomeProsumerPage;
  myLineChartFirstPage = '' as any;

  // ngOnInit(): void {
  //   this.drawGraph(this.info);
  // }

  drawGraph(model:any){
    if (this.myLineChartFirstPage != '') {
      this.myLineChartFirstPage.destroy();
    }
    Chart.register(...registerables);    

    var lineChartOptions: ChartConfiguration = {
      type: 'line',
      
      data: {
        labels: model.labels,
        datasets: [{
          label: 'Potrosnja ove nedelje',
          data: model.thisWeek,
          fill: false,
          borderColor: 'rgba(255, 99, 132, 1)',
          tension: 0.2,
          borderWidth: 2
        },
        {
          label: 'Potrošnja prethodne nedelje',
          data: model.lastWeek,
          fill: false,
          borderColor: 'rgba(123, 99, 254, 1)',
          tension: 0.2,
          borderWidth: 1,
          borderDash:[5,5]
        }
      ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins:{
          legend:{
            labels:{
              usePointStyle: true,
              pointStyle: 'line',
              font:{
                size:14
              },
            },
            align:'center',
          },
          tooltip:{
            mode:'index',
            intersect: false,
            callbacks: {
              label: (context) => {
                const value = context.dataset.data[context.dataIndex];
                return `${value} W`;
              }
            }
          }
        },
        scales: {
          y: {
            title: {
              display: true,
              text: 'Ukupna potrošnja [W]',
              font: {
                size:13
              },
              color:"black"
            },
            beginAtZero: false,
            ticks:{
              callback: function(value,index,ticks){
                return value+"";
              }
            },
          },
          x:{
            title: {
              display: true,
              text: 'Dani u nedelji',
              font: {
                size:13
              },
              align:'center',
              color:"black"
            },
          }
        }
      }
    }

    this.myLineChartFirstPage = new Chart("my-line-chart-HomeProsumer", lineChartOptions);
  }  
  
}

