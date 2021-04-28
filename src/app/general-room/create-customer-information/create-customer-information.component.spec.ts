import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCustomerInformationComponent } from './create-customer-information.component';

describe('CreateCustomerInformationComponent', () => {
  let component: CreateCustomerInformationComponent;
  let fixture: ComponentFixture<CreateCustomerInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCustomerInformationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCustomerInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
