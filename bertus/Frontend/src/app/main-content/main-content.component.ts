import { Component, ViewChild, OnInit,ElementRef} from '@angular/core';
import { Sort } from '@angular/material/sort';
import { Metrics } from '../models/metrics';
import { Phase } from '../models/phases';
import { MatDialog} from '@angular/material/dialog';
import { EditDialogComponent } from '..//edit-dialog/edit-dialog.component';
import { Activation } from '../models/activation';
import { learningRate } from '../models/learningRate';
import { Regularization } from '../models/regularization';
import { problemType } from '../models/problemType';
import { regularizationRate } from '../models/regularizationRate';
import { HttpClient } from '@angular/common/http';
import { UploadFileComponent } from '../upload-file/upload-file.component';

import { FormsModule } from '@angular/forms';
import { HttpRequest } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { not } from '@angular/compiler/src/output/output_ast';
import { Optimizer } from '../models/optimizer';
import { Loss } from '../models/loss';
import { Outlier } from '../models/outlier';
import { Encode } from '../models/encode';
import * as $ from 'jquery'; 
import { Chart, ChartConfiguration, registerables} from 'chart.js';
import { max, min } from 'rxjs';
import { DataTransferService } from '../data-transfer.service';
import { ToastrService } from 'ngx-toastr';
import { SignalRService } from '../signal-r/signal-r.service';
import { Host } from 'src/host';
import { EncoderHelpComponent } from '../dialogs/encoder-help/encoder-help.component';
import { ActivationFunctionHelpComponent } from '../dialogs/activation-function-help/activation-function-help.component';
import { OutlierHelpComponent } from '../dialogs/outlier-help/outlier-help.component';
import { ProblemTypeHelpComponent } from '../dialogs/problem-type-help/problem-type-help.component';
import { OptimizerTypeHelpComponent } from '../dialogs/optimizer-type-help/optimizer-type-help.component';
import { LossTypeHelpComponent } from '../dialogs/loss-type-help/loss-type-help.component';
import { LearningRateHelpComponent } from '../dialogs/learning-rate-help/learning-rate-help.component';
import { EpocheHelpComponent } from '../dialogs/epoche-help/epoche-help.component';
import { TestPercentageHelpComponent } from '../dialogs/test-percentage-help/test-percentage-help.component';
import { RegularizsationHelpComponent } from '../dialogs/regularizsation-help/regularizsation-help.component';
import { MatStepper } from '@angular/material/stepper';
import { RegularizationRateHelpComponent } from '../dialogs/regularization-rate-help/regularization-rate-help.component';
import { colspan } from '../models/colspan';
import { DataCleaningHelpComponent } from '../dialogs/data-cleaning-help/data-cleaning-help.component';


@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css']
})
export class MainContentComponent implements OnInit {

//                  _       _     _           
// __   ____ _ _ __(_) __ _| |__ | | ___  ___ 
// \ \ / / _` | '__| |/ _` | '_ \| |/ _ \/ __|
//  \ V / (_| | |  | | (_| | |_) | |  __/\__ \
//   \_/ \__,_|_|  |_|\__,_|_.__/|_|\___||___/


  test(){
    console.log(this.problem_name);
  }
                                          
  title = 'bertus';

  lines:any[] = []; //for headings
  linesR:any[] = []; // for rows
  sortedData:any[] = [];

  public page : number = 1;
  public pageSize:number = 10;
  public totalLength:number = -1;

  public metric: Metrics[] = [];
  public phases: Phase[] = [];
  public loss: Loss[] = [];
  public optimizer: Optimizer[] = [];
  public activation: Activation[] = [];
  public regularization: Regularization[] = [];
  public problemType: problemType[] = [];
  public outlier: Outlier[] = [];
  public encode: Encode[] = [];
  public selectedMetric: number = 0;
  public hiddenLayers: number = 1;
  public modifiedText: string = "";
  public filename: string = "";
  public showMetrics: boolean = false;
  public showRegRateInput: boolean = false;
  public train_test_ratio: number = 25;
  public showMetricTable: boolean = false;
  public metricArray: any[] = [];
  public showCatMetrics : boolean;

  public hiddenLayerCounter : number = 4;
  public hiddenLayerText : string = "Hidden layers";
  public hiddenLayerArray : number[] = [];
  public neuronArray : number[] = [1,3,1,2,1,1];

  public activation_type: ActivationType = ActivationType.reLU;
  public loss_type: LossType = LossType.Mse;
  public optimizer_type: OptimizerType = OptimizerType.Adam;
  public learning_rate: number = 0.001;
  public regularization_type: RegularizationType = RegularizationType.L1;
  public regularization_rate: number = 0.001;
  public problem_type: ProblemType;
  public epoch: number = 10;
  public replace_number_type:ReplaceNumber = ReplaceNumber.Delete;
  public encode_type: EncodeType = EncodeType.OneHotEncoding;
  public outlier_type: OutlierType = OutlierType.none;
  public replace_cat_type: ReplaceCat = ReplaceCat.Delete;

  public data_cleaning: DataCleaning = DataCleaning.Normalizer;

  public checkboxStates: number[];
  public radioState: number;
  public checkboxCounter: number;

  public activationTypeValues = ActivationType;
  public encodeTypeValues = EncodeType;
  public outlierTypeValues = OutlierType;
  public dataTypeValues = DataType;
  public dataCleaningValues = DataCleaning;
  public regularizationTypeValues = RegularizationType;
  public problemTypeValues = ProblemType;
  public optimizerTypeValues = OptimizerType;
  public lossTypeValues = LossType;
  public replaceNumbers = ReplaceNumber;
  public replaceCat = ReplaceCat;

  public replaceMissing : string[] = [];

  public dataTypes : DataType[];
  public trueClass : Boolean[];

  public typeClass = DataType.Categorical;
  public typeNumeric = DataType.Numeric;

  public encodeTypes : EncodeType[];

  public username = sessionStorage.getItem("username")

  public problem_name : string;

  public my_id : string;

  minArray : any[] = [];
  maxArray : any[] = [];
  avgArray : any[] = [];
  medianArray : any[] = [];
  nanArray : any[] = [];

  public corrMat : any[][];
  public confMatrix : any[];
  public Colspan : colspan[] = [];
  public numStat : any[] = [];
  public catStat : any[] = [];

  classRegressArray : any[] = [];
  missingValues : any[] = [];

  selectedFile: any = null;
  uploadForm!: FormGroup;
  errorMsg = '';
  submissionResult: any;

  backendUrl = Host.getUrl();

  urlForCSV = this.backendUrl + "/api/FileUpload/uploadFile";
  urlChangeValue = this.backendUrl + "/api/FileUpload/editValue";
  url = this.backendUrl + "/api/DataTransfer/getInfoFromFrontend";

  json:any;

  model_name : string = "";

  secondPhase : boolean = false;

  constructor(public dialog : MatDialog, public http: HttpClient, private formBuilder: FormBuilder, private dataTransfer: DataTransferService, private toastr: ToastrService
    , public signalRService : SignalRService) {

  }

  private startHttpRequest = () =>{
    this.http.get(Host.getUrl() + '/api/chart')
    .subscribe(res => {
      console.log("primio");
      console.log(res);
    })
  }

  public chartOptions: any = {
    scaleShowVerticalLines: true,
    responsive: true,
    scales: {
      y: {
        beginAtZero: false
      }
    }
  }

  public chartLabels: string[] = ['Real time data for the chart'];
  public chartType: string = 'bar';
  public chartLegend: boolean = true;



  ngOnInit(): void {

    this.signalRService.startConnection();
    // this.signalRService.addTransferChartDataListener();
    this.signalRService.addEpochDataListener();
    this.startHttpRequest();

    Chart.register(...registerables);

    this.uploadForm = this.formBuilder.group({
      profile: ['']
    });

    this.metric = [
      {Id: 0, metricName: "Choose an option"},
      {Id: 1, metricName: "Min"},
      {Id: 2, metricName: "Max"},
      {Id: 3, metricName: "Median"},
      {Id: 4, metricName: "Average"},
      {Id: 5, metricName: "Number of blank rows"},
    ];

    this.phases = [
      {Id: 0, phase: "Ucitavanje fajla", is_completed: false},
      {Id: 1, phase: "Pregled podataka i rucna izmena", is_completed: false},
      {Id: 2, phase: "Brisanje ili izmena praznog reda", is_completed: false},
      {Id: 3, phase: "Odabir ulaza i izlaza", is_completed: false},
      {Id: 4, phase: "Odabir podataka->py", is_completed: false},
      {Id: 5, phase: "Treniranje", is_completed:false},
      // {Id: 6, phase: "Obabir skrivenih slojeva i neurona", is_completed:false}
      {Id: 6, phase: "Use", is_completed:false},
      {Id: 7, phase: "Chart", is_completed:false},
      
    ];

    this.activation = [
      {Id: 0, name: ActivationType.reLU},
      {Id: 1, name: ActivationType.tanh},
      {Id: 2, name: ActivationType.sigmoid},
      {Id: 3, name: ActivationType.linear},
      {Id: 4, name: ActivationType.softmax}
    ]

    this.regularization = [
      {Id: 0, name: RegularizationType.none},
      {Id: 1, name: RegularizationType.L1},
      {Id: 2, name: RegularizationType.L2},
    ]

    this.problemType = [
      {Id: 0, name: ProblemType.classification},
      {Id: 1, name: ProblemType.regression},
    ]

    this.loss = [
      {Id: 0, lossName: LossType.Binarycross},
      {Id: 1, lossName: LossType.Categoricalcross},
      {Id: 2, lossName: LossType.Mse}
    ]

    this.optimizer = [
      {Id: 0, optimizerName: OptimizerType.Adam},
      {Id: 1, optimizerName: OptimizerType.SGD}
    ]

    this.outlier = [
      {Id: 0, outlierName: OutlierType.none},
      {Id: 1, outlierName: OutlierType.Svm},
      {Id: 2, outlierName: OutlierType.MinCovDet},
      {Id: 3, outlierName: OutlierType.LocOutFact},
      {Id: 4, outlierName: OutlierType.IsolationForest}
    ]

    this.encode = [
      {Id: 0, encodeName: EncodeType.OneHotEncoding},
      {Id: 1, encodeName: EncodeType.LabelEncoding}
    ]

    this.selectedMetric = 0;
  }


  @ViewChild('stepper2') stepper2: MatStepper;
  @ViewChild('stepper3') stepper3: MatStepper;
  @ViewChild('stepper4') stepper4: MatStepper;
  
  

  ngAfterViewInit() {
      this.stepper2._getIndicatorType = () => 'none';
      this.stepper3._getIndicatorType = () => 'none';
      this.stepper4._getIndicatorType = () => 'none';
      
  }



//                                  _       
//   _ __ ___  __ _ _   _  ___  ___| |_ ___ 
//  | '__/ _ \/ _` | | | |/ _ \/ __| __/ __|
//  | | |  __/ (_| | |_| |  __/\__ \ |_\__ \
//  |_|  \___|\__, |\__,_|\___||___/\__|___/
//               |_|                        

  result : any;

  isLoading : boolean = false;


  callSendJSON(){

    this.phases[7].is_completed = true;
    

    this.sendJSON();
  }

  sendJSON(){
    var postData = {
      filename : this.filename,
      headers : this.lines[0],
      data : this.linesR[0],
      activation_type: this.activation_type,
      problem_type: this.problem_type,
      optimizer_type: this.optimizer_type,
      loss_type: this.loss_type,
      inputs : this.checkboxStates,
      output : this.radioState,
      hiddenLayerCounter : this.hiddenLayerCounter,
      neuronArray : this.neuronArray,
      //outlier_type : this.outlier_type,
      epoch: this.epoch,
      regularization_type: this.regularization_type,
      learning_rate: this.learning_rate,
      regularization_rate: this.regularization_rate,
      //replace_number_type :this.replace_number_type,
      //replace_cat_type: this.replace_cat_type,
      connectionId: this.signalRService.connectionId,
      username: this.username,
      problem_name : this.problemName,
      model_name : this.model_name,
      
      train_validation_ratio : this.train_validation_ratio,
      train_test_ratio : this.train_test_ratio,
      
      encode_type: this.encodeTypes,
      data_type: this.dataTypes
      //DODATI IME MODELA
    }

    this.signalRService.progress = 0;
    this.signalRService.epoch = this.epoch;

    this.signalRService.data1 = []
    this.signalRService.data2 = []
    this.signalRService.data3 = []
    this.signalRService.data4 = []
    this.signalRService.data5 = []
    this.signalRService.data6 = []
    this.signalRService.data7 = []
    this.signalRService.data8 = []
    
    this.signalRService.labels = []

    this.isLoading = true;
    this.phases[5].is_completed = true;
    this.phases[7].is_completed = true;

    this.stepper4.next();

    this.toastr.info( "You will get notification when training is done", "Training model has started");

    this.signalRService.drawChart();

    if(this.problem_type == ProblemType.regression)
      this.signalRService.drawChartRegression();
    else
      if(this.problem_type == ProblemType.classification)
        this.signalRService.drawChartClassification();


    var user = {
      username : sessionStorage.getItem("username"),
    }

    this.http.post(this.backendUrl + "/api/DataTransfer/saveToDatabase", user).subscribe((result:any) => {
      console.log("(:");
      this.stepper4.next();
    })
  
    this.http.post(this.url, postData).subscribe((result:any) => {
      console.log("(:");
      console.log(result["data"]);

      this.result = result["data"];

      this.data1 = []
      this.data2 = []


      result["data"].forEach(element => {
        
        this.data1.push(element[0]);
        this.data2.push(element[1]);
        
      });
      
      //this.drawChart();

      this.toastr.success("Your training has been completed.");
      this.phases[5].is_completed = true;
      this.isLoading = false;

      if(this.username != null)
        this.saveDataToDatabase();
        
      this.confMatrix = [];

      this.confMatrix = result["conf_matrix"];

      this.Colspan = [{col: this.confMatrix.length, name: "predicted"}];

    });

    
  }


  saveDataToDatabase(){

    var saveToDatabase = {
      username : sessionStorage.getItem("username"),
    }

    this.http.post(this.backendUrl + "/api/DataTransfer/saveToDatabase", saveToDatabase).subscribe((result:any) => {
      console.log("(:");
    })
  }

  
  myProblems : string[];
  problemDates : string[];
  problemsCSV : string[];

  getAllFiles(){
    // var user = {
    //   username : this.username
    // }

    var user = {
      username : this.username
    }

    this.http.post(this.backendUrl + "/api/DataTransfer/get_all_files", user).subscribe((result:any) => {
      console.log("(:");
      console.log(result);

      this.myProblems = [];
      this.problemDates = [];
      this.problemsCSV = [];

      result.forEach(element => {
        this.myProblems.push(element["problemName"]);
        this.problemDates.push(((element["datumVreme"].replace("T", ". ")).replace("-",".")).replace("-","."));
        this.problemsCSV.push(element["csvName"]);
      });
      //this.myProblems = result;
    })

  }

  getAllModels(){

    var user = {
      username : this.username
    }

    this.http.post(this.backendUrl + "/api/DataTransfer/getAllModels", user).subscribe((result:any) => {
      console.log("(:");
      console.log(result);


      /*
      this.myProblems = [];
      this.problemDates = [];
      this.problemsCSV = [];

      result.forEach(element => {
        this.myProblems.push(element["problemName"]);
        this.problemDates.push(((element["datumVreme"].replace("T", ". ")).replace("-",".")).replace("-","."));
        this.problemsCSV.push(element["csvName"]);
      });

      */
     

      //this.myProblems = result;
    })

  }



  onFileSelect(event) {

    this.secondPhase = false;
    
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadForm.get('profile')!.setValue(file);

      this.onSubmit();
    }

  }


  onSubmit() {

    this.lines = [];
    this.linesR = [];
    this.sortedData = [];

    this.classRegressArray = [];
    this.replaceMissing = [];

    this.dataTypes = [];
    this.trueClass = [];

    this.totalLength = -1;
    //this.page = 1;
    this.pageSize = 10;
    this.selectedMetric = 0;
    this.checkboxCounter = 0;

    this.phases.forEach(phase => {
      phase.is_completed = false;
    });

    this.phases[2].is_completed = true;
    this.phases[5].is_completed = true;


    this.phases[6].is_completed = false;

    for(var j=0;j<8;j++)
      this.stepper4.previous();

    const formData = new FormData();
    formData.append('file', this.uploadForm.get('profile')!.value);
    formData.append('username', this.username);

    // this.http.post(this.url, formData).subscribe(
    //   (res) => console.log(res),
    //   (err) => console.log(err)
    // );

    this.http.post(this.urlForCSV, formData).subscribe((result:any) => {
      console.log(result.length);
      console.log(result.filename);
      console.log(result.headers);
      console.log(result.data);
      
      this.filename = result.filename;
      this.lines[0] = result.headers;
      this.linesR[0] = result.data;

      this.totalLength = this.linesR[0].length;

      if(this.totalLength>0)
          this.phases[0].is_completed = true;

        this.checkboxStates = new Array(this.lines[0].length)

        for(let i=0;i<this.lines[0].length;i++)
          this.checkboxStates[i] = 1
        
        this.checkboxStates[this.lines[0].length - 1] = -1;
        this.radioState = this.lines[0].length - 1;

        this.checkboxCounter = this.lines[0].length - 1;

        console.log(this.checkboxStates);

        this.sortedData.push(this.linesR[0]);

        var isClassificaion = false;

        for(var i = 0 ; i< this.linesR[0].length; i++){
          var array = this.linesR[0][i];

          if(isNaN(parseFloat((array[this.lines[0].length - 1])))){
            isClassificaion = true;
            break;
          }
        }

        if(isClassificaion)
          this.problem_type = ProblemType.classification;
        else
          this.problem_type = ProblemType.regression;


          for(var i = 0 ; i< this.lines[0].length; i++){

            isClassificaion = false
            
            for(var j = 0 ; j< this.linesR[0].length; j++){
    
              if(isNaN(parseFloat((this.linesR[0][j][i]))) && this.linesR[0][j][i]!= ""){

                console.log("--------------")
                console.log(this.lines[0][i])
                console.log(this.linesR[0][j][i])

                isClassificaion = true;
                break;
              }
            }
    
            if(isClassificaion == true){
              this.dataTypes.push(DataType.Categorical)
              this.trueClass.push(true)
            }
            else{
              this.dataTypes.push(DataType.Numeric)
              this.trueClass.push(false)
            }
          }


        

        //console.log(this.lines[0].length)


        this.minSelect(true);
        this.maxSelect(true);
        this.averageSelect(true);
        this.NaNSelect(true);
        this.medianSelect(true);
        this.corrMatrix();

        this.getAllFiles();

        this.problem_name = this.filename.slice(0,-4);

        for(let i=0;i<this.lines[0].length;i++){
          this.classRegressArray.push(this.checkRegOrClass(i))
        }

        this.lines[0].forEach(element => {
          this.replaceMissing.push(ReplaceMissing[0]);
        });

    });

  }

  sendReplaceMissing : ReplaceMissing[];



  saveProblem(){

    if(this.username != null)
      var username = this.username
    else
      var username = "_null"

    this.sendReplaceMissing = []
    this.replaceMissing.forEach(element => {
      if(element == "Delete")
        this.sendReplaceMissing.push(ReplaceMissing.Delete)
      else 
        if(element == "Minimum")
          this.sendReplaceMissing.push(ReplaceMissing.Minimum)
        else 
          if(element == "Maximum")
            this.sendReplaceMissing.push(ReplaceMissing.Maximum)
          else 
            if(element == "Average")
              this.sendReplaceMissing.push(ReplaceMissing.Average)
            else 
              if(element == "Median")
                this.sendReplaceMissing.push(ReplaceMissing.Median)
              else 
                if(element == "TheRarestValue")
                  this.sendReplaceMissing.push(ReplaceMissing.TheRarestValue)
                else 
                  if(element == "MostCommonValue")
                    this.sendReplaceMissing.push(ReplaceMissing.MostCommonValue)
    });
    

    var saveProblem = {
      filename : this.filename,
      headers : this.lines[0],
      data : this.linesR[0],
      outlier_type : this.outlier_type,
      replace_missing : this.sendReplaceMissing,
      username : username,
      problem_name : this.problem_name,
      data_cleaning : this.data_cleaning,

      data_types : this.dataTypes,

      statistics : this.numStat
    }

    console.log(saveProblem);

    this.toastr.info( "You will get notification problem is saved.");

    
    this.http.post(this.backendUrl + "/api/FileUpload/saveProblem", saveProblem).subscribe((result:any) => {
      console.log("(:");
      this.getAllFiles();
      this.toastr.success("Problem is successfully saved");

      this.stepper2.next();
    });
  }




  problemName : string;

  readProblem(i){

    var readProblem = {
      username : this.username,
      problemName : this.myProblems[i]
    }

    var I = i;
    this.phases[6].is_completed = true;
    this.phases[0].is_completed = false; 

    this.secondPhase = true;

    this.dataTypes = []
    this.encodeTypes = []
    this.trueClass = []

    for(var j=0;j<5;j++)
      this.stepper3.previous();

    this.http.post(this.backendUrl + "/api/FileUpload/readProblem", readProblem).subscribe((result:any) => {
      console.log("(:");
      console.log(result);

      console.log("Citanje uspesno");
      //ovo

      i = I;

      

      this.problemName = this.myProblems[i];
      this.model_name = this.problemName;
      this.filename = this.problemsCSV[i];

      this.lines[0] = result["headers"];
      this.linesR[0] = result["data"];
      this.totalLength = 0;

      this.checkboxStates = new Array(this.lines[0].length)

      for(let i=0;i<this.lines[0].length;i++)
        this.checkboxStates[i] = 1

      this.checkboxStates[this.lines[0].length - 1] = -1;
      this.radioState = this.lines[0].length - 1;
      this.checkboxCounter = this.lines[0].length - 1;

      var isClassificaion = false;

      this.corrMatrix();
      
      for(var i = 0 ; i< this.linesR[0].length; i++){
        var array = this.linesR[0][i];

        if(isNaN(parseFloat((array[this.lines[0].length - 1])))){
          isClassificaion = true;
          break;
        }
      }
      

      if(isClassificaion)
        this.problem_type = ProblemType.classification;
      else
        this.problem_type = ProblemType.regression;

      console.log("----------")
      console.log(result["data_types"])
      
      for(var i = 0 ; i< this.lines[0].length; i++){

        isClassificaion = false
        this.encodeTypes.push(EncodeType.LabelEncoding)
        

        if(result["data_types"][i] == "1"){
          this.dataTypes.push(DataType.Categorical)
        }
        else{
          this.dataTypes.push(DataType.Numeric)
        }
        
        // for(var j = 0 ; j< this.linesR[0].length; j++){

        //   if(isNaN(parseFloat((this.linesR[0][j][i])))){
        //     isClassificaion = true;
        //     break;
        //   }
        // }

        // if(isClassificaion == true){
        //   this.dataTypes.push(DataType.Categorical)
        //   this.trueClass.push(true)
        // }
        // else{
        //   this.dataTypes.push(DataType.Numeric)
        //   this.trueClass.push(false)
        // }
      }

      // this.dataTypes = result["dataTypes"];
      
    


        this.stepper4.next()


        console.log(this.dataTypes)

      });

      
  }

  test123(){
    console.log(this.dataTypes)
  }


  deleteProblem(i){
    var readProblem = {
      username : this.username,
      problemName : this.myProblems[i]
    }

    this.http.post(this.backendUrl + "/api/DataTransfer/deleteProblem", readProblem).subscribe((result:any) => {
      console.log("(:");
      console.log(result);
      
      this.getAllFiles();
    })
  }


  /*

    this.filename = "";
    this.lines[0] = result.headers;
    this.totalLength = this.linesR[0].length;

    this.checkboxStates = new Array(this.lines[0].length)

    for(let i=0;i<this.lines[0].length;i++)
          this.checkboxStates[i] = 1

    this.checkboxStates[this.lines[0].length - 1] = -1;
    this.radioState = this.lines[0].length - 1;
    this.checkboxCounter = this.lines[0].length - 1;

    var isClassificaion = false;

    for(var i = 0 ; i< this.linesR[0].length; i++){
      var array = this.linesR[0][i];

      if(isNaN(parseFloat((array[this.lines[0].length - 1])))){
        isClassificaion = true;
        break;
      }
    }

    if(isClassificaion)
      this.problem_type = ProblemType.classification;
    else
      this.problem_type = ProblemType.regression;


  */




  // showTable()
  // {
  //   var showTable = {
  //     pageIndex : this.page - 1,
  //     linesPerPage : this.pageSize
  //   }

  //   this.http.post(this.backendUrl + "/api/FileUpload/showTable", showTable).subscribe((result:any) => {
  //     console.log(result.filename);
  //     console.log(result.headers);
  //     console.log(result.data);
  //   })
  // }

//                                      _ 
//   ___ _____   __  _ __ ___  __ _  __| |
//  / __/ __\ \ / / | '__/ _ \/ _` |/ _` |
// | (__\__ \\ V /  | | |  __/ (_| | (_| |
//  \___|___/ \_/   |_|  \___|\__,_|\__,_|
                                       
  changeListener(files : Event) {

    this.lines = [];
    this.linesR = [];
    this.sortedData = [];

    this.totalLength = -1;
    this.page = 1;
    this.pageSize = 10;
    this.selectedMetric = 0;

    this.phases.forEach(phase => {
      phase.is_completed = false;
    });

    let fileList = (<HTMLInputElement>files.target).files;
    if (fileList && fileList.length > 0) {
      let file: File = fileList[0];
      this.filename = file.name;

      let reader: FileReader = new FileReader();
      reader.readAsText(file);
      reader.onload = e => {
        let csv: any = reader.result;
        let allTextLines = [];
        allTextLines = csv.split(/\r|\n|\r/);

        let headers = allTextLines[0].split(/,(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)/);
        let data = headers;
        let tarr = [];
        for (let j = 0; j < headers.length; j++) {
          tarr.push(data[j]);
        }

        this.lines.push(tarr);

        let tarrR = [];
        let arrl = allTextLines.length;
        let rows = [];
        for (let i = 1; i < arrl; i++) {
          rows.push(allTextLines[i].split(/,(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)/));
        }
        for (let j = 0; j < arrl; j++) {

          if(rows[j] && rows[j].length == 1 && rows[j][0] == ''){
          }
          else{
            tarrR.push(rows[j]);
          }
        }
        let removed = tarrR.pop();
        this.linesR.push(tarrR);

        this.sortedData.push(tarrR);
        this.totalLength = this.linesR[0].length;

        if(this.totalLength>0)
          this.phases[0].is_completed = true;

        this.checkboxStates = new Array(this.lines[0].length)

        for(let i=0;i<this.lines[0].length;i++)
          this.checkboxStates[i] = -1
        
        this.radioState = -1;

        console.log(this.checkboxStates);
      };
    }
  }

//   __  __   _ _____ ___ _____  __
//  |  \/  | /_\_   _| _ \_ _\ \/ /
//  | |\/| |/ _ \| | |   /| | >  < 
//  |_|  |_/_/ \_\_| |_|_\___/_/\_\

corrMatrix()
{

  console.log(this.filename);

  this.corrMat = [];

  var data =  {
    filename : this.filename,
    headers : this.lines[0],
    data : this.linesR[0]
  }

  this.http.post(this.backendUrl + "/api/DataTransfer/corrMatrix",data).subscribe((result:any) => {
    this.corrMat = result[0];
    this.numStat = result[1][0];
    this.catStat = result[1][1];

  });

}




stringToNum(item: number)
{
  return Number(item);
}

//                  _   
//   ___  ___  _ __| |_ 
//  / __|/ _ \| '__| __|
//  \__ \ (_) | |  | |_ 
//  |___/\___/|_|   \__|                   

  sortData(sort : Sort){

    var data = this.linesR[0].slice();

    if(!sort.active || sort.direction === ''){
      this.linesR = this.sortedData.slice();
      return;
    }

    this.linesR[0] = data.sort((a:Array<any>, b:Array<any>) => {

      const isAsc = sort.direction === 'asc';

      for (let i = 0;i<this.lines[0].length;i++){

        if(sort.active == this.lines[0][i]){

          if(Number(a[i]) && Number(b[i]))
            return this.compare(Number(a[i]), Number(b[i]), isAsc);
          
          return this.compare(a[i], b[i], isAsc);
        }
      }
      return 0;
    });
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }


//      _ _       _                 
//   __| (_) __ _| | ___   __ _ ___ 
//  / _` | |/ _` | |/ _ \ / _` / __|
// | (_| | | (_| | | (_) | (_| \__ \
//  \__,_|_|\__,_|_|\___/ \__, |___/
//                        |___/     

  editValue(){
    this.dialog.open(EditDialogComponent, {
      panelClass: 'warning-dialog',
      height: '400px',
      width: '600px',
    });
  }

  openEncoders(){
    this.dialog.open(EncoderHelpComponent, {
      panelClass: 'warning-dialog',
      backdropClass: 'backdropBackground'
    });
  }

  openActivations(){
    this.dialog.open(ActivationFunctionHelpComponent, {
      panelClass: 'warning-dialog',
      backdropClass: 'backdropBackground'
    });
  }

  openOutliers(){
    this.dialog.open(OutlierHelpComponent, {
      panelClass: 'warning-dialog',
      backdropClass: 'backdropBackground'
    });
  }

  openProblemType(){
    this.dialog.open(ProblemTypeHelpComponent, {
      panelClass: 'warning-dialog',
      backdropClass: 'backdropBackground'
    });
  }

  openOptimizerType(){
    this.dialog.open(OptimizerTypeHelpComponent, {
      panelClass: 'warning-dialog',
      backdropClass: 'backdropBackground'
    });
  }

  openLossType(){
    this.dialog.open(LossTypeHelpComponent, {
      panelClass: 'warning-dialog',
      backdropClass: 'backdropBackground'
    });
  }
  openLearningRate(){
    this.dialog.open(LearningRateHelpComponent, {
      panelClass: 'warning-dialog',
      backdropClass: 'backdropBackground'
    });
  }

  openEpoche(){
    this.dialog.open(EpocheHelpComponent, {
      panelClass: 'warning-dialog',
      backdropClass: 'backdropBackground'
    });
  }

  openTestPercentage(){
    this.dialog.open(TestPercentageHelpComponent, {
      panelClass: 'warning-dialog',
      backdropClass: 'backdropBackground'
    });
  }  

  openRegularization(){
    this.dialog.open(RegularizsationHelpComponent, {
      panelClass: 'warning-dialog',
      backdropClass: 'backdropBackground'
    });
  }  

  openDataCleaning(){
    this.dialog.open(DataCleaningHelpComponent, {
      panelClass: 'warning-dialog',
      backdropClass: 'backdropBackground'
    });
  } 

  openRegularizationRate(){
    this.dialog.open(RegularizationRateHelpComponent, {
      panelClass: 'warning-dialog',
      backdropClass: 'backdropBackground'
    });
  }  

  openDialog(i:number, j:number): void {

    var old_value = this.linesR[0][i + this.pageSize*(this.page - 1)][j];
    let dialogRef = this.dialog.open(EditDialogComponent, {data: {values: this.linesR, headers: this.lines, i:i + this.pageSize*(this.page - 1), j:j} , backdropClass: 'backdropBackground'});

    dialogRef.afterClosed().subscribe(result => {
      if(result=="true"){
        console.log(true);

        var changeCell = {
          i: i + this.pageSize*(this.page - 1),
          j: j,
          value: this.linesR[0][i + this.pageSize*(this.page - 1)][j]
        }

        this.NaNSelect(true);

        this.http.post(this.urlChangeValue, changeCell).subscribe((result:any) => {
          console.log(result.inputs);
        });
      }
      else
        this.linesR[0][i + this.pageSize*(this.page - 1)][j] = old_value;
    })

    this.NaNSelect(true);
  }

//                                                          _   _                           
//   _ __   ___ _   _ _ __ ___  _ __  ___    __ _ _ __   __| | | | __ _ _   _  ___ _ __ ___ 
//  | '_ \ / _ \ | | | '__/ _ \| '_ \/ __|  / _` | '_ \ / _` | | |/ _` | | | |/ _ \ '__/ __|
//  | | | |  __/ |_| | | | (_) | | | \__ \ | (_| | | | | (_| | | | (_| | |_| |  __/ |  \__ \
//  |_| |_|\___|\__,_|_|  \___/|_| |_|___/  \__,_|_| |_|\__,_| |_|\__,_|\__, |\___|_|  |___/
//                                                                      |___/               

  addNeuron(val : any)
  {
    if(this.neuronArray[val] >= 1 && this.neuronArray[val] < 8)
      this.neuronArray[val]++;
    
  }

  removeNeuron(val : any)
  {
    if(this.neuronArray[val] >= 1 && (this.neuronArray[val] - 1) != 0)
      this.neuronArray[val]--;
  }

  addHiddenLayer(val: any)
  {
    console.log(val);
    if(this.hiddenLayerCounter >= 0 && this.hiddenLayerCounter < 6)
    {
      this.hiddenLayerCounter++;
      this.hiddenLayerArray.push();
    }
    
    if(this.hiddenLayerCounter > 1)
      this.hiddenLayerText = "Hidden layers";

    for(let i = this.hiddenLayerCounter; i < 6; i++)
      this.neuronArray[i] = 1;

  }

  removeHiddenLayer(val: any)
  {
    if(this.hiddenLayerCounter > 0)
    {
      this.hiddenLayerCounter--;
      this.hiddenLayerArray.pop();
    }

    if(this.hiddenLayerCounter <= 1)
      this.hiddenLayerText = "Hidden layer";
    else
      this.hiddenLayerText = "Hidden layers";

    for(let i = this.hiddenLayerCounter; i < 6; i++)
      this.neuronArray[i] = 1;
  }


//             _                                                                                          _ _             
//   _ __ ___ (_)_ __    _ __ ___   __ ___  __   __ ___   _____ _ __ __ _  __ _  ___   _ __ ___   ___  __| (_) __ _ _ __  
//  | '_ ` _ \| | '_ \  | '_ ` _ \ / _` \ \/ /  / _` \ \ / / _ \ '__/ _` |/ _` |/ _ \ | '_ ` _ \ / _ \/ _` | |/ _` | '_ \ 
//  | | | | | | | | | | | | | | | | (_| |>  <  | (_| |\ V /  __/ | | (_| | (_| |  __/ | | | | | |  __/ (_| | | (_| | | | |
//  |_| |_| |_|_|_| |_| |_| |_| |_|\__,_/_/\_\  \__,_| \_/ \___|_|  \__,_|\__, |\___| |_| |_| |_|\___|\__,_|_|\__,_|_| |_|
//                                                                         |___/         





minSelect(val : any){
  var minArray = [];
  this.minArray = [];

  this.metricArray = [];

  for (let i = 0; i < this.lines[0].length; i++)
  {
    for (let j = 0; j < this.linesR[0].length; j++)
      minArray.push(this.linesR[0][j][i]);
    
    var min = minArray[0];
    
    for(let k = 0; k < minArray.length; k++)
      if(min > parseFloat(minArray[k]))
        min = minArray[k];

    if(isNaN(parseFloat(min)))
        min = "-";
    
    this.metricArray.push(min);

    this.minArray.push(min);

    minArray = [];
  }

  this.showMetricTable = true;
}

maxSelect(val : any){
  var maxArray = [];
  this.maxArray = [];

  this.metricArray = [];

  for (let i = 0; i < this.lines[0].length; i++)
  {
    for (let j = 0; j < this.linesR[0].length; j++)
      maxArray.push(this.linesR[0][j][i]);

    var max = maxArray[0];
    
    for(let k = 0; k < maxArray.length; k++)
      if(max < parseFloat(maxArray[k]))
        max = maxArray[k];

    if(isNaN(parseFloat(max)))
      max = "-";

    this.metricArray.push(max);
    this.maxArray.push(max);

    maxArray = [];
  }

  this.showMetricTable = true;
}

medianSelect(val : any){
  var medianArray = [];
  this.medianArray = [];

  this.metricArray = [];

  for (let i = 0; i < this.lines[0].length; i++)
  {
    for (let j = 0; j < this.linesR[0].length; j++)
      medianArray.push(Number(this.linesR[0][j][i]));

    if(isNaN(median(medianArray))){
      this.metricArray.push("-");
      this.medianArray.push("-");
    }
    else{
      this.metricArray.push(median(medianArray));
      this.medianArray.push(median(medianArray));
    }

    medianArray = [];
  }

  this.showMetricTable = true;
}

averageSelect(val : any){
  var avgArray = [];
  this.avgArray = [];

  this.metricArray = [];

  for (let i = 0; i < this.lines[0].length; i++)
  {
    for (let j = 0; j < this.linesR[0].length; j++)
      avgArray.push(this.linesR[0][j][i]);

    var sum = Number(avgArray[0]);
    
    for(let k = 1; k < avgArray.length; k++)
      sum += Number(avgArray[k]);

    if(isNaN(sum)){
      this.metricArray.push("-");
      this.avgArray.push("-");
    }
    else{
      this.metricArray.push((Math.round(((sum/avgArray.length) + Number.EPSILON) * 100) / 100));
      this.avgArray.push((Math.round(((sum/avgArray.length) + Number.EPSILON) * 100) / 100));
    }
    avgArray = [];
  }

  this.showMetricTable = true;
}

missingBool: Boolean = false;

NaNSelect(val : any)
{
  var NaNArray = [];
  this.nanArray = [];
  this.missingBool = false;

  this.metricArray = [];

  for (let i = 0; i < this.lines[0].length; i++)
  {
    var counter = 0;

    for (let j = 0; j < this.linesR[0].length; j++)
      NaNArray.push(this.linesR[0][j][i]);
    
    // console.log(NaNArray);
    // console.log("---------------------------------------------------------");

    for(let k = 0; k < NaNArray.length; k++)
      if(NaNArray[k] === "")
        counter++;
        
    NaNArray = [];

    if(counter>0)
      this.missingBool=true;

    this.metricArray.push(counter);
    this.nanArray.push(counter);
  }

  this.showMetricTable = true;
}



  returnSelectedMetric(val : any){
    if(val == 0)
      this.chooseAnOption(val);
    if(val == 1)
      this.minSelect(val);
    else if(val == 2)
      this.maxSelect(val);
    else if(val == 3)
      this.medianSelect(val);
    else if(val == 4)
      this.averageSelect(val);
    else if(val == 5)
      this.NaNSelect(val);
  }

  chooseAnOption(val : any){
    this.showMetricTable = false;
  }

  /*

  minSelect(val : any){

    this.metricArray = [];

    this.http.post(this.backendUrl + "/api/FileUpload/Minimum",null).subscribe((result:any) => {

      this.metricArray = result.data;
    })

    this.showMetricTable = true;
  }

  maxSelect(val : any){
    this.metricArray = [];

    this.http.post(this.backendUrl + "/api/FileUpload/Maximum",null).subscribe((result:any) => {

      this.metricArray = result.data;
    })

    this.showMetricTable = true;
  }

  medianSelect(val : any){
    this.metricArray = [];

    this.http.post(this.backendUrl + "/api/FileUpload/Median",null).subscribe((result:any) => {

      this.metricArray = result.data;
    })

    this.showMetricTable = true;
  }

  averageSelect(val : any){
    this.metricArray = [];

    this.http.post(this.backendUrl + "/api/FileUpload/Average",null).subscribe((result:any) => {

      this.metricArray = result.data;
    })

    this.showMetricTable = true;
  }

  NaNSelect(val : any)
  {
    this.metricArray = [];

    this.http.post(this.backendUrl + "/api/FileUpload/NaN",null).subscribe((result:any) => {

      this.metricArray = result.data;
    })

    this.showMetricTable = true;
  }

  */

//                   _ _                   _                                 
//   ___  _ __   ___| (_)_ __   ___    ___| |__   __ _ _ __   __ _  ___  ___ 
//  / _ \| '_ \ / _ \ | | '_ \ / _ \  / __| '_ \ / _` | '_ \ / _` |/ _ \/ __|
// | (_) | | | |  __/ | | | | |  __/ | (__| | | | (_| | | | | (_| |  __/\__ \
//  \___/|_| |_|\___|_|_|_| |_|\___|  \___|_| |_|\__,_|_| |_|\__, |\___||___/
//                                                           |___/           

  changeTrainTestRatio(val : number){
    this.train_test_ratio = val;
    console.log(this.train_test_ratio);
  }


  train_validation_ratio = 25;

  changeTrainValidationRatio(val : number){
    this.train_validation_ratio = val;
    console.log(this.train_validation_ratio);
  }



  changeRowsNumber(newValue:number) {
    this.pageSize = newValue;
    this.page = 1;
  }

  changeActivation(val: ActivationType){
    this.activation_type = val;
  }

  changeLearningRate(val: number){
    this.learning_rate = val;
  }

  changeRegularization(val: RegularizationType){
    this.regularization_type = val;
  }

  changeRegularizationRate(val: number){
    this.regularization_rate = val;
  }

  changeProblemType(val: ProblemType){
    this.problem_type = val;
  }

  changeLoss(val: LossType){
    this.loss_type = val;
  }
  
  changeOptimizer(val: OptimizerType){
    this.optimizer_type = val;
  }

  changeEncode(val: EncodeType){
    this.encode_type = val;
  }

  changeEncodeType(val: EncodeType, i:number){
    this.encodeTypes[i] = val;
  }

  changeOutlier(val: OutlierType){
    this.outlier_type = val.valueOf();
  }

  changeDataType(val: DataType, i: number){

    if(this.dataTypes[i] == DataType.Categorical)
      this.dataTypes[i] = DataType.Numeric
    else
      this.dataTypes[i] = DataType.Categorical

      this.replaceMissing[i] = "Delete";
  }

  changeDataCleaning(val: DataCleaning){
    this.data_cleaning = val.valueOf();
  }

  changeReplaceNumber(val: ReplaceNumber){
    this.replace_number_type = val;
  }

  changeEpoch(val: number){
    this.epoch = val;
  }

  changeReplaceCat(val: ReplaceCat){
    this.replace_cat_type = val;
  }

  changeReplaceMissing(val: string, i:number, category: string){
    this.replaceMissing[i] = val;

    if(category=="numeric"){
      if(val == 'Delete')
        this.replaceMissing[i] = 'Delete'
      else if(val == "Minimum")
        this.replaceMissing[i] = "Minimum"
      else if(val == "Maximum")
        this.replaceMissing[i] = "Maximum"
      else if(val == "Average")
        this.replaceMissing[i] = "Average"
      else if(val == "Median")
        this.replaceMissing[i] = "Median"    
      }
    else{
      if(val == "Delete")
        this.replaceMissing[i] = "Delete"
      else if(val == "MostCommonValue")
        this.replaceMissing[i] = "MostCommonValue"
      else if(val == "TheRarestValue")
        this.replaceMissing[i] = "TheRarestValue"
    }

    console.log(i);
    console.log(category);
    console.log(val);
    
  }



  deleteBC(val: any)
  {
    this.replace_number_type = ReplaceNumber.Delete;
    this.showMetrics = false;
  }

  changeBC(val: any)
  {
    this.showMetrics = true;
  }

  changeCatVal(val: any)
  {
    this.showCatMetrics = true;
  }
  
  deleteCatVal(val: any)
  {
    this.showCatMetrics = false;
  }

  regularizationRateYes(val : any)
  {
    this.showRegRateInput = true;

    this.regularization_rate = this.regularization_rate*-1;

    if(this.regularization_rate<0)
      this.regularization_rate = this.regularization_rate*-1;
  }

  regularizationRateNo(val : any)
  {
    this.showRegRateInput = false;
    this.regularization_rate = this.regularization_rate*-1;
  }

  checkboxChange(i){

    if(this.checkboxStates[i] == -1)
      this.checkboxCounter++;
    else
      this.checkboxCounter--;

    this.checkboxStates[i] = this.checkboxStates[i]*(-1);

    this.checkInputPhase();
  }

  /*

      var isClassificaion = false;

        for(var i = 0 ; i< this.linesR[0].length; i++){
          var array = this.linesR[0][i];

          if(isNaN(parseFloat((array[this.lines[0].length - 1])))){
            isClassificaion = true;
            break;
          }
        }

        if(isClassificaion)
          this.problem_type = ProblemType.classification;
        else
          this.problem_type = ProblemType.regression;

  */

  checkRegOrClass(value: number){
    var isClassificaion = false;

    for(var i = 0 ; i< this.linesR[0].length; i++){
      var array = this.linesR[0][i];

      if(array[value] != "" && isNaN(parseFloat((array[value])))){
        isClassificaion = true;
        break;
      }
    }

    if(isClassificaion)
      return true
    else
      return false
  }

  radioChange(j){
    this.radioState = j;
    console.log(this.radioState);



    /*
    var isClassificaion = false;

    for(var i = 0 ; i< this.linesR[0].length; i++){
      var array = this.linesR[0][i];

      if(isNaN(parseFloat((array[this.radioState])))){
        isClassificaion = true;
        break;
      }
    }

    if(isClassificaion)
      this.problem_type = ProblemType.classification;
    else
      this.problem_type = ProblemType.regression;
    */

    if(this.dataTypes[j] == DataType.Categorical)
      this.problem_type = ProblemType.classification;
    else
      this.problem_type = ProblemType.regression;

    this.checkInputPhase();
  }

  checkboxDisabled(i){
    if(this.radioState==i)
      return true;
    return null;
  }

  checkboxStateFunction(i){
    if(this.checkboxStates[i] == 1)
      return true;
    return false;
  }

  radioDisabled(i){
    if(this.checkboxStates[i]>0)
      return true;
    return null;
  }

  radioStateFunction(i){
    if(this.radioState == i)
      return true;
    return false;
  }

  testVals(){
    console.log(this.radioState);
    console.log(this.checkboxStates);
    console.log(this.activation_type)
    console.log(this.loss_type)              
    console.log(this.optimizer_type)               
    console.log(this.learning_rate)                
    console.log(this.regularization_type)              
    console.log(this.regularization_rate)                 
    console.log(this.problem_type)              
    console.log(this.epoch)               
    console.log(this.replace_number_type)                
    console.log(this.encode_type)  

    console.log("----------")

    console.log(this.hiddenLayerCounter)
    console.log(this.neuronArray)
    console.log(this.replace_number_type)
    console.log(this.outlier_type)

  }

  checkInputPhase(){

    if(this.radioState>=0 && this.checkboxCounter > 0)
      this.phases[2].is_completed = true;
    else
    this.phases[2].is_completed = false;
  }

  //  _                  
  // | | _____ _   _ ___ 
  // | |/ / _ \ | | / __|
  // |   <  __/ |_| \__ \
  // |_|\_\___|\__, |___/
  //           |___/     

  activationTypeKeys() : Array<string> {
    var keys = Object.keys(this.activationTypeValues);
    return keys.slice(keys.length / 2);
  }

  encodeTypeKeys() : Array<string> {
    var keys = Object.keys(this.encodeTypeValues);
    return keys.slice(keys.length / 2);
  }
  
  outlierTypeKeys() : Array<string> {
    var keys = Object.keys(this.outlierTypeValues);
    return keys.slice(keys.length / 2);
  }

  dataTypeKeys() : Array<string> {
    var keys = Object.keys(this.dataTypeValues);
    return keys.slice(keys.length / 2);
  }

  dataCleaningKeys() : Array<string> {
    var keys = Object.keys(this.dataCleaningValues);
    return keys.slice(keys.length / 2);
  }

  regularizationTypeKeys() : Array<string> {
    var keys = Object.keys(this.regularizationTypeValues);
    return keys.slice(keys.length / 2);
  }

  problemTypeKeys() : Array<string> {
    var keys = Object.keys(this.problemTypeValues);
    return keys.slice(keys.length / 2);
  }

  optimizerTypeKeys() : Array<string> {
    var keys = Object.keys(this.optimizerTypeValues);
    return keys.slice(keys.length / 2);
  }

  lossTypeKeys() : Array<string> {
    var keys = Object.keys(this.lossTypeValues);
    return keys.slice(keys.length / 2);
  }

  replaceNumberKeys() : Array<string> {
    var keys = Object.keys(this.replaceNumbers);
    return keys.slice(keys.length / 2);
  }

  replaceCatKeys() : Array<string> {
    var keys = Object.keys(this.replaceCat);
    return keys.slice(keys.length / 2);
  }



    
  public isChecked : boolean;
  checkValue(event: any){
    console.log(event)

    if(event == true)
      this.changeBC(true);
    else
      this.deleteBC(true)
  }

  public isCheckedRegresion: boolean;
  checkValueRegresion(event:any){
    console.log(event)

    if(event == true)
      this.regularizationRateYes(true)
    else
      this.regularizationRateNo(true);
  }



  public data1 : number[] = [];
  public data2 : number[] = [];


  problem_search : string = "";

  searchProblems(i){
    if(this.problem_search == "")
      return true;
    

    if((this.myProblems[i].indexOf(this.problem_search)>=0)||(this.problemsCSV[i].indexOf(this.problem_search)>=0))
      return true
    
    return false
  }

  
  

  sendJSONTest(){

    

    var data = {
      temp : "test123"
    }

    this.http.post(this.backendUrl + "/api/DataTransfer/chartData", data).subscribe((result:any) => {
      console.log("(:");

      this.data1 = result["data1"]
      this.data2 = result["data2"]

      console.log(this.data1)
      console.log(this.data2)

      this.signalRService.drawChart();
      this.signalRService.drawChartRegression();
    });
  }

  mainChart:Chart=null;
  metricChart1:Chart=null;
  metricChart2:Chart=null;
  metricChart3:Chart=null;


  // drawChart(){
  //   //var line_labels = Array.from({length: this.data1.length}, (_, i) => i + 1)
  //   var lineChartOptions: ChartConfiguration = {
  //     type: 'line',
  //     data: {
  //       labels: this.signalRService.labels,
  //       datasets: [{
  //         label: 'My First Line',
  //         data: this.signalRService.data1,
  //         fill: false,
  //         borderColor: 'rgba(255, 99, 132, 1)',
  //         tension: 0.1,
  //         borderWidth: 1
  //       },
  //       {
  //         label: 'My Second Line',
  //         data: this.signalRService.data2,
  //         fill: false,
  //         borderColor: 'rgba(123, 99, 254, 1)',
  //         tension: 0.1,
  //         borderWidth: 1
  //       }
  //     ]
  //     },
  //     options: {
  //       scales: {
  //         y: {
  //           beginAtZero: false
  //         }
  //       }
  //     }
  //   }

  //   if(this.mainChart!=null)
  //     this.mainChart.destroy();
    
  //   this.mainChart = new Chart("main-chart", lineChartOptions);
  // }



  private _isCatChecked: boolean;

  public get isCatChecked(): boolean {
    return this._isCatChecked;
  }

  public set isCatChecked(value: boolean) {
    this._isCatChecked = value;
  }

  checkCatValue(event: any){
    console.log(event)

    if(event == true)
      this.changeCatVal(true);
    else
      this.deleteCatVal(true);
  }



}

export function median(pool: number[]): number {
  return pool[Math.floor((pool.length - 1) / 2)];
}

//  ___   _ __   _   _  _ __ ___  
// / _ \ | '_ \ | | | || '_ ` _ \ 
// | __/ | | | || |_| || | | | | |
// \___| |_| |_| \__,_||_| |_| |_|
//

export enum ActivationType{
  reLU,
  tanh,
  sigmoid,
  linear,
  softmax
}

export enum OptimizerType{
  Adam,
  SGD
}

export enum RegularizationType{
  none,
  L1,
  L2
}

export enum LossType{
  Binarycross,
  Categoricalcross,
  Mse
}

export enum ProblemType{
  classification,
  regression
}

export enum OutlierType{
  none,
  Svm,
  MinCovDet,
  LocOutFact,
  IsolationForest
}

export enum DataCleaning{
  Normalizer,
  Scaler
}

export enum EncodeType{
  OneHotEncoding,
  LabelEncoding
}

export enum ReplaceNumber{
  Delete,
  Minimum,
  Maximum,
  Average,
  Median,
}

export enum ReplaceCat{
  Delete,
  MostCommonValue,
  TheRarestValue
}

export enum ReplaceMissing{
  Delete,
  Minimum,
  Maximum,
  Average,
  Median,
  MostCommonValue,
  TheRarestValue 
}

export enum DataType{
  Numeric,
  Categorical
}




/*
BACKUP

onSubmit() {

    this.lines = [];
    this.linesR = [];
    this.sortedData = [];

    this.classRegressArray = [];
    this.replaceMissing = [];

    this.totalLength = -1;
    //this.page = 1;
    this.pageSize = 10;
    this.selectedMetric = 0;
    this.checkboxCounter = 0;

    this.phases.forEach(phase => {
      phase.is_completed = false;
    });

    this.phases[2].is_completed = true;
    this.phases[5].is_completed = true;

    const formData = new FormData();
    formData.append('file', this.uploadForm.get('profile')!.value);

    // this.http.post(this.url, formData).subscribe(
    //   (res) => console.log(res),
    //   (err) => console.log(err)
    // );

    this.http.post(this.urlForCSV, formData).subscribe((result:any) => {
      console.log(result.length);
      console.log(result.filename);
      console.log(result.headers);
      console.log(result.data);
      
      this.filename = result.filename;
      this.lines[0] = result.headers;
      this.linesR[0] = result.data;

      this.totalLength = this.linesR[0].length;

      if(this.totalLength>0)
          this.phases[0].is_completed = true;

        this.checkboxStates = new Array(this.lines[0].length)

        for(let i=0;i<this.lines[0].length;i++)
          this.checkboxStates[i] = 1
        
        this.checkboxStates[this.lines[0].length - 1] = -1;
        this.radioState = this.lines[0].length - 1;

        this.checkboxCounter = this.lines[0].length - 1;

        console.log(this.checkboxStates);

        this.sortedData.push(this.linesR[0]);

        var isClassificaion = false;

        for(var i = 0 ; i< this.linesR[0].length; i++){
          var array = this.linesR[0][i];

          if(isNaN(parseFloat((array[this.lines[0].length - 1])))){
            isClassificaion = true;
            break;
          }
        }

        if(isClassificaion)
          this.problem_type = ProblemType.classification;
        else
          this.problem_type = ProblemType.regression;

        //console.log(this.lines[0].length)


        this.minSelect(true);
        this.maxSelect(true);
        this.averageSelect(true);
        this.NaNSelect(true);
        this.medianSelect(true);

        this.getAllFiles();

        this.problem_name = this.filename.slice(0,-4);

        for(let i=0;i<this.lines[0].length;i++){
          this.classRegressArray.push(this.checkRegOrClass(i))
        }

        this.lines[0].forEach(element => {
          this.replaceMissing.push(ReplaceMissing[0]);
        });
    });
    
  }

  










  //EDIT


  {
    this.filename = "";
    this.lines = [];
    this.linesR = [];
    this.sortedData = [];
    this.classRegressArray = [];
    this.checkboxCounter = 0;
    this.replaceMissing = [];
    this.totalLength = -1;

    this.page = 1;
    this.pageSize = 10;
    this.selectedMetric = 0;

    this.phases.forEach(phase => {
      phase.is_completed = false;
    });
  }


  {
    this.filename = "";
    this.lines[0] = result.headers;
    this.totalLength = this.linesR[0].length;

    this.checkboxStates = new Array(this.lines[0].length)

    for(let i=0;i<this.lines[0].length;i++)
          this.checkboxStates[i] = 1

    this.checkboxStates[this.lines[0].length - 1] = -1;
    this.radioState = this.lines[0].length - 1;
    this.checkboxCounter = this.lines[0].length - 1;

    var isClassificaion = false;

    for(var i = 0 ; i< this.linesR[0].length; i++){
      var array = this.linesR[0][i];

      if(isNaN(parseFloat((array[this.lines[0].length - 1])))){
        isClassificaion = true;
        break;
      }
    }

    if(isClassificaion)
      this.problem_type = ProblemType.classification;
    else
      this.problem_type = ProblemType.regression;

  }



*/