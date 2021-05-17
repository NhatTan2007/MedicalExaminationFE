import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MedicalRecord } from 'src/app/_shared/models/medicalRecord.Models';
import { MedicalRecordService } from 'src/app/_shared/services/medicalRecord/medical-record.service';

@Component({
	selector: 'app-customer-information',
	templateUrl: './customer-information.component.html',
	styleUrls: ['./customer-information.component.scss']
})
export class CustomerInformationComponent implements OnInit {
	medicalRecord: MedicalRecord
	medicalRecord$: Observable<MedicalRecord>
	constructor(private medicalRecordService: MedicalRecordService) { }

	ngOnInit(): void {
		this.medicalRecord$ = this.medicalRecordService.getMedicalRecord$();
		this.medicalRecord$.subscribe((res) => {
			this.medicalRecord = res
		})
	}

}
