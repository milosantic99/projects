import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { Chart, ChartConfiguration } from 'chart.js';
import { Host } from 'src/host';
import { RegularizationRateHelpComponent } from '../dialogs/regularization-rate-help/regularization-rate-help.component';
import { PredictionDialogComponent } from '../prediction-dialog/prediction-dialog.component';

@Component({
  selector: 'app-my-models',
  templateUrl: './my-models.component.html',
  styleUrls: ['./my-models.component.css']
})
export class MyModelsComponent implements OnInit {

  activation_type: string = ""
  encode_type: string = ""
  epoch: number = 0
  filename: string = ""
  hiddenLayerCounter: number = 0
  inputs: string[] =  []
  learning_rate: number = 0
  loss_type: string = ""
  matrix: any[] =  []
  model_name: string = ""
  neuronArray: number[] = []
  optimizer_type: string = ""
  outlier_type: string = ""
  output: string = ""
  problem_name: string = ""
  problem_type: string = ""
  regularization_rate: number = 0
  regularization_type: string = ""
  train_validation_ratio: number = 0

  checker : boolean = false;

  constructor(public dialog : MatDialog, public http: HttpClient) { }


  data1 : number[] = []
  data2 : number[] = []
  data3 : number[] = []
  data4 : number[] = []
  data5 : number[] = []
  data6 : number[] = []
  data7 : number[] = []
  data8 : number[] = []

  public labels : number[] = []

  mainChart:Chart = null;

  metricChart1:Chart = null;
  metricChart2:Chart = null;
  metricChart3:Chart = null;


  ngOnInit(): void {
  }

  @ViewChild('stepper5') stepper5: MatStepper;

  ngAfterViewInit() {
    this.stepper5._getIndicatorType = () => "";
  }

  backendUrl = Host.getUrl();

  model_search : string = ""

  searchModels(i){
    if(this.model_search == "")
      return true;
    

    if((this.myModels[i].indexOf(this.model_search)>=0)||(this.modelsCSV[i].indexOf(this.model_search)>=0))
      return true
    
    return false
  }

  myModels : string[] = []
  modelsCSV : string[] = []
  dates : string[] = []


  getAllModels(){

    var user = {
      username : sessionStorage.getItem("username")
    }

    this.http.post(this.backendUrl + "/api/DataTransfer/getAllModels", user).subscribe((result:any) => {
      console.log("(:");
      console.log(result);

      this.myModels = [];
      this.dates = [];
      this.modelsCSV = [];

      result.forEach(element => {
        this.myModels.push(element["modelName"]);
        this.dates.push(((element["createdAt"].replace("T", ". ")).replace("-",".")).replace("-",".").substring(0, 20));
        this.modelsCSV.push(element["problemName"]);
      });
     
    })

  }

  public numerics : any = [];
  public categories : any = [];
  public outputInfo : any = [];

  public values : any = [];
  public headers : any = [];

  public statistics : any = [];

  readModel(i){

    var readModel = {
      username : sessionStorage.getItem("username"),
      modelName : this.myModels[i],
      problemName : this.modelsCSV[i]
    }

    this.data1 = []
    this.data2 = []
    this.data3 = []
    this.data4 = []
    this.data5 = []
    this.data6 = []
    this.data7 = []
    this.data8 = []
    this.labels = []

    var I = i;
    this.checker = true;

    this.http.post(this.backendUrl + "/api/DataTransfer/getAllMatrix", readModel).subscribe((result:any) => {
      console.log("(:");
      console.log(result);

      i = I;

      this.activation_type = result["activation_type"]
      this.encode_type = result["encode_type"]   
      this.epoch = result["epoch"]    
      this.filename = result["filename"]    
      this.hiddenLayerCounter = result["hiddenLayerCounter"]    
      this.inputs = result["inputs"]     
      this.learning_rate = result["learning_rate"]    
      this.loss_type = result["loss_type"]    
      this.matrix = result["matrix"]   
      this.model_name = this.myModels[i]  
      this.neuronArray = result["neuronArray"]    
      this.optimizer_type = result["optimizer_type"]    
      this.outlier_type = result["outlier_type"]    
      this.output = result["output"]    
      this.problem_name = this.modelsCSV[i] 
      this.problem_type = result["problem_type"]    
      this.regularization_rate = result["regularization_rate"]    
      this.regularization_type = result["regularization_type"]    
      this.train_validation_ratio = result["train_validation_ratio"]


      this.numerics = result["numericalMatrixValueList"];
      this.categories = result["categoricalMatrixValueList"];

      
      for(let x=0;x<this.numerics.length;x++){
        this.values.push(0)
        this.headers.push(this.numerics[x]["headerName"])
      }

      for(let x=0;x<this.categories.length;x++){
        this.headers.push(this.categories[x]["headerName"])
        this.values.push(this.categories[x]["values"][0])
      }


      if(result["numericalMatrixOutput"]["headerName"] == null)
        this.outputInfo = result["categoricalMatrixOutput"];
      else
        this.outputInfo = result["numericalMatrixOutput"];

        console.log(this.numerics);
        console.log(this.categories);
        console.log(this.outputInfo);
        
        console.log("____");
        console.log(result["statistics"])

        this.statistics = result["statistics"]
      
      

      this.matrix.forEach(element => {
        this.data1.push(element[0])
        this.data2.push(element[4])
        this.data3.push(element[1])
        this.data4.push(element[5])
        this.data5.push(element[2])
        this.data6.push(element[6])
        this.data7.push(element[3])
        this.data8.push(element[7])

        this.labels.push(this.data1.length)
      });

      this.drawChart()

      if(this.problem_type=="regression")
        this.drawChartRegression()
      else
        this.drawChartClassification()

      // this.mainChart.update();
      // this.metricChart1.update();
      // this.metricChart2.update();
      // this.metricChart3.update();

      this.stepper5.next();


      });
      
  }

  lineChartOptions: ChartConfiguration;
  lineChartOptions1: ChartConfiguration;
  lineChartOptions2: ChartConfiguration;
  lineChartOptions3: ChartConfiguration;


  changeValue(value, i){
    this.values[i] = value;
  }

  doPrediction(){
    var array = this.getPredictArray()

    for(var i=0;i<array.length;i++){
      array[i]=array[i].toString();
    }

    console.log(this.problem_type);

    var predictJson = {
      array : array,
      inputs : this.inputs,
      problem_type : this.problem_type,

      username : sessionStorage.getItem("username"),
      problem_name : this.problem_name,
      model_name : this.model_name,

      statistics : this.statistics
    }

    console.log(predictJson);

    this.http.post(this.backendUrl + "/api/DataTransfer/doPrediction", predictJson).subscribe((result:any) => {
      console.log("(:");
      console.log(result);


      this.outputHeader = result[0];
      this.outputValue = result[1];

      this.openDialog();
    })

    
  }

  getPredictArray(){
    var array = []

    for(let i=0;i<this.numerics.length;i++)
      array.push(this.values[i])

    for(let i=0;i<this.categories.length;i++){
      for(let j=0;j<this.categories[i]["values"].length;j++){
        if(this.categories[i]["values"][j]==this.values[i + this.numerics.length]){
          array.push(j);
        }
      }
    }

    return array
  }

  getPredictValue(){

  }

  outputHeader : any;
  outputValue : any;

  openDialog(): void {

    this.dialog.open(PredictionDialogComponent, {data: {header: this.outputHeader, value: this.outputValue} 
                                                                    , backdropClass: 'backdropBackground'
                                                                    , panelClass: 'warning-dialog',}
                                                                    );
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
    
    this.mainChart = new Chart("chart-one", this.lineChartOptions);
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
    
    this.metricChart1 = new Chart("chart-two", this.lineChartOptions1);
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
    
    this.metricChart2 = new Chart("chart-three", this.lineChartOptions2);
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
    
    this.metricChart3 = new Chart("chart-four", this.lineChartOptions3);
  }











  drawChartClassification1(){
    //var line_labels = Array.from({length: this.data1.length}, (_, i) => i + 1)

    this.lineChartOptions1 = {
      type: 'line',
      data: {
        labels: this.labels,
        datasets: [{
          label: 'False negatives train',
          data: this.data3,
          fill: false,
          borderColor: 'rgba(255, 99, 132, 1)',
          tension: 0.1,
          borderWidth: 1
        },
        {
          label: 'False negatives validation',
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
    
    this.metricChart1 = new Chart("chart-two", this.lineChartOptions1);
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
    
    this.metricChart2 = new Chart("chart-three", this.lineChartOptions2);
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
    
    this.metricChart3 = new Chart("chart-four", this.lineChartOptions3);
  }




  deleteModel(i){
    
    var deleteModel = {
      username : sessionStorage.getItem("username"),
      modelName : this.myModels[i],
      problemName : this.modelsCSV[i],
      csvName : ""
    }

    console.log(deleteModel)

    this.http.post(this.backendUrl + "/api/DataTransfer/deleteModel", deleteModel).subscribe((result:any) => {
      console.log("(:");
      console.log(result);
      
      this.getAllModels();
    })
    
  }

}
