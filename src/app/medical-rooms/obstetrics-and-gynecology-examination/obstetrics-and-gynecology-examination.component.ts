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
	selector: 'app-obstetrics-and-gynecology-examination',
	templateUrl: './obstetrics-and-gynecology-examination.component.html',
	styleUrls: ['./obstetrics-and-gynecology-examination.component.scss'],
	providers:  [ FormService ]
})
export class ObstetricsAndGynecologyExaminationComponent implements OnInit {
	showErrors = false
	updateForm: FormGroup;
	medicalRecord: MedicalRecord
	medicalRecord$: Observable<MedicalRecord>;
	medicalRecordDetailUpdate: MedicalRecordDetailsUpdate

	constructor(private formBuilder: FormBuilder,
				private medicalRecordService: MedicalRecordService,
				private spiner: NgxSpinnerService,
				private formService: FormService,
				private notification: NzNotificationService,
				private authService: AuthService) { }

	ngOnInit(): void {
		this.medicalRecord$ = this.medicalRecordService.getMedicalRecord$();
		this.medicalRecord$.subscribe((res) => {
			this.spiner.show();
			this.medicalRecordDetailUpdate = new MedicalRecordDetailsUpdate(res.medicalRecordId)
			this.medicalRecord = res
			this.medicalRecordDetailUpdate.obstetricsAndGynecologyExamination = res.details.obstetricsAndGynecologyExamination;
			this.updateForm = this.formBuilder.group({
				obstetricsAndGynecology: [res.details.obstetricsAndGynecologyExamination.obstetricsAndGynecology, [Validators.required]],
				obstetricsAndGynecologyLevel: 
				[res.details.obstetricsAndGynecologyExamination.obstetricsAndGynecologyLevel == 0 ? 1 : res.details.obstetricsAndGynecologyExamination.obstetricsAndGynecologyLevel,
					[Validators.required, Validators.min(1)]]
			});
			this.formService.form = this.updateForm;
			this.spiner.hide();
		})

	}

	onSubmit(): void {
		if (this.updateForm.valid) {
			this.showErrors = false;
			this.medicalRecord.details.obstetricsAndGynecologyExamination.obstetricsAndGynecology = this.updateForm.get("obstetricsAndGynecology").value
			this.medicalRecord.details.obstetricsAndGynecologyExamination.obstetricsAndGynecologyLevel = Number(this.updateForm.get("obstetricsAndGynecologyLevel").value)
			this.medicalRecord.details.obstetricsAndGynecologyExamination.doctorId = this.authService.userInfo.userId;
			this.medicalRecord.details.obstetricsAndGynecologyExamination.doctorName = this.authService.userInfo.fullName;
			this.medicalRecord.details.obstetricsAndGynecologyExamination.departmentId = this.authService.userInfo.departmentId;
			this.medicalRecordService.updateObstetricsAndGynecologyExamination(this.medicalRecord.details.obstetricsAndGynecologyExamination,
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
