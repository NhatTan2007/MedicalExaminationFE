import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, Subject } from 'rxjs';
import { MedicalRecordDetails, MedicalRecordDetailsUpdate } from 'src/app/_shared/models/medicalExaminationDetails.Models';
import { MedicalRecord } from 'src/app/_shared/models/medicalRecord.Models';
import { MedicalRecordService } from 'src/app/_shared/services/medicalRecord/medical-record.service';

@Component({
	selector: 'app-dermatology-examination',
	templateUrl: './dermatology-examination.component.html',
	styleUrls: ['./dermatology-examination.component.scss'],
})
export class DermatologyExaminationComponent implements OnInit {
	updateForm: FormGroup;
	medicalRecord: MedicalRecord
	medicalRecord$: Observable<MedicalRecord>;
	medicalRecordDetailsUpdate: MedicalRecordDetailsUpdate
	constructor(private formBuilder: FormBuilder,
				private medicalRecordService: MedicalRecordService,
				private spiner: NgxSpinnerService) {}

	ngOnInit(): void {
		this.medicalRecord$ = this.medicalRecordService.getMedicalRecord$();
		this.medicalRecord$.subscribe((res) => {	
				this.spiner.show();
				this.medicalRecordDetailsUpdate = new MedicalRecordDetailsUpdate(res.medicalRecordId);
				this.medicalRecord = res
				this.medicalRecordDetailsUpdate.dermatologyExamination = res.details.dermatologyExamination;
				this.spiner.hide();
			})
		this.updateForm = this.formBuilder.group({
			dermatology: ['', [Validators.required]],
			dermatologyLevel: ['', [Validators.required]]
		});
	}

	onSubmit(): void {
		this.medicalRecord.details.dermatologyExamination.dermatology = this.updateForm.get("dermatology").value
		this.medicalRecord.details.dermatologyExamination.dermatologyLevel = Number(this.updateForm.get("dermatologyLevel").value)
	}
}
