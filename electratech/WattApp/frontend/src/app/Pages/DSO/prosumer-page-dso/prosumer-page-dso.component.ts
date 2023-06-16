import { Component, OnInit } from '@angular/core';
import { GetProsumerInfoDso } from '../../../Models/getProsumerInfoDSO'
import { listProducts } from 'src/app/Models/ProsumerDeviceElementInList';
import { ActivatedRoute, Router } from '@angular/router';
import { DsoService } from 'src/app/Services/API/DSO-API/DSO_Prosumer/dso.service';
import { prosumerPageInformation, prosumerTableInfo } from 'src/app/Models/prosumerTableInfo';
import { DialogComponent } from 'src/app/Component/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { NgToggleComponent } from 'ng-toggle-button';
import { ImageBase64Service } from 'src/app/Services/ImageBase64/image-base64.service';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { LoginService } from 'src/app/Services/API/Security/Login/login.service';

@Component({
  selector: 'app-prosumer-page-dso',
  templateUrl: './prosumer-page-dso.component.html',
  styleUrls: ['./prosumer-page-dso.component.css']
})
export class ProsumerPageDsoComponent implements OnInit{
  
  toggleLabels = {checked: 'ON', unchecked: 'OFF'};
  toggleColor ={checked: '#6E9C0C', unchecked: 'silver'};

  faTrashCan = faTrashCan;

  // OBRISATI
  prosumerInfo = {
  debt: 4200,
  } as GetProsumerInfoDso;
  
  classDebt : string;
  setGraph : string;
  prosumerId!:string;
  isLoading = true;


  role!:string;
  constructor(private route : ActivatedRoute, private dsoService:DsoService,private image: ImageBase64Service, private dialog: MatDialog, private router:Router, private login:LoginService ){
    this.route.queryParams.subscribe(
      params =>{
        this.prosumerId = params['prosumerId'];
        // calling methods
      }
    );
    this.role = this.login.getRole();
    if(this.prosumerInfo.debt < 0){
      this.classDebt = "red-debt";
    }
    else{
      this.classDebt = "green-debt";
    }
    this.setGraph = "month";
  }

  ngOnInit(): void {
    this.getProsumerInfoForDso();
    this.getProsumerDevices();

  }

  profilePictue!:any;
  prosumerInformation =  {} as prosumerPageInformation;
  isLoadingProsumerInfo: boolean = true;
  getProsumerInfoForDso(){
    this.dsoService.getProsumerForDso(this.prosumerId).subscribe(
      response=>{
        this.prosumerInformation = response;
        this.profilePictue = this.image.getPicture(this.prosumerInformation.image);
        this.isLoadingProsumerInfo = false;
      }
    )
  }
  
  listProducts = [] as listProducts[];
  listOfControlProducts = [] as listProducts[];
  message = "";
  getProsumerDevices(){
    this.dsoService.getProsumerDevice(this.prosumerId).subscribe(
      response=>{
        this.listProducts = response;
        if(this.listProducts.length == 0)
          this.message = "Korisnik je zabranio pristup svim uredjajima";
        this.setListOfControlProducts();
        this.isLoading = false;
      }
    )
  }
  setListOfControlProducts(){
    this.listProducts.forEach(element => {
      if(element.control == true)
        this.listOfControlProducts.push(element);
    });
  }
  
  openDialog(device: listProducts, toggle: NgToggleComponent) {
    const dialogRef = this.dialog.open(DialogComponent, {
      autoFocus: true
    });
    
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.setStatusOfDevice(device);
      }
      else toggle.writeValue(!toggle.value);
    });
  }

  openDialogDeleteProsumer() {
    const dialogRef = this.dialog.open(DialogComponent, {
      autoFocus: true
    });
    
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.dsoService.deleteProsumer(this.prosumerId)
        .subscribe({
          next: (data) => {
          },
          error: (error) => {
            this.router.navigate(['/AllProsumersTable']);
          }
        });
      }
    });
  }

  setStatusOfDevice(device:listProducts){
    this.dsoService.setStatusOfDevice(device.linkerId,this.prosumerId).subscribe(
      res => {},
      err => {
        switch(device.work){
          case true:
            device.work = false;
            break;
          case false:
            device.work = true;
            break;
        }
      },
      () => {}
    );
  }


  viewDevice = "svi_uredjaji";
  selectedViewDeviceAccess: any = true;
  selectedViewDeviceControl: any = false;
  setViewDeviceAccess(){
      this.selectedViewDeviceControl = false;
      this.selectedViewDeviceAccess = true;
      this.viewDevice = "svi_uredjaji";
  }

  setViewDeviceControl(){
    this.selectedViewDeviceAccess = false;
    this.selectedViewDeviceControl = true;
    this.viewDevice = "urdjaji_za_upravljanje";
}

}
