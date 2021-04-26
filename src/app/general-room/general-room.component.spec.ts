import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralRoomComponent } from './general-room.component';

describe('GeneralRoomComponent', () => {
  let component: GeneralRoomComponent;
  let fixture: ComponentFixture<GeneralRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneralRoomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
