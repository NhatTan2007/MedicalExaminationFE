import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../config/config.service';

@Injectable({
	providedIn: 'root'
})
export class PrintService {
	protected apiDomain = `${this.config.getDomain()}/PdfCreator`
	constructor(private config: ConfigService,
				private httpClient: HttpClient) { }

	printExaminationResult(medicalRecordId: string){
		return this.httpClient.get(`${this.apiDomain}/medicalRecordResult/${medicalRecordId}`, { responseType: 'blob' })
	}
}
