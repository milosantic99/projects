import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteUserPopupComponent } from './delete-user-popup.component';

describe('DeleteUserPopupComponent', () => {
  let component: DeleteUserPopupComponent;
  let fixture: ComponentFixture<DeleteUserPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteUserPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteUserPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
