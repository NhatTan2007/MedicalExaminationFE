import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OphthalmologyExaminationComponent } from './ophthalmology-examination.component';

describe('OphthalmologyExaminationComponent', () => {
  let component: OphthalmologyExaminationComponent;
  let fixture: ComponentFixture<OphthalmologyExaminationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OphthalmologyExaminationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OphthalmologyExaminationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
