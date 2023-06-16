import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { prosumerTableInfo, prosumerTableInfoForCsv } from 'src/app/Models/prosumerTableInfo';
import { DsoService, NumberOfSearchProsumers } from 'src/app/Services/API/DSO-API/DSO_Prosumer/dso.service'; 

import { ngxCsv } from 'ngx-csv';
import {of} from 'rxjs';
import { debounceTime, max, switchMap } from 'rxjs/operators';
import { faSearch,faFileExport, faL } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-all-prosumers-table',
  templateUrl: './all-prosumers-table.component.html',
  styleUrls: ['./all-prosumers-table.component.css']
})

export class AllProsumersTableComponent implements OnInit {

  cities = ['Beograd','Bor','Valjevo','Vranje','Vršac','Zaječar','Zrenjanin','Jagodina','Kikinda','Kragujevac','Kraljevo','Kruševac','Leskovac','Loznica','Niš','Novi Pazar','Novi Sad','Pančevo','Pirot','Požarevac','Priština','Prokuplje','Smederevo','Sombor','Sremska Mitrovica','Subotica','Užice','Čačak','Šabac'];
  faFileExport=faFileExport;
  faSearch = faSearch;
  @ViewChild('MapProsumersComponent') MapProsumer:any;

  isLoading = true;
  isLoadingMap=true;

  displayedColumns: string[] = ['prosumer', 'adress', 'consumption', 'product', 'debit'];
  list!: prosumerTableInfo[];

  maxProsumersInTable!:number;
  maxPage = new Array<number>;
  maxNumPage !: number;

  pageSize: any = 10;
  page : any = 1;
  isEnabledBack : any = false;
  isEnabledNext : any = true;

  isConsumptionSelected : any = true;
  isProductionSelected : any = false;

  consumerProducer: string = "consumer";

  constructor(private dsoService:DsoService, private router:Router){}

  ngOnInit(): void {
    this.prosumerTableFill();
    this.getNumOfProsumer();
  }

  changeRowsNumber(newValue:number) {
    this.pageSize = newValue;
    this.page = 1;
    this.getNumOfProsumer();
  }


  searchName = '';
  searchNameInput = '';
  searchCity = '';
  searchCityInput !:string;

  callProsumerTableFill(page:number){
    this.page = page;

    if(page == 1 && this.maxNumPage != 1){
      this.isEnabledNext = true;
      this.isEnabledBack = false;
    }
    else if(this.maxNumPage == page && this.maxNumPage != 1)
    {
      this.isEnabledNext = false;
      this.isEnabledBack = true;
    }
    else if(this.maxNumPage > page && this.maxNumPage != 1){
      this.isEnabledNext = true;
      this.isEnabledBack = true;
    }

    this.prosumerTableFill();
  }
  callProsumerTableFillByCity(){
    this.page = 1;
    this.searchCity = this.searchCityInput;
    this.prosumerTableFill();
    this.getNumOfProsumer();
  }
  serchWithParameter(){
    this.searchName = this.searchNameInput;
    this.page = 1;
    this.prosumerTableFill();
    this.getNumOfProsumer();
  }
  allProsumers!:boolean;
  numOfProsumers!:boolean;
  prosumerTableFill(){
    this.isLoading = true;
    this.allProsumers = false;
    this.dsoService.getProsumersForTable(this.pageSize, this.page,this.searchName,this.searchCity,this.consumerProducer)
    .pipe(
      debounceTime(1),
      switchMap(response => {
        return of(response); // return the latest response
      })
    )
    .subscribe(
      response => {
        if(response.length > 0)
          this.list = response;
        else 
          this.list = [] as prosumerTableInfo[];
        if(this.numOfProsumers == true)
          this.isLoading = false;
        this.allProsumers = true;
      }
    );
  }

  minMax = {} as NumberOfSearchProsumers;
  getNumOfProsumer(){
    this.dsoService.getNumOfProsumerIntable(this.pageSize, this.page,this.searchName,this.searchCity,this.consumerProducer).subscribe(
      response=>{
        this.minMax = response;
        this.maxProsumersInTable = Number(response.maxNumOfProsumer);
        this.maxNumPage = Math.ceil(this.maxProsumersInTable / this.pageSize);
        this.createArray(this.maxNumPage);

        if(this.page == this.maxNumPage)  
          this.isEnabledNext  = false;
        else
          this.isEnabledNext = true;

        if(this.allProsumers == true)
          this.isLoading = false;
        this.numOfProsumers = true;
      }
    )
  }

  createArray(max:number){
    this.maxPage = new Array<number>;
    for(let i=1;i<=max;i++){
      this.maxPage.push(i);
    }
  }

  clearName(){
    this.searchNameInput = '';
    this.searchName = '';
    this.page = 1;
    this.prosumerTableFill();
    this.getNumOfProsumer();
  }

  clearCity(){
    this.searchCityInput = '';
    this.searchCity = '';
    this.page = 1;
    this.prosumerTableFill();
    this.getNumOfProsumer();
  }

  back(){
    if(this.page > 1){
      this.isLoading = true;
      this.page--;
      if(this.page != this.maxNumPage)
        this.isEnabledNext = true;
      this.isEnabledBack = true;
      if(this.page == 1)
        this.isEnabledBack=false;
      this.prosumerTableFill();
    }
    this.isEnabledBack = false;
  }

  next(){
      this.isLoading = true;
      this.page++;
      if(this.page == this.maxNumPage)
      {
        this.isEnabledNext = false;
        this.isEnabledBack = true;
      }
      else if (this.isEnabledNext == false)
        this.isEnabledNext = true;
      if(this.isEnabledBack == false)
        this.isEnabledBack = true;
      this.prosumerTableFill();
  }

  callDownloadCsv(){
    var correctListForDownload = [] as prosumerTableInfoForCsv[];
    this.list.forEach(element => {
      let obj = new prosumerTableInfoForCsv(
        element.prosumerName,
        element.city,
        element.adress,
        element.consumption + " kWh",
        element.product + " kWh",
        element.debit + " din.",
        element.x,
        element.y,
      )
      correctListForDownload.push(obj);
    });
    var date = new Date();
    
    var options = { 
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true, 
      showTitle: true,
      title: 'Izveštaj o potrošnji i proizvodnji' + date.getDate()+'/'+(Number(date.getMonth())+1)+'/'+date.getFullYear()+" "+date.getHours()+":"+date.getMinutes(),
      useBom: true,
      headers: ["Ime i prezime", "Grad","Adresa", "Potrošnja", "Proizvodnja","Zaduženja","Koordinate po x","Koordinate po y"]
    };
    new ngxCsv(correctListForDownload, ("Izvestaj " + date.getDate()+'/'+(Number(date.getMonth())+1)+'/'+date.getFullYear() +' '+date.getHours()+":"+date.getMinutes()),options);
  }

  sortConsumption(){
    this.isConsumptionSelected = true;
    this.isProductionSelected = false;
    this.consumerProducer = "consumer";
    this.page = 1;
    this.prosumerTableFill();
    this.getNumOfProsumer();
  }

  sortProduction(){
    this.isConsumptionSelected = false;
    this.isProductionSelected = true;
    this.consumerProducer = "producer";
    this.page = 1;
    this.prosumerTableFill();
    this.getNumOfProsumer();
  }

}