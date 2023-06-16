import { Component, OnInit } from '@angular/core';
import { SimpleCardComponent } from 'src/app/Component/simple-card/simple-card.component';
import { SimpleCardModel } from 'src/app/Models/SimpleCardModel';
import { WeatherModel } from 'src/app/Models/weather';
import { DsoChartsService } from 'src/app/Services/API/DSO-API/DSO_Charts/dso-charts.service';

@Component({
  selector: 'app-home-dso',
  templateUrl: './home-dso.component.html',
  styleUrls: ['./home-dso.component.css']
})
export class HomeDsoComponent implements OnInit {

  constructor(private dsoService : DsoChartsService){
    // this.getProducedLastWeek();
    // this.getConsumptedLastWeek();
    // this.getPredictedConsumptionForNextWeek();
    // this.getPredictedProductionForNextWeek();
    this.getSimpleCards();
  }

  isLoading : any = true;

  ngOnInit(): void {
    
  }

  simpleCard1 = {
    title: 'Proizvedeno',
    subtitle:'U prethodnih nedelju dana',
    value:'',
    arrow:'rotate--45'  //HARDCORE
  } as SimpleCardModel;

  simpleCard2 = {
    title: 'Potrošeno',
    subtitle:'U prethodnih nedelju dana',
    value:'',
    arrow:'rotate--45'  //HARDCORE
  } as SimpleCardModel;

  simpleCard3 = {
    title: 'Očekivana potrošnja',
    subtitle:'Za narednu nedelju',
    value:'',
    arrow:'rotate--45'  //HARDCORE
  } as SimpleCardModel;

  simpleCard4 = {
    title: 'Očekivana proizvodnja',
    subtitle:'U domoćinstvima za ovu nedelju',
    value:'',
    arrow:'rotate-45'  //HARDCORE
  } as SimpleCardModel;
  

  getSimpleCards(){
    var info = sessionStorage.getItem('AllInOne');
    if(info == null)
    {
      this.dsoService.getAllInOneSimpleCard().subscribe(
        response=>{
          this.simpleCard1.value = response[3].sum+" kWh";
          this.simpleCard2.value = response[2].sum+" kWh";
          this.simpleCard3.value = response[0].sum+" kWh";
          this.simpleCard4.value = response[1].sum+" kWh";

          var list = [this.simpleCard1,this.simpleCard2,this.simpleCard3,this.simpleCard4];
          sessionStorage.setItem('AllInOne',JSON.stringify(list));
          this.isLoading = false;
        }
      )
    }
    else{
      info = JSON.parse(info);
      if(typeof info === 'object' && info !==null ){
        this.simpleCard1 = info[0];
        this.simpleCard2 = info[1];
        this.simpleCard3 = info[2];
        this.simpleCard4 = info[3];
        this.isLoading = false;
      }
    }
  }

}
