import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BottomMeniComponent } from './bottom-meni.component';

describe('BottomMeniComponent', () => {
  let component: BottomMeniComponent;
  let fixture: ComponentFixture<BottomMeniComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BottomMeniComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BottomMeniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
