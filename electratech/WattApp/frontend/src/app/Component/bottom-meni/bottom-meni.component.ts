import { Component, OnInit } from '@angular/core';
import {  faHome,faPlusSquare, faArrowLeft, faGear,faChartLine, faComputer } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bottom-meni',
  templateUrl: './bottom-meni.component.html',
  styleUrls: ['./bottom-meni.component.css']
})
export class BottomMeniComponent implements OnInit {
  faHome=faHome;
  faPlusSquare=faPlusSquare;
  faChartLine=faChartLine;
  faGear=faGear;
  faArrowLeft=faArrowLeft;
  faComputerMouse=faComputer;

  constructor(private router: Router){}

  ngOnInit(): void {
  }

  goToLink(url:string){
    this.router.navigate([url]);
    }
}
