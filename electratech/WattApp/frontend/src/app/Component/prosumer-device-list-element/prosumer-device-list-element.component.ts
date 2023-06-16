import { Component, Input, NgModule,OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { faEdit,faCheck,faBan,faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { SetDeviceName } from 'src/app/Pages/Prosumer/my-device/my-device.component';
import { MyDeviceInterface } from 'src/app/Pages/Prosumer/my-devices/my-devices.component';
import { MyDevicesService } from 'src/app/Services/API/Prosumer-API/Device/my-devices.service';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { NgToggleComponent } from 'ng-toggle-button';

@Component({
  selector: 'app-prosumer-device-list-element',
  templateUrl: './prosumer-device-list-element.component.html',
  styleUrls: ['./prosumer-device-list-element.component.css']
})
export class ProsumerDeviceListElementComponent implements OnInit{
  @Input() info = {} as MyDeviceInterface;
  toggleLabels = {checked: 'ON', unchecked: 'OFF'};
  toggleColor ={checked: '#6E9C0C', unchecked: 'silver'};
  faEdit=faEdit;
  faCheck=faCheck;
  faBan=faBan;
  faArrowRight=faArrowRight;

  toggleStatus=false as boolean;

  constructor(private router: Router, private deviceService: MyDevicesService, private matDialog: MatDialog){
    
  }

  ngOnInit(): void {
    switch(this.info.status){
      case false:
        this.toggleStatus = false;
        break;
      default:
        this.toggleStatus = true;
    }
  }

  turnOnOffDevice(toggle: NgToggleComponent) {
    let dialogRef = this.matDialog.open(DialogBoxComponent, {
      data: {
        question: "Da li ste sigurni da želite da promenite status uredjaja: " + this.info.name +"?",
        answer: ""
      }
    });

    dialogRef.afterClosed().subscribe(
      result => {
        if (result.answer == "Yes") {
          this.deviceService.turnOnOff(this.info.linkerId).subscribe(
            res => console.log('HTTP response', res),
            err => console.log("status changed")
          )
        }
        else
          toggle.writeValue(!toggle.value);
      }
    )
  }
  
  goToUrl() {
    this.router.navigate(['MyDevice/' + this.info.deviceId.toString()]);
  }

  editTitle=false;
  setEditTitle(){
    switch(this.editTitle){
      case false:
        this.editTitle = true;
        break;
      case true:
        this.editTitle = false;
        break;
          
    }
  }

  changeTitle(title:string){
    if (this.info.name == title) {
      this.setEditTitle();
      return;
    }
      
    if(title.length>0) {
      var obj = {
        linkerId: this.info.linkerId,
        deviceName: title
      } as SetDeviceName
      this.deviceService.setDeviceName(obj).subscribe(
        response => console.log(response),
        error => console.log("name changed")
      );
      this.info.name=title;
    }
    this.setEditTitle();
  }

}
