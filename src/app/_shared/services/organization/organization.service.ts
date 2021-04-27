import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CreateOrganizationReq, CreateOrganizationRes, Organization, UpdateOrganizationReq, UpdateOrganizationRes } from '../../models/organization.Models';
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

	GetOrganization(organizationId: string): Observable<Organization>{
		return this.httpClient.get(`${this.apiDomain}/${organizationId}`)
		.pipe(map(res => res as Organization))
	}

	SearchOrganizationByNameASC(search: string): Observable<Organization[]>{
		return this.httpClient.get(`${this.apiDomain}/search/${search}/orderASCByName`)
		.pipe(map(res => res as Organization[]))
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
		return this.httpClient.put(`${this.apiDomain}/create`, organization)
		.pipe(map(res => res as UpdateOrganizationRes))
	}
}
