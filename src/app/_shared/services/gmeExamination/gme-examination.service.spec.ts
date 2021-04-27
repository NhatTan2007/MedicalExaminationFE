import { TestBed } from '@angular/core/testing';

import { GmeExaminationService } from './gme-examination.service';

describe('GmeExaminationService', () => {
  let service: GmeExaminationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GmeExaminationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
