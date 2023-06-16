import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.css']
})
export class DialogBoxComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data:{question:string, answer:string}, private matDialogRef: MatDialogRef<DialogBoxComponent>) {}

  ngOnDestroy() {
    this.matDialogRef.close(this.data);
  }

  yesClose() {
    this.data.answer = "Yes";
    this.matDialogRef.close();
  }

  noClose() {
    this.data.answer = "No";
    this.matDialogRef.close();
  }

}
