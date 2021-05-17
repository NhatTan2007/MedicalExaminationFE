import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CreateOrganizationReq, CreateOrganizationRes, Organization, UpdateOrganizationReq, UpdateOrganizationRes, QuerryOrganizationRes } from '../../models/organization.Models';
import { ConfigService } from '../config/config.service';

@Injectable({
  	providedIn: 'root'
})
export class OrganizationService {
	protected apiDomain = `${this.config.getDomain()}/Organization`
    constructor(private config: ConfigService,
                private httpClient: HttpClient) { }
	
	GetOrganizations(): Observable<Organization[]>{
		return this.httpClient.get(`${this.apiDomain}`)
			.pipe(map(res => res as Organization[]))
	}

	GetOrganizationsByPagination(currentPage: number, pageSize: number): Observable<QuerryOrganizationRes>{
		return this.httpClient.get(`${this.apiDomain}/currentPage/${currentPage}/pageSize/${pageSize}`)
			.pipe(map(res => (res as QuerryOrganizationRes)));
	}

	GetOrganization(organizationId: string): Observable<Organization>{
		return this.httpClient.get(`${this.apiDomain}/${organizationId}`)
		.pipe(map(res => res as Organization))
	}

	SearchOrganization(keyword: string,currentPage: number, pageSize: number): Observable<QuerryOrganizationRes>{
		return this.httpClient.get(`${this.apiDomain}/search/${keyword}/currentPage/${currentPage}/pageSize/${pageSize}`)
		.pipe(map(res => (res as QuerryOrganizationRes)))
	}



	SearchOrganizationByNameDESC(search: string): Observable<Organization[]>{
		return this.httpClient.get(`${this.apiDomain}/search/${search}/orderDESCByName`)
		.pipe(map(res => res as Organization[]))
	}

	CreateOrganization(organization: CreateOrganizationReq): Observable<CreateOrganizationRes>{
		return this.httpClient.post(`${this.apiDomain}/create`, organization)
		.pipe(map(res => res as CreateOrganizationRes))
	}

	UpdateOrganization(organization: UpdateOrganizationReq): Observable<UpdateOrganizationRes>{
		return this.httpClient.put(`${this.apiDomain}/update`, organization)
		.pipe(map(res => res as UpdateOrganizationRes))
	}
}
