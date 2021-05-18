import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageScannerComponent } from './image-scanner.component';

describe('ImageScannerComponent', () => {
  let component: ImageScannerComponent;
  let fixture: ComponentFixture<ImageScannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageScannerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageScannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
