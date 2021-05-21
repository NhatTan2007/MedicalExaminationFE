import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { FinalExaminationResult, MedicalRecordDetailsUpdate } from 'src/app/_shared/models/medicalExaminationDetails.Models';
import { MedicalRecord, MedicalRecordViewRes } from 'src/app/_shared/models/medicalRecord.Models';
import { AuthService } from 'src/app/_shared/services/authService/auth-service.service';
import { FormService } from 'src/app/_shared/services/form-service/form.service';
import { MedicalRecordService } from 'src/app/_shared/services/medicalRecord/medical-record.service';

@Component({
	selector: 'app-final-examination-result',
	templateUrl: './final-examination-result.component.html',
	styleUrls: ['./final-examination-result.component.scss']
})
export class FinalExaminationResultComponent implements OnInit {
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
		this.spiner.show();
		this.medicalRecord$ = this.medicalRecordService.getMedicalRecord$();
		this.medicalRecord$.subscribe((res) => {
			this.medicalRecordDetailsUpdate = new MedicalRecordDetailsUpdate(res.medicalRecordId); // tao medical detai
			this.medicalRecord = res
			this.medicalRecord.details.finalExaminationResult = this.medicalRecordDetailsUpdate.finalExaminationResult =
					res.details.finalExaminationResult != null ? res.details.finalExaminationResult : new FinalExaminationResult();
			this.updateForm = this.formBuilder.group({
				healthyLevel: [res.details.finalExaminationResult.healthyLevel == 0 ? 1 : res.details.finalExaminationResult.healthyLevel,
					[Validators.required, Validators.min(1)]],
				otherDiseases: [res.details.finalExaminationResult.otherDiseases, [Validators.required]],
			});
			this.formService.form = this.updateForm
			this.spiner.hide();
		})

	}

	onSubmit(): void {
		if (this.updateForm.valid) {
			this.showErrors = false
			this.medicalRecord.details.finalExaminationResult.otherDiseases = this.updateForm.get("otherDiseases").value
			this.medicalRecord.details.finalExaminationResult.healthyLevel = Number(this.updateForm.get("healthyLevel").value)
			this.medicalRecord.details.finalExaminationResult.doctorId = this.authService.userInfo.userId;
			this.medicalRecord.details.finalExaminationResult.doctorName = this.authService.userInfo.fullName;
			this.medicalRecord.details.finalExaminationResult.departmentId = this.authService.userInfo.departmentId;
			this.medicalRecordService
			.updateFinalExaminationResult(this.medicalRecord.details.finalExaminationResult,
											this.medicalRecord.medicalRecordId)
				.subscribe((res) => {
					if(res.success) {
						this.medicalRecordService.getActiveMedicalRecordFinishedExamination();
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
