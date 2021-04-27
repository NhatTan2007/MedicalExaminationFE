import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOgranizationExaminationComponent } from './create-ogranization-examination.component';

describe('CreateOgranizationExaminationComponent', () => {
  let component: CreateOgranizationExaminationComponent;
  let fixture: ComponentFixture<CreateOgranizationExaminationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateOgranizationExaminationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOgranizationExaminationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
