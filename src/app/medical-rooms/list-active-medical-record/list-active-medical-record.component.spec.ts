import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListActiveMedicalRecordComponent } from './list-active-medical-record.component';

describe('ListActiveMedicalRecordComponent', () => {
  let component: ListActiveMedicalRecordComponent;
  let fixture: ComponentFixture<ListActiveMedicalRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListActiveMedicalRecordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListActiveMedicalRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
