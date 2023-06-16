import { Component } from '@angular/core';
import { faUserCog, faUsers } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-user-administration',
  templateUrl: './user-administration.component.html',
  styleUrls: ['./user-administration.component.css']
})
export class UserAdministrationComponent {
  faUsers = faUsers;
  faCog = faUserCog;
}
