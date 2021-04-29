import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalGeneralDoctorComponent } from './medical-general-doctor.component';

describe('MedicalGeneralDoctorComponent', () => {
  let component: MedicalGeneralDoctorComponent;
  let fixture: ComponentFixture<MedicalGeneralDoctorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicalGeneralDoctorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicalGeneralDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
