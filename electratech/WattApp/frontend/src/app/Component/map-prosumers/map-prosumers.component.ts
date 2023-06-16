import { Component, Input, OnInit } from '@angular/core';
import { GetProsumerOnMap } from 'src/app/Models/getProsumerInfoDSO';
import { prosumerTableInfo } from 'src/app/Models/prosumerTableInfo';
import * as L from 'leaflet';
import { NumberOfSearchProsumers } from 'src/app/Services/API/DSO-API/DSO_Prosumer/dso.service';

@Component({
  selector: 'app-map-prosumers',
  templateUrl: './map-prosumers.component.html',
  styleUrls: ['./map-prosumers.component.css']
})
export class MapProsumersComponent implements OnInit {
  @Input() prosumers = [] as prosumerTableInfo[];
  @Input() consumerProducer !: string;
  @Input() minMax = {} as NumberOfSearchProsumers;
  red="";
  green="";
  blue="";

  markeri = new Array();
  markeriInfo = new Array();
  map!:any;

  constructor(){
  }

  ngOnInit(): void {
    this.draw();
  }
  count = 0;
  generateColor(current:number){
    if((this.min == 0 && this.max == 0) || (this.min == this.max)){
      return {red: 255, green:234, blue:0};
    }
    var val = (current - this.min) / (this.max-this.min);
    var r;
    var g;
    var b;
    if(this.consumerProducer == 'consumer')
    {
      if(val < 0.2 ){
        r = Math.round(255 * val * 2);
        g = 255;
        b = 0;
      }
      else{
        r = 255;
        g = Math.round(255 * (1 - (val - 0.2) * 2));
        b = 0;
      }
    }
    else{
      if(val < 0.1 ){
        r = 255;
        g =  Math.round(255 * val * 2);
        b = 0;
      }
      else{
        r = Math.round(255 * (1 - (val - 0.1) * 2));
        g = 255;
        b = 0;
      }
    }
    return {red: r, green: g, blue: b};
  }
  
  max!:number;
  min!:number;
  draw()
  {
    this.map = L.map('map-prosumers').setView([44.009089, 20.929984], 6.5);
    L.tileLayer('https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png?api_key=35ce6674-fed9-4b31-a210-40b92d8de0b1', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.map);
    if(this.prosumers.length > 0)
    {
      if(this.consumerProducer == 'consumer')
      {
        this.min = this.minMax.min;
        this.max = this.minMax.max;

        this.prosumers.forEach(element=>{
          var consumption = Number(element.consumption);
          var rgb = this.generateColor(consumption);
    
          var myIcon = L.divIcon({
            className: 'my-icon',
            html: '<i style="font-size: 30px;-webkit-text-stroke: 2px black; color:rgb('+rgb.red+','+rgb.green+','+rgb.blue+');"  class=" bi bi-lightning-fill"></i>'
          });
          var marker = L.marker([element.x, element.y], {icon:  myIcon }).addTo(this.map);
          this.markeri.push(marker);
          this.markeriInfo.push(element);
        });

      }
      else{
        this.max = Number(this.prosumers[0].product);
        this.min = Number(this.prosumers[this.prosumers.length -1].product);
        this.prosumers.forEach(element=>{
          var product = Number(element.product);
          var rgb = this.generateColor(product);
    
          var myIcon = L.divIcon({
            className: 'my-icon',
            html: '<i style="font-size: 30px;-webkit-text-stroke: 2px black; color:rgb('+rgb.red+','+rgb.green+','+rgb.blue+');"  class=" bi bi-lightning-fill"></i>'
          });
          var marker = L.marker([element.x, element.y], {icon:  myIcon }).addTo(this.map);
          this.markeri.push(marker);
          this.markeriInfo.push(element);
        });
      }    
    }
  
    this.drowPopUp();
  }

  drowPopUp(){
    if(this.consumerProducer == 'consumer')
    {
      for(let i=0;i<this.markeri.length;i++)
      {
        this.markeri[i].bindPopup(`<a href="/ProsumerPageDso/${this.markeriInfo[i].prosumerId}?prosumerId=${this.markeriInfo[i].prosumerId}"><b>`+this.markeriInfo[i].prosumerName+"</b></a> <br> Potrosnja "+this.markeriInfo[i].consumption+` kWh<br>` ).openPopup();
        let element = this.markeri[i];
        element.on('mouseover',function() {
          element.openPopup();
          });
      }
    }
    else{
      for(let i=0;i<this.markeri.length;i++)
      {
        this.markeri[i].bindPopup(`<a href="/ProsumerPageDso/${this.markeriInfo[i].prosumerId}?prosumerId=${this.markeriInfo[i].prosumerId}"><b>`+this.markeriInfo[i].prosumerName+"</b></a> <br> Proizvodnja "+this.markeriInfo[i].product+` kWh<br>` ).openPopup();
        let element = this.markeri[i];
        element.on('mouseover',function() {
          element.openPopup();
          });
      }
    }
    
  }
}

