import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CreateCustomerOrganizationReq,
			CreateCustomerOrganizationRes,
			CustomerOrganization,
			UpdateCustomerOrganizationReq,
			UpdateCustomerOrganizationRes } from '../../models/customerOrganization.Models';
import { ConfigService } from '../config/config.service';

@Injectable({
  	providedIn: 'root'
})
export class CustomerOrganizationService {
	protected apiDomain = `${this.config.getDomain()}/CustomerOrganization`
    constructor(private httpClient: HttpClient,
    				private config: ConfigService) { }

	CreateCustomerOrganization(customerOrganization: CreateCustomerOrganizationReq): Observable<CreateCustomerOrganizationRes>{
		return this.httpClient.post(`${this.apiDomain}/create`, customerOrganization)
			.pipe(map(res => res as CreateCustomerOrganizationRes));
	}

	UpdateCustomerOrganization(customerOrganization: UpdateCustomerOrganizationReq): Observable<UpdateCustomerOrganizationRes>{
		return this.httpClient.put(`${this.apiDomain}/update`, customerOrganization)
			.pipe(map(res => res as UpdateCustomerOrganizationRes));
	}

	GetCustomerOrganizationByOrganizationId(organizationId: string): Observable<CustomerOrganization>{
		return this.httpClient.get(`${this.apiDomain}/organization/${organizationId}`)
			.pipe(map(res => res as CustomerOrganization));
	}

	GetCustomerOrganization(organizationId: string, customerId: string): Observable<CustomerOrganization>{
		return this.httpClient.get(`${this.apiDomain}/organization/${organizationId}/customer/${customerId}`)
			.pipe(map(res => res as CustomerOrganization));
	}
}
