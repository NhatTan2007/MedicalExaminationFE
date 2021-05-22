import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageAnalysationComponent } from './image-analysation.component';

describe('ImageAnalysationComponent', () => {
  let component: ImageAnalysationComponent;
  let fixture: ComponentFixture<ImageAnalysationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageAnalysationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageAnalysationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
