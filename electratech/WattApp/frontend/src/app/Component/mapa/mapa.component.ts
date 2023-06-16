import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GetProsumerOnMap } from 'src/app/Models/getProsumerInfoDSO';

import { MapService } from 'src/app/Services/API/DSO-API/Map/map.service';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

declare const  L : any
interface Minimax{
  min:number,
  max:number
}
@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit
{
  red="";
  green="";
  blue="";

  r:any;
  userOnMap!:GetProsumerOnMap[];
  markeri = new Array();
  markeriInfo = new Array();
  map!:any;

  constructor(private mapService:MapService, private router:Router){}
  
  ngOnInit(){
    this.draw_map();
  }
  

  minMax = {} as Minimax;
  findMinMax(list:GetProsumerOnMap[]){
    var min = list[0].productioin;
    var max = list[0].consumption;
    list.forEach(element => {
      if(element.consumption > max)
        max = element.consumption;
      if (element.productioin < min)
        min = element.productioin;
    });
    this.minMax = {min:min, max:max};
  }
    // generateColor(current:number,productioin:number){
    //   var side = current - productioin;
    //   var val = (current - this.minMax.min) / (this.minMax.max-this.minMax.min);
    //   var r;
    //   var g;
    //   var b;
    //   if(val < 0.2 ){
    //     r = Math.round(255 * val * 2);
    //     g = 255;
    //     b = 0;
    //   }
    //   else{
    //     r = 255;
    //     g = Math.round(255 * (1 - (val - 0.2) * 2));
    //     b = 0;
    //   }
    //   return {red: r, green: g, blue: b};
    // }

  lerp(start: number[], end: number[], factor: number): number[] {
    return start.map((value, index) => {
      return value + (end[index] - value) * factor;
    });
  }

  generateColor(consumption:number, productioin:number){
    const min = this.minMax.min;
    const max = this.minMax.max;
    this.minMax.min = Math.abs(this.minMax.min);
    const yellow = [255, 255, 0];
    const red = [255, 0, 0];
    const green = [0, 255, 0];
    const middle = (max - min) / 2;

    let factor;
    let color;

    let value = consumption + productioin;

    if (value === 0) {
      color = yellow;
    } else {
      factor = Math.abs(value) / max;
      if (value < 0) {
        color = this.lerp(yellow, green, factor);
      } else {
        color = this.lerp(yellow, red, factor);
      }
    }
    return {red: color[0], green: color[1], blue: color[2]};
  }

  draw_map()
  {
    
    var response = this.mapService.getUsers()
    .subscribe(
     (response)=>{
      this.userOnMap = response as GetProsumerOnMap[];
      this.findMinMax(this.userOnMap);
      this.userOnMap.forEach(element => {
        // if(element.productioin < 1 && element.consumption > 0)
        //   var rgb = {red:255,green:0,blue:0};
        // else if(element.productioin > 0 && element.consumption < 1)
        //   var rgb = {red:0,green:255,blue:0};
        // else
        var rgb = this.generateColor(element.consumption,element.productioin);

        var myIcon = L.divIcon({
                    className: 'my-icon',
                    html: '<i style="font-size: 30px;-webkit-text-stroke: 2px black; color:rgb('+rgb.red+','+rgb.green+','+rgb.blue+');"  class=" bi bi-lightning-fill"></i>'
                  });
      var marker = L.marker([element.x, element.y], {icon:  myIcon }).addTo(this.map);
      this.markeri.push(marker);
      this.markeriInfo.push(element);
      }
    ); 
      this.drowPopUp();     
  });

    this.map = L.map('map').setView([44.009089, 20.929984], 6.5);
    L.tileLayer('https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png?api_key=35ce6674-fed9-4b31-a210-40b92d8de0b1', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.map);

  }

  drowPopUp(){

    for(let i=0;i<this.markeri.length;i++)
    {
      this.markeri[i].bindPopup(`<a style="cursor:pointer;" href="/ProsumerPageDso/${this.markeriInfo[i].prosumerId}?prosumerId=${this.markeriInfo[i].prosumerId}" ><b>`+this.markeriInfo[i].prosumerName+" "+this.markeriInfo[i].prosumerLastName +"</b></a> <br> Potrošnja "+this.markeriInfo[i].consumption+` W<br> Proizvodnja ${this.markeriInfo[i].productioin * (-1)} W` ).openPopup();
      this.markeri[i].bindClick
      let element = this.markeri[i];
      element.on('mouseover',function() {
        element.openPopup();
       });
    }
  }
}