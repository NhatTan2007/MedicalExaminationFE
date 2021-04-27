import { TestBed } from '@angular/core/testing';

import { CustomerOrganizationService } from './customer-organization.service';

describe('CustomerOrganizationService', () => {
  let service: CustomerOrganizationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerOrganizationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
