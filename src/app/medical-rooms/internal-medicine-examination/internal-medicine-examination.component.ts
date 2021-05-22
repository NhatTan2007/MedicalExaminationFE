import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { MedicalRecordDetailsUpdate } from 'src/app/_shared/models/medicalExaminationDetails.Models';
import { MedicalRecord } from 'src/app/_shared/models/medicalRecord.Models';
import { MedicalRecordService } from 'src/app/_shared/services/medicalRecord/medical-record.service';
import { FormService } from 'src/app/_shared/services/form-service/form.service';
import { AuthService } from 'src/app/_shared/services/authService/auth-service.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
	selector: 'app-internal-medicine-examination',
	templateUrl: './internal-medicine-examination.component.html',
	styleUrls: ['./internal-medicine-examination.component.scss'],
	providers:  [ FormService ]
})
export class InternalMedicineExaminationComponent implements OnInit {
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
			this.medicalRecordDetailUpdate.internalMedicineExamination = res.details.internalMedicineExamination;
			this.updateForm = this.formBuilder.group({
				circulatory: [res.details.internalMedicineExamination.circulatory, [Validators.required]],
				circulatoryLevel: [res.details.internalMedicineExamination.circulatoryLevel == 0 ? 1 : res.details.internalMedicineExamination.circulatoryLevel,
					[Validators.required, Validators.min(1)]],
				respiratory: [res.details.internalMedicineExamination.respiratory, [Validators.required]],
				respiratoryLevel: [res.details.internalMedicineExamination.respiratoryLevel == 0 ? 1 : res.details.internalMedicineExamination.respiratoryLevel,
					[Validators.required, Validators.min(1)]],
				alimentary: [res.details.internalMedicineExamination.alimentary, [Validators.required]],
				alimentaryLevel: [res.details.internalMedicineExamination.alimentaryLevel == 0 ? 1 : res.details.internalMedicineExamination.alimentaryLevel,
					[Validators.required, Validators.min(1)]],
				nephroUrology: [res.details.internalMedicineExamination.nephroUrology, [Validators.required]],
				nephroUrologyLevel: [res.details.internalMedicineExamination.nephroUrologyLevel == 0 ? 1 : res.details.internalMedicineExamination.nephroUrologyLevel,
					[Validators.required, Validators.min(1)]],
				musculoskeletal: [res.details.internalMedicineExamination.musculoskeletal, [Validators.required]],
				musculoskeletalLevel: [res.details.internalMedicineExamination.musculoskeletalLevel == 0 ? 1 : res.details.internalMedicineExamination.musculoskeletalLevel,
					[Validators.required, Validators.min(1)]]
			});
			this.formService.form = this.updateForm;
			this.spiner.hide();
		})

	}

	onSubmit(): void {
		if (this.updateForm.valid && this.medicalRecord.details.internalMedicineExamination.isRegistered) {
			this.showErrors = false;
			this.medicalRecord.details.internalMedicineExamination.circulatory = this.updateForm.get("circulatory").value
			this.medicalRecord.details.internalMedicineExamination.circulatoryLevel = Number(this.updateForm.get("circulatoryLevel").value)
			this.medicalRecord.details.internalMedicineExamination.respiratory = this.updateForm.get("respiratory").value
			this.medicalRecord.details.internalMedicineExamination.respiratoryLevel = Number(this.updateForm.get("respiratoryLevel").value)
			this.medicalRecord.details.internalMedicineExamination.alimentary = this.updateForm.get("alimentary").value
			this.medicalRecord.details.internalMedicineExamination.alimentaryLevel = Number(this.updateForm.get("alimentaryLevel").value)
			this.medicalRecord.details.internalMedicineExamination.nephroUrology = this.updateForm.get("nephroUrology").value
			this.medicalRecord.details.internalMedicineExamination.nephroUrologyLevel = Number(this.updateForm.get("nephroUrologyLevel").value)
			this.medicalRecord.details.internalMedicineExamination.musculoskeletal = this.updateForm.get("musculoskeletal").value
			this.medicalRecord.details.internalMedicineExamination.musculoskeletalLevel = Number(this.updateForm.get("musculoskeletalLevel").value)
			this.medicalRecord.details.internalMedicineExamination.doctorId = this.authService.userInfo.userId;
			this.medicalRecord.details.internalMedicineExamination.doctorName = this.authService.userInfo.fullName;
			this.medicalRecord.details.internalMedicineExamination.departmentId = this.authService.userInfo.departmentId;
			this.medicalRecordService.updateInternalMedicineExamination(this.medicalRecord.details.internalMedicineExamination,
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





