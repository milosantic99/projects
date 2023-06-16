import { Component, Input } from '@angular/core';
import { NgToggleComponent } from 'ng-toggle-button';
import { MyDeviceInterface } from 'src/app/Pages/Prosumer/my-devices/my-devices.component';
import { MyDeviceService } from 'src/app/Services/API/Prosumer-API/Device/my-device.service';
import { DialogBoxComponent } from '../../dialog-box/dialog-box.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-prosumer-device-consumption-card',
  templateUrl: './prosumer-device-consumption-card.component.html',
  styleUrls: ['./prosumer-device-consumption-card.component.css']
})
export class ProsumerDeviceConsumptionCardComponent {
  @Input() info = {} as MyDeviceInterface;
  toggleColor ={checked: '#6E9C0C', unchecked: 'silver'};
  toggleLabels = {checked: 'ON', unchecked: 'OFF'};

  constructor(private deviceService: MyDeviceService, private matDialog: MatDialog, private router: Router) {}

  goToUrl(id: string) {
    this.router.navigate(['MyDevice/' + id]);
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
}
