import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBarDsoComponent } from './search-bar-dso.component';

describe('SearchBarDsoComponent', () => {
  let component: SearchBarDsoComponent;
  let fixture: ComponentFixture<SearchBarDsoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchBarDsoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchBarDsoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
