import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineGraphHomeProsumerComponent } from './line-graph-home-prosumer.component';

describe('LineGraphHomeProsumerComponent', () => {
  let component: LineGraphHomeProsumerComponent;
  let fixture: ComponentFixture<LineGraphHomeProsumerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LineGraphHomeProsumerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LineGraphHomeProsumerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
