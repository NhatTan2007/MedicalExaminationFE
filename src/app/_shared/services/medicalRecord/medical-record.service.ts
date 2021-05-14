import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/internal/Subject';
import { map } from 'rxjs/operators';
import { AExaminationRooms, DermatologyExamination, MedicalRecordDetails } from '../../models/medicalExaminationDetails.Models';
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
	medicalRecord: MedicalRecord
	medicalRecord$: Subject<MedicalRecord> = new Subject<MedicalRecord>();
    constructor(private config: ConfigService,
                private httpClient: HttpClient) { }

	async getListServicesFromMedicalRecord(medicalRecordDetails: MedicalRecordDetails): Promise<AExaminationRooms[]>{ 
		let services: AExaminationRooms[] = []
		for(let serviceName in medicalRecordDetails){  
			if(medicalRecordDetails.hasOwnProperty(serviceName)){  
				medicalRecordDetails[serviceName].objName = serviceName
				services.push(medicalRecordDetails[serviceName]);  
			}  
		}
		return services
	}

	getMedicalRecord$(): Observable<MedicalRecord>{
		return this.medicalRecord$.asObservable();
	}

	emitMedicalRecord(medicalRecord: MedicalRecord): void{
		this.medicalRecord$.next(medicalRecord);
	}

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

	GetActiveMedicalRecord(): Observable<MedicalRecordViewRes[]>{
		return this.httpClient.get(`${this.apiDomain}/getActive`)
			.pipe(map(res => res as MedicalRecordViewRes[]))
	}

	getMedicalRecordsByCustomerId(customerId: string): Observable<MedicalRecordViewRes[]>{
		return this.httpClient.get(`${this.apiDomain}/customer/${customerId}`)
			.pipe(map(res => res as MedicalRecordViewRes[]))
	}

	//Update result of examination
	updateDermatologyExamination(dermatologyExamination: DermatologyExamination, mRecordId: string): Observable<UpdateMedicalRecordRes>{
		return this.httpClient.put(`${this.apiDomain}/${mRecordId}/dermatologyExamination`, dermatologyExamination)
			.pipe(map(res => res as UpdateMedicalRecordRes))
	}
}
