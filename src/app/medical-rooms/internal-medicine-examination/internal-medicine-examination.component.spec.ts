import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternalMedicineExaminationComponent } from './internal-medicine-examination.component';

describe('InternalMedicineExaminationComponent', () => {
  let component: InternalMedicineExaminationComponent;
  let fixture: ComponentFixture<InternalMedicineExaminationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InternalMedicineExaminationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InternalMedicineExaminationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
