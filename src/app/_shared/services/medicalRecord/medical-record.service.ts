import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/internal/Subject';
import { map } from 'rxjs/operators';
import { AbdominalUltrasound, AExaminationRooms,
	BloodTests,
	BreastUltrasound,
	CardiacUltrasoundProbes,
	ChestXray,
	ClinicalUrineTests,
		DermatologyExamination,
		FinalExaminationResult,
		InternalMedicineExamination,
		MedicalRecordDetails,
		NeurologyExamination,
		ObstetricsAndGynecologyExamination,
		OphthalmologyExamination,
		OralAndMaxillofacialExamination, 
		OtorhinolaryngologyExamination,
		PhysicalExamination,
		SurgeryExamination,
		ThyroidUltrasound} from '../../models/medicalExaminationDetails.Models';
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
                private httpClient: HttpClient,
				private notification: NzNotificationService) { }

	getListServicesFromMedicalRecord(medicalRecordDetails: MedicalRecordDetails): AExaminationRooms[]{ 
		let services: AExaminationRooms[] = []
		for(let serviceName in medicalRecordDetails){
			if(medicalRecordDetails.hasOwnProperty(serviceName) && medicalRecordDetails[serviceName] != null){  
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

	GetActiveMedicalRecordFinishedExamination(): Observable<MedicalRecordViewRes[]>{
		return this.httpClient.get(`${this.apiDomain}/getActive/finished`)
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

	updateNeurologyExamination(neurologyExamination: NeurologyExamination, mRecordId: string): Observable<UpdateMedicalRecordRes>{
		return this.httpClient.put(`${this.apiDomain}/${mRecordId}/neurologyExamination`, neurologyExamination)
			.pipe(map(res => res as UpdateMedicalRecordRes))
	}

	updateInternalMedicineExamination(internalMedicineExamination: InternalMedicineExamination, mRecordId: string): Observable<UpdateMedicalRecordRes>{
		return this.httpClient.put(`${this.apiDomain}/${mRecordId}/internalMedicineExamination`, internalMedicineExamination)
			.pipe(map(res => res as UpdateMedicalRecordRes))
	}

	updateObstetricsAndGynecologyExamination(obstetricsAndGynecologyExamination: ObstetricsAndGynecologyExamination, mRecordId: string): Observable<UpdateMedicalRecordRes>{
		return this.httpClient.put(`${this.apiDomain}/${mRecordId}/obstetricsAndGynecologyExamination`, obstetricsAndGynecologyExamination)
			.pipe(map(res => res as UpdateMedicalRecordRes))
	}

	updateOphthalmologyExamination(ophthalmologyExamination: OphthalmologyExamination, mRecordId: string): Observable<UpdateMedicalRecordRes>{
		return this.httpClient.put(`${this.apiDomain}/${mRecordId}/ophthalmologyExamination`, ophthalmologyExamination)
			.pipe(map(res => res as UpdateMedicalRecordRes))
	}

	updateOralAndMaxillofacialExamination(oralAndMaxillofacialExamination: OralAndMaxillofacialExamination, mRecordId: string): Observable<UpdateMedicalRecordRes>{
		return this.httpClient.put(`${this.apiDomain}/${mRecordId}/oralAndMaxillofacialExamination`, oralAndMaxillofacialExamination)
			.pipe(map(res => res as UpdateMedicalRecordRes))
	}

	updateOtorhinolaryngologyExamination(otorhinolaryngologyExamination: OtorhinolaryngologyExamination, mRecordId: string): Observable<UpdateMedicalRecordRes>{
		return this.httpClient.put(`${this.apiDomain}/${mRecordId}/otorhinolaryngologyExamination`, otorhinolaryngologyExamination)
			.pipe(map(res => res as UpdateMedicalRecordRes))
	}
	
	updatePhysicalExamination(physicalExamination: PhysicalExamination, mRecordId: string): Observable<UpdateMedicalRecordRes>{
		return this.httpClient.put(`${this.apiDomain}/${mRecordId}/physicalExamination`, physicalExamination)
			.pipe(map(res => res as UpdateMedicalRecordRes))
	}

	updateSurgeryExamination(surgeryExamination: SurgeryExamination, mRecordId: string): Observable<UpdateMedicalRecordRes>{
		return this.httpClient.put(`${this.apiDomain}/${mRecordId}/surgeryExamination`, surgeryExamination)
			.pipe(map(res => res as UpdateMedicalRecordRes))
	}

	updateBloodTests(bloodTests: BloodTests, mRecordId: string): Observable<UpdateMedicalRecordRes>{
		return this.httpClient.put(`${this.apiDomain}/${mRecordId}/bloodTests`, bloodTests)
			.pipe(map(res => res as UpdateMedicalRecordRes))
	}

	updateClinicalUrineTests(clinicalUrineTests: ClinicalUrineTests, mRecordId: string): Observable<UpdateMedicalRecordRes>{
		return this.httpClient.put(`${this.apiDomain}/${mRecordId}/clinicalUrineTests`, clinicalUrineTests)
			.pipe(map(res => res as UpdateMedicalRecordRes))
	}

	updateAbdominalUltrasound(abdominalUltrasound: AbdominalUltrasound, mRecordId: string): Observable<UpdateMedicalRecordRes>{
		return this.httpClient.put(`${this.apiDomain}/${mRecordId}/abdominalUltrasound`, abdominalUltrasound)
			.pipe(map(res => res as UpdateMedicalRecordRes))
	}

	updateThyroidUltrasound(thyroidUltrasound: ThyroidUltrasound, mRecordId: string): Observable<UpdateMedicalRecordRes>{
		return this.httpClient.put(`${this.apiDomain}/${mRecordId}/thyroidUltrasound`, thyroidUltrasound)
			.pipe(map(res => res as UpdateMedicalRecordRes))
	}

	updateBreastUltrasound(breastUltrasound: BreastUltrasound, mRecordId: string): Observable<UpdateMedicalRecordRes>{
		return this.httpClient.put(`${this.apiDomain}/${mRecordId}/breastUltrasound`, breastUltrasound)
			.pipe(map(res => res as UpdateMedicalRecordRes))
	}

	updateCardiacUltrasoundProbes(cardiacUltrasoundProbes: CardiacUltrasoundProbes, mRecordId: string): Observable<UpdateMedicalRecordRes>{
		return this.httpClient.put(`${this.apiDomain}/${mRecordId}/cardiacUltrasoundProbes`, cardiacUltrasoundProbes)
			.pipe(map(res => res as UpdateMedicalRecordRes))
	}

	updateChestXray(chestXray: ChestXray, mRecordId: string): Observable<UpdateMedicalRecordRes>{
		return this.httpClient.put(`${this.apiDomain}/${mRecordId}/chestXray`, chestXray)
			.pipe(map(res => res as UpdateMedicalRecordRes))
	}

	updateFinalExaminationResult(finalExaminationResult: FinalExaminationResult, mRecordId: string): Observable<UpdateMedicalRecordRes>{
		return this.httpClient.put(`${this.apiDomain}/${mRecordId}/finalExaminationResult`, finalExaminationResult)
			.pipe(map(res => res as UpdateMedicalRecordRes))
	}
	
}
