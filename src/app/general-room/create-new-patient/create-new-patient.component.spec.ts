import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewPatientComponent } from './create-new-patient.component';

describe('CreateNewPatientComponent', () => {
  let component: CreateNewPatientComponent;
  let fixture: ComponentFixture<CreateNewPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateNewPatientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNewPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
