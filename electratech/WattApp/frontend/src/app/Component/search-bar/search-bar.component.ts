import { Component, EventEmitter, Output } from '@angular/core';
import { faSearch,faClose } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {

  faSearch=faSearch;
  faClose=faClose;
  
  searchTerm: string | undefined ;
  
  @Output() searchEmitter = new EventEmitter<string>();

  onSubmit() {
    this.searchEmitter.emit(this.searchTerm);
  }

}
