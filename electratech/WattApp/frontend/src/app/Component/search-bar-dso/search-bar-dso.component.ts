import { Component, Input } from '@angular/core';
import { prosumerTableInfo, prosumerTableInfoForCsv } from 'src/app/Models/prosumerTableInfo';
import { DsoService } from 'src/app/Services/API/DSO-API/DSO_Prosumer/dso.service'; 
import { faSearch,faFileExport } from '@fortawesome/free-solid-svg-icons';

import { ngxCsv } from 'ngx-csv';

@Component({
  selector: 'app-search-bar-dso',
  templateUrl: './search-bar-dso.component.html',
  styleUrls: ['./search-bar-dso.component.css']
})
export class SearchBarDsoComponent {
  
  @Input() listForDownload = [] as prosumerTableInfo[];

  faSearch = faSearch;
  faFileExport=faFileExport;
  searchNameLastname: any;
  searchCity: any;

  list: prosumerTableInfo[] = [];

  dsoId : string = "b4ae7f72-c105-448a-97b2-62e0209b62f2"; //za potrebe testiranja

  constructor(private dsoService:DsoService){}

  // searchByNameLastname(){
  //   this.dsoService.searchProsumerByNameLastname(this.dsoId, this.searchNameLastname).subscribe(
  //     prosumers => {
  //       this.list = prosumers as prosumerTableInfo[];
  //     }
  //   );
  //   console.log(this.list);
  // }

  searchByName(name:string){
    // console.log("gadjaj");
    // this.dsoService
  }  

  callDownloadCsv(){}
  //   var correctListForDownload = [] as prosumerTableInfoForCsv[];
  //   this.listForDownload.forEach(element => {
  //     let obj = new prosumerTableInfoForCsv(
  //       element.prosumerName,
  //       element.city,
  //       element.consumption + " kWh",
  //       element.product + " kWh",
  //       element.debit,
  //       // element.turnedDevices,
  //       // element.allDevices,
  //       element.x,
  //       element.y
  //     )
  //     correctListForDownload.push(obj);
  //   });
  //   var date = new Date();
    
  //   var options = { 
  //     fieldSeparator: ',',
  //     quoteStrings: '"',
  //     decimalseparator: '.',
  //     showLabels: true, 
  //     showTitle: true,
  //     title: 'Izveštaj o potrošnji i proizvodnji' + date.getDate()+'/'+(Number(date.getMonth())+1)+'/'+date.getFullYear()+" "+date.getHours()+":"+date.getMinutes(),
  //     useBom: true,
  //     headers: ["Ime i prezime", "Adresa", "Potrošnja", "Proizvodnja","Zaduženja","Trenutno uključenih uredjaja","Ukupan broj uredjaja","Koordinate po x","Koordinate po y"]
  //   };
  //   new ngxCsv(correctListForDownload, ("Izvestaj " + date.getDate()+'/'+(Number(date.getMonth())+1)+'/'+date.getFullYear() +' '+date.getHours()+":"+date.getMinutes()),options);
  // }

}
