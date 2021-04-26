import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralRoomLayoutComponent } from './general-room-layout.component';

describe('GeneralRoomLayoutComponent', () => {
  let component: GeneralRoomLayoutComponent;
  let fixture: ComponentFixture<GeneralRoomLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneralRoomLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralRoomLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
