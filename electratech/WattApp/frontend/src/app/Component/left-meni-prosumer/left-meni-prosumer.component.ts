import { Component, Input } from '@angular/core';
import {  faClockRotateLeft,faPlusSquare, faArrowLeft, faGear,faChartLine, faComputer } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-left-meni-prosumer',
  templateUrl: './left-meni-prosumer.component.html',
  styleUrls: ['./left-meni-prosumer.component.css']
})
export class LeftMeniProsumerComponent {

  faClockRotateLeft=faClockRotateLeft;
  faPlusSquare=faPlusSquare;
  faChartLine=faChartLine;
  faGear=faGear;
  faArrowLeft=faArrowLeft;
  faComputerMouse=faComputer;

  @Input()
  selected = "Pocetna";

  setSelected(selected:string){
    this.selected = selected;
    console.log(this.selected);
  }

  logOut(){
    window.open('http://localhost:4200/login','_self');
  }
}
