import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from "../config/config.service";
import { CreateMedicalServiceRes,
			UpdateMedicalServiceRes,
          	CreateMedicalServiceReq,
          	UpdateMedicalServiceReq,
			MedicalService,
			QueryMServiceRes} from "../../models/medicalService.Models";
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
@Injectable({
    providedIn: 'root'
})
export class MedicalServiceService {
	protected apiDomain = `${this.config.getDomain()}/MedicalService`
    constructor(private config: ConfigService,
                private httpClient: HttpClient) { }

	GetMedicalServices(): Observable<MedicalService[]>{
		return this.httpClient.get(`${this.apiDomain}`)
			.pipe(
					map(res => (<MedicalService[]>res)
						.map(e => ({...e, update: false}))
						)
				)
	}

	GetMedicalServicesByPagination(currentPage: number, pageSize: number): Observable<QueryMServiceRes>{
		return this.httpClient.get(`${this.apiDomain}/currentPage/${currentPage}/pageSize/${pageSize}`)
			.pipe(
					map(res => (<QueryMServiceRes>res))
				)
	}

	GetMedicalService(medicalServiceId: number): Observable<MedicalService>{
		return this.httpClient.get(`${this.apiDomain}/${medicalServiceId}`)
		.pipe(map(res => res as MedicalService))
	}

	GetActiveMedicalServices(): Observable<MedicalService[]>{
		return this.httpClient.get(`${this.apiDomain}/active`)
			.pipe(map(res => <MedicalService[]>res))
	}
	GetActiveMedicalServicesByPagination(currentPage: number, pageSize: number):Observable<QueryMServiceRes>{
		return this.httpClient.get(`${this.apiDomain}/active/currentPage/${currentPage}/pageSize/${pageSize}`)
				.pipe(map(res => (res as QueryMServiceRes)));
	}

	CreateMedicalServices(medicalService: CreateMedicalServiceReq): Observable<CreateMedicalServiceRes>{
		return this.httpClient.post(`${this.apiDomain}/create`, medicalService)
			.pipe(map(res => <CreateMedicalServiceRes>res))
	}

	UpdateMedicalServices(medicalService: UpdateMedicalServiceReq): Observable<UpdateMedicalServiceRes>{
		return this.httpClient.put(`${this.apiDomain}/update`, medicalService)
			.pipe(map(res => <UpdateMedicalServiceRes>res))
	}

	GetMedicalServiceByDepartmentId(search: string): Observable<MedicalService[]>{
		return this.httpClient.get(`${this.apiDomain}/search/${search}`)
		.pipe(map(res => res as MedicalService[]))
	}

	SearchMedicalService(keyword: string,currentPage: number, pageSize: number): Observable<QueryMServiceRes>{
		return this.httpClient.get(`${this.apiDomain}/search/${keyword}/currentPage/${currentPage}/pageSize/${pageSize}`)
		.pipe(map(res => (res as QueryMServiceRes)))
	}


}
