import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CreateCustomerReq, Customer, CreateCustomerRes, UpdateCustomerRes, UpdateCustomerReq } from '../../models/customer.Models';
import { ConfigService } from '../config/config.service';

@Injectable({
  	providedIn: 'root'
})
export class CustomerService {
	protected apiDomain = `${this.config.getDomain()}/Customer`
    constructor(private httpClient: HttpClient,
    				private config: ConfigService) { }

	GetCustomers(): Observable<Customer[]>{
		return this.httpClient.get(`${this.apiDomain}`)
			.pipe(map(res => res as Customer[]));
	}

	GetCustomer(customerId: string): Observable<Customer>{
		return this.httpClient.get(`${this.apiDomain}/${customerId}`)
		.pipe(map(res => res as Customer));
	}

	CreateCustomer(customer: CreateCustomerReq): Observable<CreateCustomerRes>{
		return this.httpClient.post(`${this.apiDomain}/create`, customer)
		.pipe(map(res => res as CreateCustomerRes));
	}

	UpdateCustomer(customer: UpdateCustomerReq): Observable<UpdateCustomerRes>{
		return this.httpClient.put(`${this.apiDomain}/create`, customer)
		.pipe(map(res => res as UpdateCustomerRes));
	}

	SearchCustomer(keyword: string): Observable<Customer[]>{
		return this.httpClient.get(`${this.apiDomain}/search/${keyword}`)
		.pipe(map(res => res as Customer[]));
	}

	GetCustomerByIdentityNumber(identityNumber: string): Observable<Customer>{
		return this.httpClient.get(`${this.apiDomain}/identityNumber/${identityNumber}`)
		.pipe(map(res => res as Customer));
	}
}
