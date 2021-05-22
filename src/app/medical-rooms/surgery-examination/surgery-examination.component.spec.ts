import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurgeryExaminationComponent } from './surgery-examination.component';

describe('SurgeryExaminationComponent', () => {
  let component: SurgeryExaminationComponent;
  let fixture: ComponentFixture<SurgeryExaminationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SurgeryExaminationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SurgeryExaminationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
