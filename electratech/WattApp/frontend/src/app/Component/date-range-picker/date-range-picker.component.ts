import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-date-range-picker',
  templateUrl: './date-range-picker.component.html',
  styleUrls: ['./date-range-picker.component.css']
})
export class DateRangePickerComponent {
  
  @Output() changeEvent: EventEmitter<{start: Date | null, end: Date | null} | null> = new EventEmitter<{start: Date | null, end: Date | null} | null>();
  today: Date = new Date();
  startDate = new Date(new Date().setDate(this.today.getDate() - 3));
  endDate = new Date(new Date().setDate(this.today.getDate() + 3));

  range = new FormGroup({
    start: new FormControl<Date | null>(this.startDate),
    end: new FormControl<Date | null>(this.endDate)
  });

  ngOnInit() {
    
    this.emitEvent();
  }
  
  emitEvent() {
    let rawRange = this.range.getRawValue();
    
    
    if (rawRange.end != null && rawRange.start != null){
      this.changeEvent.emit(rawRange);
    }


  }

}
