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
	selector: 'app-oral-and-maxillofacial-examination',
	templateUrl: './oral-and-maxillofacial-examination.component.html',
	styleUrls: ['./oral-and-maxillofacial-examination.component.scss'],
})
export class OralAndMaxillofacialExaminationComponent implements OnInit {
	showErrors = false
	updateForm: FormGroup;
	medicalRecord: MedicalRecord
	medicalRecord$: Observable<MedicalRecord>;
	medicalRecordDetailUpdate: MedicalRecordDetailsUpdate

	constructor(private formBuilder: FormBuilder,
				private medicalRecordService: MedicalRecordService,
				private spiner: NgxSpinnerService,
				private formService: FormService,
				private authService : AuthService,
				private notification: NzNotificationService) { }

	ngOnInit(): void {
		this.medicalRecord$ = this.medicalRecordService.getMedicalRecord$();
		this.medicalRecord$.subscribe((res) => {
			this.spiner.show();
			this.medicalRecordDetailUpdate = new MedicalRecordDetailsUpdate(res.medicalRecordId)
			this.medicalRecord = res
			this.medicalRecordDetailUpdate.oralAndMaxillofacialExamination = res.details.oralAndMaxillofacialExamination;
			this.updateForm = this.formBuilder.group({
				upperJaw: [res.details.oralAndMaxillofacialExamination.upperJaw, [Validators.required]],
				lowerJaw: [res.details.oralAndMaxillofacialExamination.lowerJaw, [Validators.required]],
				oralAndMaxillofacialDiseases: [res.details.oralAndMaxillofacialExamination.oralAndMaxillofacialDiseases],
				oralAndMaxillofacialLevel: 
				[res.details.oralAndMaxillofacialExamination.oralAndMaxillofacialLevel == 0 ? 1 : res.details.oralAndMaxillofacialExamination.oralAndMaxillofacialLevel,
					[Validators.required, Validators.min(1)]]
			});
			this.formService.form = this.updateForm;
			this.spiner.hide();
		})

	}

	onSubmit(): void {
		if (this.updateForm.valid) {
			this.showErrors = false
			this.medicalRecord.details.oralAndMaxillofacialExamination.upperJaw = this.updateForm.get("upperJaw").value
			this.medicalRecord.details.oralAndMaxillofacialExamination.lowerJaw = this.updateForm.get("lowerJaw").value
			this.medicalRecord.details.oralAndMaxillofacialExamination.oralAndMaxillofacialDiseases = this.updateForm.get("oralAndMaxillofacialDiseases").value
			this.medicalRecord.details.oralAndMaxillofacialExamination.oralAndMaxillofacialLevel = Number(this.updateForm.get("oralAndMaxillofacialLevel").value)
			this.medicalRecord.details.oralAndMaxillofacialExamination.doctorId = this.authService.userInfo.userId;
			this.medicalRecord.details.oralAndMaxillofacialExamination.doctorName = this.authService.userInfo.fullName;
			this.medicalRecord.details.oralAndMaxillofacialExamination.departmentId = this.authService.userInfo.departmentId;
			this.medicalRecordService.updateOralAndMaxillofacialExamination(this.medicalRecord.details.oralAndMaxillofacialExamination,
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
