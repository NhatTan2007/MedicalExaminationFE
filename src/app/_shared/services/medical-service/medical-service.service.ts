import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from "../config/config.service";
import { MedicalServiceRes,
          	CreateMedicalServiceReq,
          	UpdateMedicalServiceReq,
			MedicalService} from "../../models/medicalService.Models";
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
			.pipe(map(res => <MedicalService[]>res))
	}

	GetActiveMedicalServices(): Observable<MedicalService[]>{
		return this.httpClient.get(`${this.apiDomain}/active`)
			.pipe(map(res => <MedicalService[]>res))
	}

	CreateMedicalServices(medicalService: CreateMedicalServiceReq): Observable<MedicalServiceRes>{
		return this.httpClient.post(`${this.apiDomain}/create`, medicalService)
			.pipe(map(res => <MedicalServiceRes>res))
	}

	UpdateMedicalServices(medicalService: UpdateMedicalServiceReq): Observable<MedicalServiceRes>{
		return this.httpClient.post(`${this.apiDomain}/create`, medicalService)
			.pipe(map(res => <MedicalServiceRes>res))
	}
}
