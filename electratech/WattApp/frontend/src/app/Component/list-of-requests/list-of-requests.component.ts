import { Component } from '@angular/core';
import { DsoUsersService, OneNotification } from 'src/app/Services/API/DSO-API/DSO/dso-users.service';
import { ImageBase64Service } from 'src/app/Services/ImageBase64/image-base64.service';

@Component({
  selector: 'app-list-of-requests',
  templateUrl: './list-of-requests.component.html',
  styleUrls: ['./list-of-requests.component.css']
})
export class ListOfRequestsComponent {

  constructor (private dsoService : DsoUsersService, private image: ImageBase64Service) {

    this.dsoService.getNotification().subscribe(
      response=>{
        response.forEach(element => {
          var imageSrc = image.getPicture(element.imageUrl);
          var notify = {
            notificationId: element.notificationId,
            notificationType: element.notificationType,
            prosumerId: element.prosumerId,
            prosumerName: element.prosumerName,
            imageUrl: imageSrc
          } as OneNotification;
          this.listNotification.push(notify);
        });
      }
    )
  }

  listNotification = [] as Array<OneNotification>;

  removeFromList(notificationId:number){
  const index = this.listNotification.findIndex(item => item.notificationId === notificationId);
  if (index !== -1)
    this.listNotification.splice(index, 1);
  }

  declineTypeRemoveAccountNotification(id:number){  
    this.removeFromList(id);
    // gadjanje apija za odibjanje brisanja naloga
    this.dsoService.declineRemoveAccount(id).subscribe(
      response=>{},
      error=>{},
      () => {}
    )
  }

  declineTypeAddAccountNotification(id:number){
    this.removeFromList(id);
    // gadjanje apija za odibjanje dodavanja naloga
    this.dsoService.declineAccessRequest(id).subscribe(
      response=>{},
      error=>{},
      () => {}
    )
  }
  
  approveTypeRemoveAccountNotification(id:number){
    this.removeFromList(id);
    // gadjanje apija za potvrdu brisanja naloga
    this.dsoService.acceptRemoveAccount(id).subscribe(
      response=>{},
      error=>{},
      () => {}
    )
  }

  approveTypeAddAccountNotification(id:number){
    this.removeFromList(id);
    // gadjanje apija za potvrdu dodavanja naloga
    this.dsoService.acceptAccessRequest(id).subscribe(
      response=>{},
      error=>{},
      () => {}
    );
  }

}
