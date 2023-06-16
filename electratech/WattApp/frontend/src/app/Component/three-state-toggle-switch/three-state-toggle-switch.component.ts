import { Component } from '@angular/core';


@Component({
  selector: 'app-three-state-toggle-switch',
  templateUrl: './three-state-toggle-switch.component.html',
  styleUrls: ['./three-state-toggle-switch.component.css']
})
export class ThreeStateToggleSwitchComponent {


  status: string = "";

  ngOnInit(): void {
    this.status = "neutral";
  }

  changeValue(statusPom: string) {
    this.status = statusPom;
  }
  

}
