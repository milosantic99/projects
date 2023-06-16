import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgToggleComponent } from 'ng-toggle-button';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { MyDeviceService, WorkRules } from 'src/app/Services/API/Prosumer-API/Device/my-device.service';
import { response } from 'express';
import { faL } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-work-rules',
  templateUrl: './work-rules.component.html',
  styleUrls: ['./work-rules.component.css']
})
export class WorkRulesComponent {

  @Input() linkerId!:number;
  toggleLabels = {checked: 'ON', unchecked: 'OFF'};
  toggleColor ={checked: '#6E9C0C', unchecked: 'silver'};

  work_rule = false;
  minDate:string;
  hours_0_next=[0,1,2,3,4,5,6,7,8,9];
  hours_1_next=[10,11,12,13,14,15,16,17,18,19,20,21,22,23];

  hours_0 = new Array<number>;
  hours_1 = new Array<number>;
  
  hours_0_same_date = new Array<number>;
  hours_1_same_date = new Array<number>;

  work_rule_def = {
    linkerId:this.linkerId,
    dateOn:'',
    dateOff:'',
    timeOn:0,
    timeOff:0
  } as WorkRules

  binding(infoWorkRules:WorkRules){
    this.work_rule = true;
    if(infoWorkRules.dateOn!=null){
      var dateOn = infoWorkRules.dateOn.split('T')[0];
      this.work_rule_def.dateOn = dateOn;
      this.work_rule_def.timeOn = infoWorkRules.timeOn;
    }
    if(infoWorkRules.dateOff!=null){
      var dateOff = infoWorkRules.dateOff.split('T')[0];
      this.work_rule_def.dateOff = dateOff;
      this.work_rule_def.timeOff = infoWorkRules.timeOff;
    }
    console.log(this.work_rule_def);
  }

  constructor(private matDialog: MatDialog, private deviceService: MyDeviceService){
    this.minDate = this.formatDate();
    this.setTime();
  }

  setTime(){
    var date = new Date();
    var hour: number = date.getHours();
    hour++;
    // console.log(hour);
    this.work_rule_def = {
      linkerId:this.linkerId,
      dateOn:'',
      dateOff:'',
      timeOn:hour,
      timeOff:hour
    }as WorkRules
    while(hour < 10){
      this.hours_0.push(hour);
      this.hours_0_same_date.push(hour);
      hour++;
    }
    while(hour < 24){
      this.hours_1.push(hour);
      this.hours_1_same_date.push(hour);
      hour++;
    }
  }

  errMessage=false;
  clearError(){
    this.errMessage = false;
    var date = new Date();
    var hour: number = +date.getHours();
    this.work_rule_def.timeOn = hour+1;
    this.work_rule_def.timeOff = hour+1;
    this.changeDateOff();
  }

  changeDateOff(){
    var dateOn
    if(this.work_rule_def.dateOn!=null)
      dateOn= this.work_rule_def.dateOn.split('-')[2];
    var dateOff;
    if(this.work_rule_def.dateOff!=null)
        dateOff = this.work_rule_def.dateOff.split('-')[2];
    if(dateOn!=null && dateOff!=null)
    {
      var dateOnNum: number = +dateOn;
      var dateOffNum: number = +dateOff;
      if(dateOnNum>dateOffNum){
        this.work_rule_def.dateOff = this.work_rule_def.dateOn;
        this.setHour_1();
      }
    }
  }
  
  setHour_1(){
    if(this.work_rule_def.dateOn==this.work_rule_def.dateOff)
    {
      var hour = this.work_rule_def.timeOn;

      this.hours_0_same_date = new Array<number>;
      this.hours_1_same_date = new Array<number>;
      if(hour != null)
      {
        while(hour < 10){
          this.hours_0_same_date.push(hour);
          hour++;
        }
        while(hour < 24){
          this.hours_1_same_date.push(hour);
          hour++;
        }
      }
      
    }
  }

  turnOnOffDevice(toggle: NgToggleComponent) {
    if(toggle.value == false)
    {
      var dialogRef = this.matDialog.open(DialogBoxComponent, {
        data: {
          question: "Da li ste sigurni da želite da otkažete pravila rada?",
          answer: ""
        }
      });

      dialogRef.afterClosed().subscribe(
        result=>{
          if(result.answer == "Yes"){
            this.deviceService.deletWorkRule(this.linkerId).subscribe(
              response=>{}
            )
          }
          else{
            this.work_rule = true;
            toggle.writeValue(!toggle.value);
          }
            
        }
      )

    }
    else{
      if(this.work_rule_def.dateOff != '' || this.work_rule_def.dateOn != '')
      {
        this.errMessage = false;
        var dialogRef = this.matDialog.open(DialogBoxComponent, {
          data: {
            question: "Da li ste sigurni da želite da definišete pravila rada?",
            answer: ""
          }
        });
        dialogRef.afterClosed().subscribe(
          result=>{
            if((result.answer == "Yes")){
              this.work_rule = true;
              this.work_rule_def.linkerId = this.linkerId;
              this.deviceService.setWorkRules(this.work_rule_def).subscribe(
                response=>{
                },
                error=>{
                },
                ()=>{}
              );
            }
            else
            {
              toggle.writeValue(!toggle.value);
              this.work_rule = false;
            }
              
          }
        )
      }
      else
      {
        this.errMessage = true;
        toggle.writeValue(!toggle.value);
        this.work_rule=false;
      }
      
    }
    
  }

  formatDate(){
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
