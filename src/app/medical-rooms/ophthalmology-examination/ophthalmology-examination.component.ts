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
	selector: 'app-ophthalmology-examination',
	templateUrl: './ophthalmology-examination.component.html',
	styleUrls: ['./ophthalmology-examination.component.scss'],
})

export class OphthalmologyExaminationComponent implements OnInit {
	showErrors = false
	leftError = false
	rightError = false
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
			this.medicalRecordDetailUpdate.ophthalmologyExamination = res.details.ophthalmologyExamination;
			this.updateForm = this.formBuilder.group({
				rightEyeSightWithoutGlass: [res.details.ophthalmologyExamination.rightEyeSightWithoutGlass],
				leftEyeSightWithoutGlass: [res.details.ophthalmologyExamination.leftEyeSightWithoutGlass],
				rightEyeSightWithGlass: [res.details.ophthalmologyExamination.rightEyeSightWithGlass],
				leftEyeSightWithGlass: [res.details.ophthalmologyExamination.leftEyeSightWithGlass],
				eyeDiseases: [res.details.ophthalmologyExamination.eyeDiseases, []],
				ophthalmologyLevel: [res.details.ophthalmologyExamination.ophthalmologyLevel == 0 ? 1 : res.details.ophthalmologyExamination.ophthalmologyLevel,
					 [Validators.required, Validators.min(1)]]
			});
			this.formService.form = this.updateForm;
			this.spiner.hide();
			if(this.updateForm.get('rightEyeSightWithoutGlass').value == this.updateForm.get('rightEyeSightWithGlass').value
			&&  this.updateForm.get('rightEyeSightWithGlass').value == '') this.rightError = true
			else this.rightError = false
			if(this.updateForm.get('leftEyeSightWithoutGlass').value == this.updateForm.get('leftEyeSightWithGlass').value
			&&  this.updateForm.get('leftEyeSightWithoutGlass').value == '') this.leftError = true
			else this.leftError = false
			console.log(`left: ${this.leftError}, right: ${this.rightError}`);
		})

	}

	onSubmit(): void {
		if (this.updateForm.valid && !this.leftError && !this.rightError) {
			this.showErrors = false
			this.medicalRecord.details.ophthalmologyExamination.rightEyeSightWithoutGlass = this.updateForm.get("rightEyeSightWithoutGlass").value
			this.medicalRecord.details.ophthalmologyExamination.leftEyeSightWithoutGlass = this.updateForm.get("leftEyeSightWithoutGlass").value
			this.medicalRecord.details.ophthalmologyExamination.rightEyeSightWithGlass = this.updateForm.get("rightEyeSightWithGlass").value
			this.medicalRecord.details.ophthalmologyExamination.leftEyeSightWithGlass = this.updateForm.get("leftEyeSightWithGlass").value
			this.medicalRecord.details.ophthalmologyExamination.eyeDiseases = this.updateForm.get("eyeDiseases").value
			this.medicalRecord.details.ophthalmologyExamination.ophthalmologyLevel = Number(this.updateForm.get("ophthalmologyLevel").value)
			this.medicalRecord.details.ophthalmologyExamination.doctorId = this.authService.userInfo.userId;
			this.medicalRecord.details.ophthalmologyExamination.doctorName = this.authService.userInfo.fullName;
			this.medicalRecord.details.ophthalmologyExamination.departmentId = this.authService.userInfo.departmentId;
			this.medicalRecordService.updateOphthalmologyExamination(this.medicalRecord.details.ophthalmologyExamination, this.medicalRecord.medicalRecordId)
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

	checkErrors(){
		if(this.updateForm.get('rightEyeSightWithoutGlass').value == this.updateForm.get('rightEyeSightWithGlass').value
		&&  this.updateForm.get('rightEyeSightWithGlass').value == '') this.rightError = true
		else this.rightError = false
		if(this.updateForm.get('leftEyeSightWithoutGlass').value == this.updateForm.get('leftEyeSightWithGlass').value
		&&  this.updateForm.get('leftEyeSightWithoutGlass').value == '') this.leftError = true
		else this.leftError = false
		console.log(`left: ${this.leftError}, right: ${this.rightError}`);
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
