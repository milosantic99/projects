import { Component, Input } from '@angular/core';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { SimpleCardModel } from 'src/app/Models/SimpleCardModel';

@Component({
  selector: 'app-simple-card-analysis',
  templateUrl: './simple-card-analysis.component.html',
  styleUrls: ['./simple-card-analysis.component.css']
})
export class SimpleCardAnalysisComponent {
  @Input() info = {} as SimpleCardModel;
  arrow = faArrowRight;
}
