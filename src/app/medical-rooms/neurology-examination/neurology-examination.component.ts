import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { MedicalRecordService } from 'src/app/_shared/services/medicalRecord/medical-record.service';
import  {MedicalRecord} from 'src/app/_shared/models/medicalRecord.Models';
import { Observable, Subject } from 'rxjs';
import { MedicalRecordDetailsUpdate } from 'src/app/_shared/models/medicalExaminationDetails.Models';

@Component({
  selector: 'app-neurology-examination',
  templateUrl: './neurology-examination.component.html',
  styleUrls: ['./neurology-examination.component.scss'],
})
export class NeurologyExaminationComponent implements OnInit {
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
				this.medicalRecordDetailsUpdate = new MedicalRecordDetailsUpdate(res.medicalRecordId); // tao medical detai
				this.medicalRecord = res
				this.medicalRecordDetailsUpdate.neurologyExamination = res.details.neurologyExamination;
				this.spiner.hide();
			})
		this.updateForm = this.formBuilder.group({
			neurosurgery: ['', [Validators.required]],
			neurosurgeryLevel: ['', [Validators.required]],
      		psychiatry: ['', [Validators.required]],
			psychiatryLevel: ['', [Validators.required]]
		});
	}

	onSubmit(): void {
		this.medicalRecord.details.neurologyExamination.neurosurgery = this.updateForm.get("neurosurgery").value
		this.medicalRecord.details.neurologyExamination.neurosurgeryLevel = Number(this.updateForm.get("neurosurgeryLevel").value)
    	this.medicalRecord.details.neurologyExamination.psychiatry = this.updateForm.get("psychiatry").value
		this.medicalRecord.details.neurologyExamination.psychiatryLevel = Number(this.updateForm.get("psychiatryLevel").value)
    
    console.log("success");
  }
}
