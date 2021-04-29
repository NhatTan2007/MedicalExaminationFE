import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DermatologyExaminationComponent } from './dermatology-examination.component';

describe('DermatologyExaminationComponent', () => {
  let component: DermatologyExaminationComponent;
  let fixture: ComponentFixture<DermatologyExaminationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DermatologyExaminationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DermatologyExaminationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
