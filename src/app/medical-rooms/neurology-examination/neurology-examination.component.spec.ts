import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NeurologyExaminationComponent } from './neurology-examination.component';

describe('NeurologyExaminationComponent', () => {
  let component: NeurologyExaminationComponent;
  let fixture: ComponentFixture<NeurologyExaminationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NeurologyExaminationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NeurologyExaminationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
