import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { MedicalRecordDetailsUpdate } from 'src/app/_shared/models/medicalExaminationDetails.Models';
import { MedicalRecord } from 'src/app/_shared/models/medicalRecord.Models';
import { MedicalRecordService } from 'src/app/_shared/services/medicalRecord/medical-record.service';

@Component({
	selector: 'app-examination-result',
	templateUrl: './examination-result.component.html',
	styleUrls: ['./examination-result.component.scss']
})
export class ExaminationResultComponent implements OnInit {
	medicalRecord: MedicalRecord
	medicalRecord$: Observable<MedicalRecord>;
	medicalRecordDetailsUpdate: MedicalRecordDetailsUpdate
	constructor(private medicalRecordService: MedicalRecordService,
				private spiner: NgxSpinnerService) { }
	
		ngOnInit(){
			this.medicalRecord$ = this.medicalRecordService.getMedicalRecord$();
			this.medicalRecord$.subscribe((res) => {
					this.spiner.show();
					this.medicalRecordDetailsUpdate = new MedicalRecordDetailsUpdate(res.medicalRecordId);
					this.medicalRecordDetailsUpdate.finalExaminationResult = res.details.finalExaminationResult
					this.medicalRecord = res
					this.spiner.hide();
				})
		}

}
