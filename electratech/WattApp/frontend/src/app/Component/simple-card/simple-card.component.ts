import { Component, Inject, Input} from '@angular/core';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { SimpleCardModel } from 'src/app/Models/SimpleCardModel';

@Component({
  selector: 'app-simple-card',
  templateUrl: './simple-card.component.html',
  styleUrls: ['./simple-card.component.css']
})
export class SimpleCardComponent {
  @Input() info = {} as SimpleCardModel;
  arrow = faArrowRight;

}
