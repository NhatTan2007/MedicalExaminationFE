import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, Subject } from 'rxjs';
import { MedicalRecordDetails, MedicalRecordDetailsUpdate } from 'src/app/_shared/models/medicalExaminationDetails.Models';
import { MedicalRecord } from 'src/app/_shared/models/medicalRecord.Models';
import { MedicalRecordService } from 'src/app/_shared/services/medicalRecord/medical-record.service';
import { FormService } from 'src/app/_shared/services/form-service/form.service';
import { AuthService } from 'src/app/_shared/services/authService/auth-service.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
	selector: 'app-dermatology-examination',
	templateUrl: './dermatology-examination.component.html',
	styleUrls: ['./dermatology-examination.component.scss'],
})
export class DermatologyExaminationComponent implements OnInit {
  	showErrors = false;
	updateForm: FormGroup;
	medicalRecord: MedicalRecord
	medicalRecord$: Observable<MedicalRecord>;
	medicalRecordDetailsUpdate: MedicalRecordDetailsUpdate
	constructor(private formBuilder: FormBuilder,
				private medicalRecordService: MedicalRecordService,
				private spiner: NgxSpinnerService,
        		private formService: FormService,
				private authService: AuthService,
				private notification: NzNotificationService) {}

	ngOnInit(): void {
		this.medicalRecord$ = this.medicalRecordService.getMedicalRecord$();
		this.medicalRecord$.subscribe((res) => {
				this.spiner.show();
				this.medicalRecordDetailsUpdate = new MedicalRecordDetailsUpdate(res.medicalRecordId); // tao medical detai
				this.medicalRecord = res
				this.medicalRecordDetailsUpdate.dermatologyExamination = res.details.dermatologyExamination;
				this.updateForm = this.formBuilder.group({
					dermatology: [res.details.dermatologyExamination.dermatology, [Validators.required]],
					dermatologyLevel: [res.details.dermatologyExamination.dermatologyLevel == 0 ? 1 : res.details.dermatologyExamination.dermatologyLevel,
						[Validators.required, Validators.min(1)]]
				});
				this.formService.form = this.updateForm;
				this.spiner.hide();
			})
	}

	onSubmit(): void {
		if(this.updateForm.valid)
		{
			this.medicalRecord.details.dermatologyExamination.dermatology = this.updateForm.get("dermatology").value
			this.medicalRecord.details.dermatologyExamination.dermatologyLevel = Number(this.updateForm.get("dermatologyLevel").value)
			this.medicalRecord.details.dermatologyExamination.doctorId = this.authService.userInfo.userId;
			this.medicalRecord.details.dermatologyExamination.doctorName = this.authService.userInfo.fullName;
			this.medicalRecord.details.dermatologyExamination.departmentId = this.authService.userInfo.departmentId;
			this.medicalRecordService
				.updateDermatologyExamination(this.medicalRecord.details.dermatologyExamination,
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
		}
		else
		{
			console.log('false');
			this.showErrors = true;
		}
  	}

  	isError(name: string){
		return this.formService.isError(name);
	}

	isTouched(name: string){
		return this.formService.isTouched(name);
	}

	hasError(name: string, errorName: string){
		return this.formService.hasError(name, errorName);
	}


}
