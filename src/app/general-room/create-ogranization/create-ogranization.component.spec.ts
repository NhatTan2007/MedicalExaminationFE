import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOgranizationComponent } from './create-ogranization.component';

describe('CreateOgranizationComponent', () => {
  let component: CreateOgranizationComponent;
  let fixture: ComponentFixture<CreateOgranizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateOgranizationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOgranizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
