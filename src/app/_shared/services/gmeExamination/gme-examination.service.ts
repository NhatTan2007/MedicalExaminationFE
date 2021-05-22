import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CreateGmeExaminationReq,
			CreateGmeExaminationRes,
			GmeExamination,
			UpdateGmeExaminationReq,
			UpdateGmeExaminationRes } from '../../models/gmeExamination.Models';
import { ConfigService } from '../config/config.service';

@Injectable({
  	providedIn: 'root'
})
export class GmeExaminationService {
	protected apiDomain = `${this.config.getDomain()}/GMExamination`
    constructor(private httpClient: HttpClient,
    				private config: ConfigService) { }
	GetGmeExaminations(): Observable<GmeExamination[]>{
		return this.httpClient.get(`${this.apiDomain}`)
			.pipe(map(res => res as GmeExamination[]));
	}

	GetGmeExamination(gmeExaminationId: string): Observable<GmeExamination>{
		return this.httpClient.get(`${this.apiDomain}/${gmeExaminationId}`)
			.pipe(map(res => res as GmeExamination));
	}

	GetGmeExaminationByOrganizationId(organizationId: string): Observable<GmeExamination[]>{
		return this.httpClient.get(`${this.apiDomain}/organization/${organizationId}`)
			.pipe(map(res => res as GmeExamination[]));
	}

	CreateGmeExamination(gmeExamination: CreateGmeExaminationReq): Observable<CreateGmeExaminationRes>{
		return this.httpClient.post(`${this.apiDomain}/create`, gmeExamination)
			.pipe(map(res => res as CreateGmeExaminationRes));
	}
	UpdateGmeExamination(gmeExamination: UpdateGmeExaminationReq): Observable<UpdateGmeExaminationRes>{
		return this.httpClient.put(`${this.apiDomain}/update`, gmeExamination)
			.pipe(map(res => res as UpdateGmeExaminationRes));
	}
}
