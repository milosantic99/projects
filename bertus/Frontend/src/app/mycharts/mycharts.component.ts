import { Component, OnInit ,ViewChildren, ElementRef, QueryList } from '@angular/core';
import { Chart, ChartConfiguration, ChartData, registerables } from 'chart.js';

const baseConfig: ChartConfiguration = {
  type: 'line',
  options: {
    scales: {
      y: {
        beginAtZero: false
      }
    }
  },
  data: undefined
}



@Component({
  selector: 'app-mycharts',
  templateUrl: './mycharts.component.html',
  styleUrls: ['./mycharts.component.css']
})




export class MychartsComponent implements OnInit {

  @ViewChildren('pr_chart', { read: ElementRef })
  chartElementRefs: QueryList<ElementRef>;


  usersCharts = [
    { filename:"filename 1",
      data:[[86, 378, 106, 306, 507, 111, 133, 221, 283, 1000], 
            [6, 37, 306, 206, 407, 311, 233, 121, 783, 1000], 
            [86, 378, 106, 306, 507, 111, 133, 221, 283, 1000], 
            [6, 37, 306, 206, 407, 311, 233, 121, 783, 1000]],
      epoch: 10,
      activation: "ReLu",
      headers: ["prvi","drugi","treci","cetvrti","peti","sesti"],
      inputs: [3,4],
      output: 0,
      optimizer: "Adam",
      loss: "Mse",
      problem_type: "classification",
      encode: "LabelEncoding"
  },
    
  { filename:"filename 2",
      data:[[65, 59, 80, 81, 56, 55, 40], 
      [12, 75, 65, 53, 13, 43, 38], 
      [65, 59, 80, 81, 56, 55, 40], 
      [12, 75, 65, 53, 13, 43, 38]],
      epoch: 10,
      activation: "Tahm",
      headers: ["first","second","third","forth","fifth","sixth"],
      inputs: [1,3],
      output: 5,
      optimizer: "SGD",
      loss: "Categoricalcross",
      problem_type: "regression",
      encode: "OneHotEncoding"
  },

  { filename:"filename 2",
      data:[[65, 59, 80, 81, 56, 55, 40], 
            [12, 75, 65, 53, 13, 43, 38], 
            [65, 59, 80, 81, 56, 55, 40], 
            [12, 75, 65, 53, 13, 43, 38]],
      epoch: 10,
      activation: "Tahm",
      headers: ["first","second","third","forth","fifth","sixth"],
      inputs: [1,3],
      output: 5,
      optimizer: "SGD",
      loss: "Categoricalcross",
      problem_type: "regression",
      encode: "OneHotEncoding"
  }
  ]

  fixChartData(){

    var myChartData: ChartData[] = []

    this.usersCharts.forEach(element => {


      var line_labels = Array.from({length: element["data"][0].length}, (_, i) => i + 1)

      var new_element = {
        labels: line_labels,
        datasets: [
          {
            label: "crveni-label",
            data: element["data"][0],
            borderColor: 'rgba(255, 99, 132, 1)',
            fill: false,
            tension: 0.1,
            borderWidth: 1
          },
          {
            label:"plavi-label",
            data: element["data"][1],
            borderColor: 'rgba(123, 99, 254, 1)',
            fill: false,
            tension: 0.1,
            borderWidth: 1
          }
        ],
      }
      myChartData.push(new_element)
    })

    return myChartData
  }

  chartData: ChartData[];

  // chartData: ChartData[] = [
  //   {
  //     labels: [
  //       '1500',
  //       '1600',
  //       '1700',
  //       '1750',
  //       '1800',
  //       '1850',
  //       '1900',
  //       '1950',
  //       '1999',
  //       '2050',
  //     ],
  //     datasets: [
  //       {
  //         label: "crveni-label",
  //         data: [86, 378, 106, 306, 507, 111, 133, 221, 283, 1000],
  //         borderColor: 'rgba(255, 99, 132, 1)',
  //         fill: false,
  //         tension: 0.1,
  //         borderWidth: 1
  //       },
  //       {
  //         label:"plavi-label",
  //         data: [6, 37, 306, 206, 407, 311, 233, 121, 783, 1000],
  //         borderColor: 'rgba(123, 99, 254, 1)',
  //         fill: false,
  //         tension: 0.1,
  //         borderWidth: 1
  //       }
  //     ],
  //   },

  //   {
  //     labels: [
  //       '1500',
  //       '1600',
  //       '1700',
  //       '1750',
  //       '1800',
  //       '1850',
  //       '1900',
  //       '1950',
  //       '1999',
  //       '2050',
  //     ],
  //     datasets: [
  //       {
  //         data: [86, 378, 106, 306, 507, 111, 133, 221, 783, 5000].reverse(),
  //         borderColor: 'blue',
  //         fill: false,
  //       },
  //     ],
  //   },
  // ];

  charts: Chart[] = [];

  constructor() { }

  ngOnInit(): void {
    Chart.register(...registerables);

    this.chartData = this.fixChartData();
  }

  ngAfterViewInit() {

    this.charts = this.chartElementRefs.map((chartElementRef, index) => {
      const config = Object.assign({}, baseConfig, {
        data: this.chartData[index],
      });

      return new Chart(chartElementRef.nativeElement, config);
    });
  }

}
