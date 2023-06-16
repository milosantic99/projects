import { Component } from '@angular/core';
import { Chart, ChartConfiguration, registerables} from 'chart.js';
import { DsoChartsService } from 'src/app/Services/API/DSO-API/DSO_Charts/dso-charts.service';

@Component({
  selector: 'app-line-graph',
  templateUrl: './line-graph.component.html',
  styleUrls: ['./line-graph.component.css']
})
export class LineGraphComponent {

  myLineChartFirstPage:any;

  constructor(private dsoService:DsoChartsService){
    this.getConsumptionForWeek();
  }

  line_data = new Array<number>;
  past_line_data = new Array<number>;


  isLoading = true;
  getConsumptionForWeek(){
    this.dsoService.getConsumptionForWeek().
    subscribe(  
      response=>{
        response.forEach(element => {
          this.line_data.push(element.consumption);
        });
        this.getConsumptionForPastWeek();
      });
  }
  getConsumptionForPastWeek(){
    this.dsoService.getConsumptionForPastWeek().
    subscribe(
      response =>{
        response.forEach(element=>{
          this.past_line_data.push(element.consumption);
        });
        this.isLoading = false;
        this.draw_graph();
      }
    )
  }

  
  draw_graph(){
    Chart.register(...registerables);    
    var line_labels = ["Ponedeljak", "Utorak", "Sreda", "Cetvrtak", "Petak", "Subota", "Nedelja"];

    var lineChartOptions: ChartConfiguration = {
      type: 'line',
      
      data: {
        labels: line_labels,
        datasets: [{
          label: 'Potrosnja ove nedelje',
          data: this.line_data,
          fill: false,
          borderColor: 'rgba(255, 99, 132, 1)',
          tension: 0.2,
          borderWidth: 2
        },
        {
          label: 'Potrošnja prethodne nedelje',
          data: this.past_line_data,
          fill: false,
          borderColor: 'rgba(123, 99, 254, 1)',
          tension: 0.2,
          borderWidth: 1,
          borderDash:[5,6]
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
                let label = context.dataset.label;
                const value = context.dataset.data[context.dataIndex];
                if (label) {
                  label += ': ';
                }
                if (context.parsed.y !== null) {
                    label += value + " kWh"
                }
                return label;
              }
            }
          }
        },
        responsive:true,
        scales: {
          y: {
            title: {
              display: true,
              text: 'Ukupna potrošnja [kWh]',
              font: {
                size: 18,
              }
            },
            beginAtZero: true,
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
                size: 18,
              }
            },
          }
        }
      }
    }

    this.myLineChartFirstPage = new Chart("my-line-chartt", lineChartOptions);
  }

}
