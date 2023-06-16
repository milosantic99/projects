import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeProsumerComponent } from './home-prosumer.component';

describe('HomeProsumerComponent', () => {
  let component: HomeProsumerComponent;
  let fixture: ComponentFixture<HomeProsumerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeProsumerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeProsumerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
