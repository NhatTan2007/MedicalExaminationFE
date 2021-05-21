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
	selector: 'app-surgery-examination',
	templateUrl: './surgery-examination.component.html',
	styleUrls: ['./surgery-examination.component.scss'],
})
export class SurgeryExaminationComponent implements OnInit {
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
			this.medicalRecordDetailUpdate.surgeryExamination = res.details.surgeryExamination;
			this.updateForm = this.formBuilder.group({
				surgery: [res.details.surgeryExamination.surgery, [Validators.required]],
				surgeryLevel: [res.details.surgeryExamination.surgeryLevel == 0 ? 1 : res.details.surgeryExamination.surgeryLevel,
					[Validators.required, Validators.min(1)]]
			});
			this.formService.form = this.updateForm
			this.spiner.hide();
		})

	}

	onSubmit(): void {
		if (this.updateForm.valid) {
			this.showErrors = false
			this.medicalRecord.details.surgeryExamination.surgery = this.updateForm.get("surgery").value
			this.medicalRecord.details.surgeryExamination.surgeryLevel = Number(this.updateForm.get("surgeryLevel").value)
			this.medicalRecord.details.surgeryExamination.doctorId = this.authService.userInfo.userId;
			this.medicalRecord.details.surgeryExamination.doctorName = this.authService.userInfo.fullName;
			this.medicalRecord.details.surgeryExamination.departmentId = this.authService.userInfo.departmentId;
			this.medicalRecordService.updateSurgeryExamination(this.medicalRecord.details.surgeryExamination,
			this.medicalRecord.medicalRecordId)
				.subscribe((res) => {
					if (res.success) {
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

