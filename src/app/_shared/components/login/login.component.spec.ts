import { ComponentFixture, TestBed } from '@angular/core/testing';

<<<<<<< HEAD:src/app/general-room/general-room.component.spec.ts
import { GeneralRoomComponent } from './general-room.component';

describe('GeneralRoomComponent', () => {
  let component: GeneralRoomComponent;
  let fixture: ComponentFixture<GeneralRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneralRoomComponent ]
=======
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ]
>>>>>>> dev:src/app/_shared/components/login/login.component.spec.ts
    })
    .compileComponents();
  });

  beforeEach(() => {
<<<<<<< HEAD:src/app/general-room/general-room.component.spec.ts
    fixture = TestBed.createComponent(GeneralRoomComponent);
=======
    fixture = TestBed.createComponent(LoginComponent);
>>>>>>> dev:src/app/_shared/components/login/login.component.spec.ts
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
