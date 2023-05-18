import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataTransferService {

  username : string;
  
  constructor() { }

  changeUsername(username: string){
    this.username = username
  }
}
