import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OgranizationListComponent } from './ogranization-list.component';

describe('OgranizationListComponent', () => {
  let component: OgranizationListComponent;
  let fixture: ComponentFixture<OgranizationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OgranizationListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OgranizationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
