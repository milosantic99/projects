import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProsumerPageDsoComponent } from './prosumer-page-dso.component';

describe('ProsumerPageDsoComponent', () => {
  let component: ProsumerPageDsoComponent;
  let fixture: ComponentFixture<ProsumerPageDsoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProsumerPageDsoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProsumerPageDsoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
