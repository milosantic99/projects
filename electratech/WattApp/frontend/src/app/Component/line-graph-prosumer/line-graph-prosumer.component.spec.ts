import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineGraphProsumerComponent } from './line-graph-prosumer.component';

describe('LineGraphProsumerComponent', () => {
  let component: LineGraphProsumerComponent;
  let fixture: ComponentFixture<LineGraphProsumerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LineGraphProsumerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LineGraphProsumerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
