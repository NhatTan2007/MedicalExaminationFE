import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { MedicalRecordDetailsUpdate } from 'src/app/_shared/models/medicalExaminationDetails.Models';
import { MedicalRecord } from 'src/app/_shared/models/medicalRecord.Models';
import { MedicalRecordService } from 'src/app/_shared/services/medicalRecord/medical-record.service';
import { FormService } from 'src/app/_shared/services/form-service/form.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AuthService } from 'src/app/_shared/services/authService/auth-service.service';

@Component({
	selector: 'app-otorhinolaryngology-examination',
	templateUrl: './otorhinolaryngology-examination.component.html',
	styleUrls: ['./otorhinolaryngology-examination.component.scss'],
})
export class OtorhinolaryngologyExaminationComponent implements OnInit {
	showErrors = false;
	updateForm: FormGroup;
	medicalRecord: MedicalRecord
	medicalRecord$: Observable<MedicalRecord>;
	medicalRecordDetailUpdate: MedicalRecordDetailsUpdate

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
			this.medicalRecordDetailUpdate = new MedicalRecordDetailsUpdate(res.medicalRecordId)
			this.medicalRecord = res
			this.medicalRecordDetailUpdate.otorhinolaryngologyExamination = res.details.otorhinolaryngologyExamination;
			this.updateForm = this.formBuilder.group({
				leftEarNormal: [res.details.otorhinolaryngologyExamination.leftEarNormal == 0 ? '' : res.details.otorhinolaryngologyExamination.leftEarNormal,
				[Validators.required, Validators.min(0)]],
				rightEarNormal: [res.details.otorhinolaryngologyExamination.rightEarNormal == 0 ? '' : res.details.otorhinolaryngologyExamination.rightEarNormal,
				[Validators.required, Validators.min(0)]],
				leftEarWhisper: [res.details.otorhinolaryngologyExamination.leftEarWhisper == 0 ? '' : res.details.otorhinolaryngologyExamination.leftEarWhisper,
				[Validators.required, Validators.min(0)]],
				rightEarWhisper: [res.details.otorhinolaryngologyExamination.rightEarWhisper == 0 ? '' : res.details.otorhinolaryngologyExamination.rightEarWhisper,
				[Validators.required, Validators.min(0)]],
				otorhinolaryngologyDiseases: [res.details.otorhinolaryngologyExamination.otorhinolaryngologyDiseases],
				otorhinolaryngologyLevel: [res.details.otorhinolaryngologyExamination.otorhinolaryngologyLevel == 0 ? 1 : res.details.otorhinolaryngologyExamination.otorhinolaryngologyLevel,
					 [Validators.required, Validators.min(1)]]
			});
			this.formService.form = this.updateForm;
			this.spiner.hide();
		})

	}

	onSubmit(): void {
		if (this.updateForm.valid) {
			this.showErrors = false
			this.medicalRecord.details.otorhinolaryngologyExamination.leftEarNormal = this.updateForm.get("leftEarNormal").value
			this.medicalRecord.details.otorhinolaryngologyExamination.rightEarNormal = this.updateForm.get("rightEarNormal").value
			this.medicalRecord.details.otorhinolaryngologyExamination.leftEarWhisper = this.updateForm.get("leftEarWhisper").value
			this.medicalRecord.details.otorhinolaryngologyExamination.rightEarWhisper = this.updateForm.get("rightEarWhisper").value
			this.medicalRecord.details.otorhinolaryngologyExamination.otorhinolaryngologyDiseases = this.updateForm.get("otorhinolaryngologyDiseases").value
			this.medicalRecord.details.otorhinolaryngologyExamination.otorhinolaryngologyLevel = Number(this.updateForm.get("otorhinolaryngologyLevel").value)
			this.medicalRecord.details.otorhinolaryngologyExamination.doctorId = this.authService.userInfo.userId;
			this.medicalRecord.details.otorhinolaryngologyExamination.doctorName = this.authService.userInfo.fullName;
			this.medicalRecord.details.otorhinolaryngologyExamination.departmentId = this.authService.userInfo.departmentId;
			this.medicalRecordService.updateOtorhinolaryngologyExamination(this.medicalRecord.details.otorhinolaryngologyExamination,
				this.medicalRecord.medicalRecordId)
				.subscribe((res) => {
					if(res.success) {
						this.notification.blank('Thành công', res.message, {nzClass: "success text-white", nzAnimate: true})
					} else{
						this.notification.blank('Thất bại', res.message, {nzClass: "error text-white", nzAnimate: true})
					}
				},(err) => {
					this.notification.blank('Thất bại', "Xin mời liên lạc với Quản trị viên", {nzClass: "error text-white", nzAnimate: true})
				})
		}
		else {
			this.showErrors = true;
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

