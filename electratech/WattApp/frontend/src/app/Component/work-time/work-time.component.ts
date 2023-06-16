import { Component, Input } from '@angular/core';
import { workTime } from 'src/app/Models/workTime';
import { faClock} from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-work-time',
  templateUrl: './work-time.component.html',
  styleUrls: ['./work-time.component.css']
})
export class WorkTimeComponent {

  @Input() workTimeValue={} as workTime;

  faClock=faClock;
}
