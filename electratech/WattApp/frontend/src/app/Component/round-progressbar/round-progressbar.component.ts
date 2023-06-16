
import { Component,Input } from '@angular/core';
import { Progressbar } from 'src/app/Models/progressbar';

@Component({
  selector: 'app-round-progressbar',
  templateUrl: './round-progressbar.component.html',
  styleUrls: ['./round-progressbar.component.css']
})
export class RoundProgressbarComponent {

  @Input() progressbarValue={} as Progressbar;
  
}

