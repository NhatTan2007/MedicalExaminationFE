import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CreateMedicalRecordReq,
			CreateMedicalRecordRes,
			MedicalRecord,
			MedicalRecordViewRes,
			UpdateMedicalRecordRes } from '../../models/medicalRecord.Models';
import { ConfigService } from '../config/config.service';

@Injectable({
    providedIn: 'root'
})
export class MedicalRecordService {
    protected apiDomain = `${this.config.getDomain()}/MedicalRecord`
    constructor(private config: ConfigService,
                private httpClient: HttpClient) { }

	CreateMedicalRecord(medicalRecord: CreateMedicalRecordReq): Observable<CreateMedicalRecordRes>{
		return this.httpClient.post(`${this.apiDomain}/create`, medicalRecord)
			.pipe(map(res => res as CreateMedicalRecordRes))
	}

	GetMedicalRecord(medicalRecordId: string): Observable<MedicalRecord>{
		return this.httpClient.get(`${this.apiDomain}/${medicalRecordId}`)
			.pipe(map(res => res as MedicalRecord));
	}

	ActiveMedicalRecord(medicalRecordId: string): Observable<UpdateMedicalRecordRes>{
		return this.httpClient.get(`${this.apiDomain}/active/${medicalRecordId}`)
			.pipe(map(res => res as UpdateMedicalRecordRes))
	}

	PaidMedicalRecord(medicalRecordId: string): Observable<UpdateMedicalRecordRes>{
		return this.httpClient.get(`${this.apiDomain}/paid/${medicalRecordId}`)
			.pipe(map(res => res as UpdateMedicalRecordRes))
	}

	SearchActiveMedicalRecord(searchKey: string): Observable<MedicalRecordViewRes>{
		return this.httpClient.get(`${this.apiDomain}/searchActive/${searchKey}`)
			.pipe(map(res => res as MedicalRecordViewRes))
	}
	
}
