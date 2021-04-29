import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalRoomsComponent } from './medical-rooms.component';

describe('MedicalRoomsComponent', () => {
  let component: MedicalRoomsComponent;
  let fixture: ComponentFixture<MedicalRoomsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicalRoomsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicalRoomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
