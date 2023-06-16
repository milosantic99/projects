import { CdkDragDrop, moveItemInArray, transferArrayItem } from "@angular/cdk/drag-drop";
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { faArrowLeft, faArrowRight, faLock, faTrashCan, faUserCog, faUsers } from '@fortawesome/free-solid-svg-icons';
import { DsoUser } from "src/app/Models/dsoUser";
import { DsoUsersService } from 'src/app/Services/API/DSO-API/DSO/dso-users.service';
import { DialogComponent } from "../dialog/dialog.component";
import { DialogDeleteComponent } from "../dialog-delete/dialog-delete.component";

@Component({
  selector: 'app-cdk-drag-drop-connected-sorting-group',
  templateUrl: './cdk-drag-drop-connected-sorting-group.component.html',
  styleUrls: ['./cdk-drag-drop-connected-sorting-group.component.css']
})

export class CdkDragDropConnectedSortingGroupComponent {

  admins: DsoUser[] = [];
  dispatchers: DsoUser[] = [];

  faTrashCan = faTrashCan;
  faUserCog = faUserCog;
  faUsers = faUsers;
  arrowLeft = faArrowLeft;
  arrowRight = faArrowRight;
  faLock = faLock;

  constructor(private dsoUserService: DsoUsersService, 
    private dialog: MatDialog) {}

  ngOnInit(): void {
    this.dsoUserService.getAllDispachers().subscribe({
      next: (dispatchers) => {
        dispatchers.forEach(x => {
          if (x.role == 2)
          this.dispatchers.push(x);
          else 
          this.admins.push(x);
        });
      },
      error: (error) => {
        console.log(error.error);
      }
    })
  }
  
  openDialogMoveItem(item: DsoUser, event?: CdkDragDrop<DsoUser[]>, source?: string) {
    if (event != null)
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    const dialogRef = this.dialog.open(DialogComponent, {
      autoFocus: true
    });

    dialogRef.afterClosed().subscribe(result => {
      
      if (result == true){
        if (source != undefined){
          if (source === 'admins'){
            this.dispatchers.push(item);
            this.admins.splice(this.admins.indexOf(item), 1);
          }
          if (source === 'dispatchers'){
            this.admins.push(item);
            this.dispatchers.splice(this.dispatchers.indexOf(item), 1);
          }
        }
        this.dsoUserService.changeRole(item.id)
        .subscribe({
          next: () => {

          },
          error: (error) => {
            console.log(error.error);
          }
        });
      }
      else {
        
        if (event != null)
        transferArrayItem(
          event.container.data,
          event.previousContainer.data,
          event.currentIndex,
          event.previousIndex,
        );
      }
    });
  }

  drop(event: CdkDragDrop<DsoUser[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    }
    else {
      this.openDialogMoveItem(event.item.data, event);
      
    }
  }

  moveItem(item: DsoUser, source: string){
    this.openDialogMoveItem(item, undefined, source)
  }

  openDialogDeleteDispatcher(id: string){
    const dialogRef = this.dialog.open(DialogDeleteComponent, {autoFocus: true});
    
    dialogRef.afterClosed()
    .subscribe(result => {
      if (result === true) {
        this.dsoUserService.deleteDispatcher(id)
        .subscribe({
          next: () => {
          },
          error: (error) => {
            const index = this.dispatchers.findIndex(item => item.id == id);
            const indexAdmin = this.admins.findIndex(item => item.id == id);
            if (index !== -1) this.dispatchers.splice(index, 1);
            if (indexAdmin !== -1) this.admins.splice(index, 1);
          }
        });
        
      }
    });
  }
}
