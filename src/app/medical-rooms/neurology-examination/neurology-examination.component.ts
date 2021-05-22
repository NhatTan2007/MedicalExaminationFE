import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { MedicalRecordService } from 'src/app/_shared/services/medicalRecord/medical-record.service';
import { MedicalRecord } from 'src/app/_shared/models/medicalRecord.Models';
import { Observable, Subject } from 'rxjs';
import { MedicalRecordDetailsUpdate } from 'src/app/_shared/models/medicalExaminationDetails.Models';
import { FormService } from 'src/app/_shared/services/form-service/form.service';
import { AuthService } from 'src/app/_shared/services/authService/auth-service.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
	selector: 'app-neurology-examination',
	templateUrl: './neurology-examination.component.html',
	styleUrls: ['./neurology-examination.component.scss'],
	providers: [FormService]
})
export class NeurologyExaminationComponent implements OnInit {
	showErrors = false
	updateForm: FormGroup;
	medicalRecord: MedicalRecord
	medicalRecord$: Observable<MedicalRecord>;
	medicalRecordDetailsUpdate: MedicalRecordDetailsUpdate
	constructor(private formBuilder: FormBuilder,
				private medicalRecordService: MedicalRecordService,
				private spiner: NgxSpinnerService,
				private formService: FormService,
				private authService: AuthService,
				private notification: NzNotificationService) { }

	ngOnInit(): void {
		this.medicalRecord$ = this.medicalRecordService.getMedicalRecord$();
		this.medicalRecord$.subscribe((res) => {
			this.spiner.show();
			this.medicalRecordDetailsUpdate = new MedicalRecordDetailsUpdate(res.medicalRecordId); // tao medical detai
			this.medicalRecord = res
			this.medicalRecordDetailsUpdate.neurologyExamination = res.details.neurologyExamination;
			this.updateForm = this.formBuilder.group({
				neurosurgery: [res.details.neurologyExamination.neurosurgery, [Validators.required]],
				neurosurgeryLevel: [res.details.neurologyExamination.neurosurgeryLevel == 0 ? 1 : res.details.neurologyExamination.neurosurgeryLevel,
					[Validators.required, Validators.min(1)]],
				psychiatry: [res.details.neurologyExamination.psychiatry, [Validators.required]],
				psychiatryLevel: [res.details.neurologyExamination.psychiatryLevel == 0 ? 1 : res.details.neurologyExamination.psychiatryLevel,
					[Validators.required, Validators.min(1)]]
			});
			this.formService.form = this.updateForm
			this.spiner.hide();
		})

	}

	onSubmit(): void {
		if (this.updateForm.valid) {
			this.showErrors = false
			this.medicalRecord.details.neurologyExamination.neurosurgery = this.updateForm.get("neurosurgery").value
			this.medicalRecord.details.neurologyExamination.neurosurgeryLevel = Number(this.updateForm.get("neurosurgeryLevel").value)
			this.medicalRecord.details.neurologyExamination.psychiatry = this.updateForm.get("psychiatry").value
			this.medicalRecord.details.neurologyExamination.psychiatryLevel = Number(this.updateForm.get("psychiatryLevel").value)
			this.medicalRecord.details.neurologyExamination.doctorId = this.authService.userInfo.userId;
			this.medicalRecord.details.neurologyExamination.doctorName = this.authService.userInfo.fullName;
			this.medicalRecord.details.neurologyExamination.departmentId = this.authService.userInfo.departmentId;
			this.medicalRecordService
			.updateNeurologyExamination(this.medicalRecord.details.neurologyExamination,
											this.medicalRecord.medicalRecordId)
				.subscribe((res) => {
					if(res.success) {
						this.medicalRecordService.getActiveMedicalRecord();
						this.notification.blank('Thành công', res.message, {nzClass: "success text-white", nzAnimate: true})
					} else{
						this.notification.blank('Thất bại', res.message, {nzClass: "error text-white", nzAnimate: true})
					}
				},(err) => {
					this.notification.blank('Thất bại', "Xin mời liên lạc với Quản trị viên", {nzClass: "error text-white", nzAnimate: true})
				})
		} else {
			this.showErrors = true
		}
	}

	isError(name: string) {
		return this.formService.isError(name);
	}

	isTouched(name: string) {
		return this.formService.isTouched(name);
	}

	hasError(name: string, errorName: string) {
		return this.formService.hasError(name, errorName);
	}
}
