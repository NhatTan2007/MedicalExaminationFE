import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtorhinolaryngologyExaminationComponent } from './otorhinolaryngology-examination.component';

describe('OtorhinolaryngologyExaminationComponent', () => {
  let component: OtorhinolaryngologyExaminationComponent;
  let fixture: ComponentFixture<OtorhinolaryngologyExaminationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtorhinolaryngologyExaminationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OtorhinolaryngologyExaminationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
