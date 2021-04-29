import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OralAndMaxillofacialExaminationComponent } from './oral-and-maxillofacial-examination.component';

describe('OralAndMaxillofacialExaminationComponent', () => {
  let component: OralAndMaxillofacialExaminationComponent;
  let fixture: ComponentFixture<OralAndMaxillofacialExaminationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OralAndMaxillofacialExaminationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OralAndMaxillofacialExaminationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
