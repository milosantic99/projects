import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CdkDragDropConnectedSortingGroupComponent } from './cdk-drag-drop-connected-sorting-group.component';

describe('CdkDragDropConnectedSortingGroupComponent', () => {
  let component: CdkDragDropConnectedSortingGroupComponent;
  let fixture: ComponentFixture<CdkDragDropConnectedSortingGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CdkDragDropConnectedSortingGroupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CdkDragDropConnectedSortingGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
