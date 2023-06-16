import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeDsoComponent } from './home-dso.component';

describe('HomeDsoComponent', () => {
  let component: HomeDsoComponent;
  let fixture: ComponentFixture<HomeDsoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeDsoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeDsoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
