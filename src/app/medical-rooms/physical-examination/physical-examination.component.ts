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
	selector: 'app-physical-examination',
	templateUrl: './physical-examination.component.html',
	styleUrls: ['./physical-examination.component.scss'],
})
export class PhysicalExaminationComponent implements OnInit {
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
			this.medicalRecordDetailUpdate.physicalExamination = res.details.physicalExamination;
			this.updateForm = this.formBuilder.group({
				height: [res.details.physicalExamination.height == 0 ? '' : res.details.physicalExamination.height,
					[Validators.required, Validators.min(0)]],
				weight: [res.details.physicalExamination.weight == 0 ? '' : res.details.physicalExamination.weight,
					[Validators.required, Validators.min(0)]],
				bmiIndex: [res.details.physicalExamination.bmiIndex == 0 ? '' : res.details.physicalExamination.bmiIndex,
					[Validators.required, Validators.min(0)]],
				heartBeat: [res.details.physicalExamination.heartBeat == 0 ? '' : res.details.physicalExamination.heartBeat,
					[Validators.required, Validators.min(0)]],
				bloodPressure: [res.details.physicalExamination.bloodPressure,
					[Validators.required]],
				physicalLevel: [res.details.physicalExamination.physicalLevel == 0 ? 1 : res.details.physicalExamination.physicalLevel,
					[Validators.required, Validators.min(1)]],
			});
			this.formService.form = this.updateForm;
			this.spiner.hide();
		})

	}

	onSubmit(): void {
		if (this.updateForm.valid) {
			this.showErrors = false
			this.medicalRecord.details.physicalExamination.height = Number(this.updateForm.get("height").value)
			this.medicalRecord.details.physicalExamination.weight = Number(this.updateForm.get("weight").value)
			this.medicalRecord.details.physicalExamination.bmiIndex = Number(this.updateForm.get("bmiIndex").value)
			this.medicalRecord.details.physicalExamination.heartBeat = Number(this.updateForm.get("heartBeat").value)
			this.medicalRecord.details.physicalExamination.bloodPressure = this.updateForm.get("bloodPressure").value
			this.medicalRecord.details.physicalExamination.physicalLevel = Number(this.updateForm.get("physicalLevel").value)
			this.medicalRecord.details.physicalExamination.doctorId = this.authService.userInfo.userId;
			this.medicalRecord.details.physicalExamination.doctorName = this.authService.userInfo.fullName;
			this.medicalRecord.details.physicalExamination.departmentId = this.authService.userInfo.departmentId;
			this.medicalRecordService.updatePhysicalExamination(this.medicalRecord.details.physicalExamination,
				this.medicalRecord.medicalRecordId)
				.subscribe((res) => {
					if (res.success) {
						this.medicalRecordService.getActiveMedicalRecord();
						this.notification.blank('Thành công', res.message, { nzClass: "success text-white", nzAnimate: true })
					} else {
						this.notification.blank('Thất bại', res.message, { nzClass: "error text-white", nzAnimate: true })
					}
				}, (err) => {
					this.notification.blank('Thất bại', "Xin mời liên lạc với Quản trị viên", { nzClass: "error text-white", nzAnimate: true })
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



