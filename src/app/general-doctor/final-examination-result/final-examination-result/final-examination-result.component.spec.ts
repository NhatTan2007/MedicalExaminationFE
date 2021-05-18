import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalExaminationResultComponent } from './final-examination-result.component';

describe('FinalExaminationResultComponent', () => {
  let component: FinalExaminationResultComponent;
  let fixture: ComponentFixture<FinalExaminationResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinalExaminationResultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalExaminationResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
