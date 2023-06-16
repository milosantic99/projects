import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoundProgressbarComponent} from './round-progressbar.component';

describe('RoundProgressbarComponent', () => {
  let component: RoundProgressbarComponent;
  let fixture: ComponentFixture<RoundProgressbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoundProgressbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoundProgressbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
