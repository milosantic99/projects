import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineGraphThreeInOneComponent } from './line-graph-three-in-one.component';

describe('LineGraphThreeInOneComponent', () => {
  let component: LineGraphThreeInOneComponent;
  let fixture: ComponentFixture<LineGraphThreeInOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LineGraphThreeInOneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LineGraphThreeInOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
