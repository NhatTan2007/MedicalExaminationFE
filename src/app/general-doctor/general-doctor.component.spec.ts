import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralDoctorComponent } from './general-doctor.component';

describe('GeneralDoctorComponent', () => {
  let component: GeneralDoctorComponent;
  let fixture: ComponentFixture<GeneralDoctorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneralDoctorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
