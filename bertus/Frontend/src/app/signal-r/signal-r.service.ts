import { Injectable } from '@angular/core';
import * as signalR from "@aspnet/signalr";
import { Chart, ChartConfiguration } from 'chart.js';
import { Host } from 'src/host';
import { ChartModel } from '../models/chartmodel';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {

  //public data : ChartModel[];
  public data1 : number[];
  public data2 : number[];
  public data3 : number[];
  public data4 : number[];
  public data5 : number[];
  public data6 : number[];
  public data7 : number[];
  public data8 : number[];
  
  public labels : number[];

  public connectionId : string;
  public progress : number;
  public epoch : number;

  mainChart:Chart = null;

  metricChart1:Chart = null;
  metricChart2:Chart = null;
  metricChart3:Chart = null;
  

  private hubConnection : signalR.HubConnection;

  public startConnection = () =>{
    this.hubConnection = new signalR.HubConnectionBuilder()
    .withUrl(Host.getUrl() + "/chart", {
      skipNegotiation: true,
      transport: signalR.HttpTransportType.WebSockets
    }).build() 
    
    this.hubConnection
    .start()
    .then(() => console.log("Connection started"))
    .then(() => this.getConnectionId())
    .catch(err => console.log("Error - " + err))
  }

  public getConnectionId = () => {
    this.hubConnection.invoke('getconnectionid').then(
      (data) => {
          console.log("connection id ");
          console.log(data);
          this.connectionId = data;
        }
    ); 
  }

  // public addTransferChartDataListener = () => {
  //   this.hubConnection.on('transferchartdata', (data)=>{
  //     this.data = data;
  //     //console.log(data);
  //   })
  // }

  public addEpochDataListener = () => {
    this.hubConnection.on('epochtransfer', (data)=>{
      //this.data = data;
      this.progress = this.progress + (100/this.epoch);


      console.log("-------------------")

      this.data1.push(data["data"][0])
      this.data2.push(data["data"][4])




      this.data3.push(data["data"][1])
      this.data4.push(data["data"][5])

      this.data5.push(data["data"][2])
      this.data6.push(data["data"][6])

      this.data7.push(data["data"][3])
      this.data8.push(data["data"][7])

      
  

      this.labels.push(this.data1.length)


      console.log(data);
      // console.log(this.data1);
      // console.log(this.data2);
      // console.log(this.data3);
      // console.log(this.data4);
      
      //console.log(this.labels);

      //this.updateConfiguration();
      this.mainChart.update();
      this.metricChart1.update();
      this.metricChart2.update();
      this.metricChart3.update();
    })
  }

  lineChartOptions: ChartConfiguration;
  lineChartOptions1: ChartConfiguration;
  lineChartOptions2: ChartConfiguration;
  lineChartOptions3: ChartConfiguration;


  

  updateConfiguration(){
    this.lineChartOptions = {
      type: 'line',
      data: {
        labels: this.labels,
        datasets: [{
          label: 'My First Line',
          data: this.data1,
          fill: false,
          borderColor: 'rgba(255, 99, 132, 1)',
          tension: 0.1,
          borderWidth: 1
        },
        {
          label: 'My Second Line',
          data: this.data2,
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
            beginAtZero: false,
            title: {
              display: true,
              text: "Value"
            }
          },
          x: {
            beginAtZero: false,
            title: {
              display: true,
              text: "Epoches"
            }
          }
        }
      }
    }
  }



  drawChart(){
    //var line_labels = Array.from({length: this.data1.length}, (_, i) => i + 1)

    this.lineChartOptions = {
      type: 'line',
      data: {
        labels: this.labels,
        datasets: [{
          label: 'loss train',
          data: this.data1,
          fill: false,
          borderColor: 'rgba(255, 99, 132, 1)',
          tension: 0.1,
          borderWidth: 1
        },
        {
          label: 'loss validation',
          data: this.data2,
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
            beginAtZero: false,
            title: {
              display: true,
              text: "Value"
            }
          },
          x: {
            beginAtZero: false,
            title: {
              display: true,
              text: "Epoches"
            }
          }
        }
      }
    }

    if(this.mainChart!=null)
      this.mainChart.destroy();
    
    this.mainChart = new Chart("main-chart", this.lineChartOptions);
  }








  drawChartRegression(){
    //var line_labels = Array.from({length: this.data1.length}, (_, i) => i + 1)

    this.drawChartRegression1();
    this.drawChartRegression2();
    this.drawChartRegression3();
    
  }

  drawChartClassification(){
    //var line_labels = Array.from({length: this.data1.length}, (_, i) => i + 1)

    this.drawChartClassification1();
    this.drawChartClassification2();
    this.drawChartClassification3();
    
  }





  drawChartRegression1(){
    //var line_labels = Array.from({length: this.data1.length}, (_, i) => i + 1)

    this.lineChartOptions1 = {
      type: 'line',
      data: {
        labels: this.labels,
        datasets: [{
          label: 'RMSE train',
          data: this.data3,
          fill: false,
          borderColor: 'rgba(255, 99, 132, 1)',
          tension: 0.1,
          borderWidth: 1
        },
        {
          label: 'RMSE validation',
          data: this.data4,
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
            beginAtZero: false,
            title: {
              display: true,
              text: "Value"
            }
          },
          x: {
            beginAtZero: false,
            title: {
              display: true,
              text: "Epoches"
            }
          }
        }
      }
    }

    if(this.metricChart1!=null)
      this.metricChart1.destroy();
    
    this.metricChart1 = new Chart("metric-chart-one", this.lineChartOptions1);
  }


  drawChartRegression2(){
    //var line_labels = Array.from({length: this.data1.length}, (_, i) => i + 1)

    this.lineChartOptions2 = {
      type: 'line',
      data: {
        labels: this.labels,
        datasets: [{
          label: 'MSE train',
          data: this.data5,
          fill: false,
          borderColor: 'rgba(255, 99, 132, 1)',
          tension: 0.1,
          borderWidth: 1
        },
        {
          label: 'MSE validation',
          data: this.data6,
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
            beginAtZero: false,
            title: {
              display: true,
              text: "Value"
            }
          },
          x: {
            beginAtZero: false,
            title: {
              display: true,
              text: "Epoches"
            }
          }
        }
      }
    }

    if(this.metricChart2!=null)
      this.metricChart2.destroy();
    
    this.metricChart2 = new Chart("metric-chart-two", this.lineChartOptions2);
  }


  drawChartRegression3(){
    //var line_labels = Array.from({length: this.data1.length}, (_, i) => i + 1)

    this.lineChartOptions3 = {
      type: 'line',
      data: {
        labels: this.labels,
        datasets: [{
          label: 'MAE train',
          data: this.data7,
          fill: false,
          borderColor: 'rgba(255, 99, 132, 1)',
          tension: 0.1,
          borderWidth: 1
        },
        {
          label: 'MAE validation',
          data: this.data8,
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
            beginAtZero: false,
            title: {
              display: true,
              text: "Value"
            }
          },
          x: {
            beginAtZero: false,
            title: {
              display: true,
              text: "Epoches"
            }
          }
        }
      }
    }

    if(this.metricChart3!=null)
      this.metricChart3.destroy();
    
    this.metricChart3 = new Chart("metric-chart-three", this.lineChartOptions3);
  }











  drawChartClassification1(){
    //var line_labels = Array.from({length: this.data1.length}, (_, i) => i + 1)

    this.lineChartOptions1 = {
      type: 'line',
      data: {
        labels: this.labels,
        datasets: [{
          label: 'False negative train',
          data: this.data3,
          fill: false,
          borderColor: 'rgba(255, 99, 132, 1)',
          tension: 0.1,
          borderWidth: 1
        },
        {
          label: 'False negative validation',
          data: this.data4,
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
            beginAtZero: false,
            title: {
              display: true,
              text: "Value"
            }
          },
          x: {
            beginAtZero: false,
            title: {
              display: true,
              text: "Epoches"
            }
          }
        }
      }
    }

    if(this.metricChart1!=null)
      this.metricChart1.destroy();
    
    this.metricChart1 = new Chart("metric-chart-one", this.lineChartOptions1);
  }


  drawChartClassification2(){
    //var line_labels = Array.from({length: this.data1.length}, (_, i) => i + 1)

    this.lineChartOptions2 = {
      type: 'line',
      data: {
        labels: this.labels,
        datasets: [{
          label: 'Accuracy train',
          data: this.data5,
          fill: false,
          borderColor: 'rgba(255, 99, 132, 1)',
          tension: 0.1,
          borderWidth: 1
        },
        {
          label: 'Accuracy validation',
          data: this.data6,
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
            beginAtZero: false,
            title: {
              display: true,
              text: "Value"
            }
          },
          x: {
            beginAtZero: false,
            title: {
              display: true,
              text: "Epoches"
            }
          }
        }
      }
    }

    if(this.metricChart2!=null)
      this.metricChart2.destroy();
    
    this.metricChart2 = new Chart("metric-chart-two", this.lineChartOptions2);
  }


  drawChartClassification3(){
    //var line_labels = Array.from({length: this.data1.length}, (_, i) => i + 1)

    this.lineChartOptions3 = {
      type: 'line',
      data: {
        labels: this.labels,
        datasets: [{
          label: 'Categorical crossentropy train',
          data: this.data7,
          fill: false,
          borderColor: 'rgba(255, 99, 132, 1)',
          tension: 0.1,
          borderWidth: 1
        },
        {
          label: 'Categorical crossentropy validation',
          data: this.data8,
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
            beginAtZero: false,
            title: {
              display: true,
              text: "Value"
            }
          },
          x: {
            beginAtZero: false,
            title: {
              display: true,
              text: "Epoches"
            }
          }
        }
      }
    }

    if(this.metricChart3!=null)
      this.metricChart3.destroy();
    
    this.metricChart3 = new Chart("metric-chart-three", this.lineChartOptions3);
  }



}