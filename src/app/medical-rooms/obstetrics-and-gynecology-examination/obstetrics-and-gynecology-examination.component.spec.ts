import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObstetricsAndGynecologyExaminationComponent } from './obstetrics-and-gynecology-examination.component';

describe('ObstetricsAndGynecologyExaminationComponent', () => {
  let component: ObstetricsAndGynecologyExaminationComponent;
  let fixture: ComponentFixture<ObstetricsAndGynecologyExaminationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObstetricsAndGynecologyExaminationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ObstetricsAndGynecologyExaminationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
