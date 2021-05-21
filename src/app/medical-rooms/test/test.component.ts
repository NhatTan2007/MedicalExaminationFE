import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { MedicalRecordDetailsUpdate } from 'src/app/_shared/models/medicalExaminationDetails.Models';
import { MedicalRecord } from 'src/app/_shared/models/medicalRecord.Models';
import { MedicalRecordService } from 'src/app/_shared/services/medicalRecord/medical-record.service';
import { FormService } from 'src/app/_shared/services/form-service/form.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AuthService } from 'src/app/_shared/services/authService/auth-service.service';

@Component({
	selector: 'app-test',
	templateUrl: './test.component.html',
	styleUrls: ['./test.component.scss'],
})
export class TestComponent implements OnInit {
	showBloodTestsErrors = false;
	showClinicalUrineTestsErrors = false;
	updateBloodTestsForm: FormGroup;
	updateClinicalUrineTestsForm: FormGroup;
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
			this.medicalRecordDetailUpdate.bloodTests = res.details.bloodTests;
			this.medicalRecordDetailUpdate.clinicalUrineTests = res.details.clinicalUrineTests;
			this.updateBloodTestsForm = this.formBuilder.group({
				hcAmount: [res.details.bloodTests.hcAmount == 0 ? '' : res.details.bloodTests.hcAmount, [Validators.required, Validators.min(0)]],
				leukocytesAmount: [res.details.bloodTests.leukocytesAmount == 0 ? '' : res.details.bloodTests.leukocytesAmount,
					[Validators.required, Validators.min(0)]],
				plateletsAmount: [res.details.bloodTests.plateletsAmount == 0 ? '' : res.details.bloodTests.plateletsAmount,
					[Validators.required, Validators.min(0)]],
				bloodSugar: [res.details.bloodTests.bloodSugar == 0 ? '' : res.details.bloodTests.bloodSugar,
					[Validators.required, Validators.min(0)]],
				ure: [res.details.bloodTests.ure == 0 ? '' : res.details.bloodTests.ure,
					[Validators.required, Validators.min(0)]],
				creatinin: [res.details.bloodTests.creatinin == 0 ? '' : res.details.bloodTests.creatinin,
					[Validators.required, Validators.min(0)]],
				asatgot:[res.details.bloodTests.asatgot == 0 ? '' : res.details.bloodTests.asatgot,
					[Validators.required, Validators.min(0)]],
				alatgpt: [res.details.bloodTests.alatgpt == 0 ? '' : res.details.bloodTests.alatgpt,
					[Validators.required, Validators.min(0)]],
			});
			this.updateClinicalUrineTestsForm = this.formBuilder.group({
				sugar: [res.details.clinicalUrineTests.sugar, [Validators.required]],
				protein: [res.details.clinicalUrineTests.protein, [Validators.required]],
				other: [res.details.clinicalUrineTests.other]
			});
			this.spiner.hide();
		})

	}
	onSubmitBloodTests(): void {
		if (this.updateBloodTestsForm.valid) {
			this.showBloodTestsErrors = false;
			this.medicalRecord.details.bloodTests.hcAmount = Number(this.updateBloodTestsForm.get("hcAmount").value)
			this.medicalRecord.details.bloodTests.leukocytesAmount = Number(this.updateBloodTestsForm.get("leukocytesAmount").value)
			this.medicalRecord.details.bloodTests.plateletsAmount = Number(this.updateBloodTestsForm.get("plateletsAmount").value)
			this.medicalRecord.details.bloodTests.bloodSugar = Number(this.updateBloodTestsForm.get("bloodSugar").value)
			this.medicalRecord.details.bloodTests.ure = Number(this.updateBloodTestsForm.get("ure").value)
			this.medicalRecord.details.bloodTests.creatinin = Number(this.updateBloodTestsForm.get("creatinin").value)
			this.medicalRecord.details.bloodTests.asatgot = Number(this.updateBloodTestsForm.get("asatgot").value)
			this.medicalRecord.details.bloodTests.alatgpt = Number(this.updateBloodTestsForm.get("alatgpt").value)
			this.medicalRecord.details.bloodTests.doctorId = this.authService.userInfo.userId;
			this.medicalRecord.details.bloodTests.doctorName = this.authService.userInfo.fullName;
			this.medicalRecord.details.bloodTests.departmentId = this.authService.userInfo.departmentId;
			this.medicalRecordService.updateBloodTests(this.medicalRecord.details.bloodTests,
				this.medicalRecord.medicalRecordId)
					.subscribe((res) => {
						if (res.success) {
							this.notification.blank('Thành công', res.message, { nzClass: "success text-white", nzAnimate: true })
							this.medicalRecordService.getActiveMedicalRecord();
						} else {
							this.notification.blank('Thất bại', res.message, { nzClass: "error text-white", nzAnimate: true })
						}
					}, (err) => {
						this.notification.blank('Thất bại', "Xin mời liên lạc với Quản trị viên", { nzClass: "error text-white", nzAnimate: true })
					})
		}
		else {
			this.showBloodTestsErrors = true;
		}
	}

	onSubmitClinicalUrineTests(): void {
		if (this.updateClinicalUrineTestsForm.valid) {
			this.showClinicalUrineTestsErrors = false;
			this.medicalRecord.details.clinicalUrineTests.sugar = Number(this.updateClinicalUrineTestsForm.get("sugar").value) == 0 ? false : true
			this.medicalRecord.details.clinicalUrineTests.protein = Number(this.updateClinicalUrineTestsForm.get("protein").value) == 0 ? false : true
			this.medicalRecord.details.clinicalUrineTests.other = this.updateClinicalUrineTestsForm.get("other").value
			this.medicalRecord.details.clinicalUrineTests.doctorId = this.authService.userInfo.userId;
			this.medicalRecord.details.clinicalUrineTests.doctorName = this.authService.userInfo.fullName;
			this.medicalRecord.details.clinicalUrineTests.departmentId = this.authService.userInfo.departmentId;
			this.medicalRecordService.updateClinicalUrineTests(this.medicalRecord.details.clinicalUrineTests,
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
			this.showClinicalUrineTestsErrors = true;
		}
	}

	isError(form:FormGroup, name: string) {
		this.formService.form = form;
		return this.formService.isError(name);
	}

	isTouched(form:FormGroup, name: string) {
		this.formService.form = form;
		return this.formService.isTouched(name);
	}

	hasError(form:FormGroup, name: string, errorName: string) {
		this.formService.form = form;
		return this.formService.hasError(name, errorName);
	}
}

