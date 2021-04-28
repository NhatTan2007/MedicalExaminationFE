import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCustomerExaminationComponent } from './create-customer-examination.component';

describe('CreateCustomerExaminationComponent', () => {
  let component: CreateCustomerExaminationComponent;
  let fixture: ComponentFixture<CreateCustomerExaminationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCustomerExaminationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCustomerExaminationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
