import { Component, OnInit } from '@angular/core';
import { Chart, ChartConfiguration, registerables} from 'chart.js';
import { DataTransferService } from 'src/app/data-transfer.service';


@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {

  constructor(private dataTransfer : DataTransferService) {  }


  ngOnInit(): void {


    Chart.register(...registerables);

    var bar_data = [12, 19, 3, 5, 2, 3];
    var bar_labels = ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'];

    var barChartOptions: ChartConfiguration = {
      type: 'bar',
      data: {
        labels: bar_labels,
        datasets: [{
          label: '# of Votes',
          data: bar_data,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    }

    var myBarChart = new Chart("my-bar-chart", barChartOptions);




    
    var line_data = [65, 59, 80, 81, 56, 55, 40];
    var line_labels = ["Januar", "Febriar", "Mart", "April", "Maj", "Jun", "Jul"];

    var lineChartOptions: ChartConfiguration = {
      type: 'line',
      data: {
        labels: line_labels,
        datasets: [{
          label: 'My First Line',
          data: line_data,
          fill: false,
          borderColor: 'rgba(255, 99, 132, 1)',
          tension: 0.1,
          borderWidth: 1
        },
        {
          label: 'My Second Line',
          data: [10,102,34,40,59,62,17],
          fill: false,
          borderColor: 'rgba(123, 99, 254, 1)',
          tension: 0.1,
          borderWidth: 1
        }
      ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    }

    var myLineChart = new Chart("my-line-chart", lineChartOptions);




  }



}
