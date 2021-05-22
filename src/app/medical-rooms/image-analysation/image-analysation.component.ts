import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { MedicalRecordDetailsUpdate } from 'src/app/_shared/models/medicalExaminationDetails.Models';
import { MedicalRecord } from 'src/app/_shared/models/medicalRecord.Models';
import { AuthService } from 'src/app/_shared/services/authService/auth-service.service';
import { FormService } from 'src/app/_shared/services/form-service/form.service';
import { ImageService } from 'src/app/_shared/services/image-service/image-service.service';
import { MedicalRecordService } from 'src/app/_shared/services/medicalRecord/medical-record.service';

@Component({
	selector: 'app-image-analysation',
	templateUrl: './image-analysation.component.html',
	styleUrls: ['./image-analysation.component.scss'],
})
export class ImageAnalysationComponent implements OnInit {

	showAbdominalUltrasoundErrors = false;
	showBreastUltrasoundErrors = false;
	showCardiacUltrasoundProbesErrors = false;
	showThyroidUltrasoundErrors = false;
	showChestXrayErrors = false;
	updateAbdominalUltrasoundForm: FormGroup;
	updateBreastUltrasoundForm: FormGroup;
	updateCardiacUltrasoundProbesForm: FormGroup;
	updateThyroidUltrasoundForm: FormGroup;
	updateChestXrayForm: FormGroup;
	medicalRecord: MedicalRecord
	medicalRecord$: Observable<MedicalRecord>;
	medicalRecordDetailsUpdate: MedicalRecordDetailsUpdate
	constructor(
		private medicalRecordService: MedicalRecordService,
		private imageService: ImageService,
		private notification: NzNotificationService,
		private spiner: NgxSpinnerService,
		private formBuilder: FormBuilder,
		private formService: FormService,
		private authService: AuthService
	) { }

	ngOnInit(): void {
		this.medicalRecord$ = this.medicalRecordService.getMedicalRecord$();
		this.medicalRecord$.subscribe((res) => {
				this.spiner.show();
				this.medicalRecordDetailsUpdate = new MedicalRecordDetailsUpdate(res.medicalRecordId); // tao medical detai
				this.medicalRecord = res
				this.medicalRecordDetailsUpdate.abdominalUltrasound = res.details.abdominalUltrasound;
				this.medicalRecordDetailsUpdate.breastUltrasound = res.details.breastUltrasound;
				this.medicalRecordDetailsUpdate.cardiacUltrasoundProbes = res.details.cardiacUltrasoundProbes;
				this.medicalRecordDetailsUpdate.thyroidUltrasound = res.details.thyroidUltrasound;
				this.medicalRecordDetailsUpdate.chestXray = res.details.chestXray;
				this.updateAbdominalUltrasoundForm = this.formBuilder.group({
					abdominalUltrasoundResult: [res.details.abdominalUltrasound.abdominalUltrasoundResult, [Validators.required]],
				});
				this.updateBreastUltrasoundForm = this.formBuilder.group({
					breastUltrasoundResult: [res.details.breastUltrasound.breastUltrasoundResult, [Validators.required]],
				});
				this.updateCardiacUltrasoundProbesForm = this.formBuilder.group({
					cardiacUltrasoundProbesResult: [res.details.cardiacUltrasoundProbes.cardiacUltrasoundProbesResult, [Validators.required]],
				});
				this.updateThyroidUltrasoundForm = this.formBuilder.group({
					thyroidUltrasoundResult: [res.details.thyroidUltrasound.thyroidUltrasoundResult, [Validators.required]],
				});
				this.updateChestXrayForm = this.formBuilder.group({
					chestXrayResult: [res.details.chestXray.chestXrayResult, [Validators.required]],
				});
				this.spiner.hide();
			})
	}

	getInfo() {
		console.log(this.medicalRecord);
	}


	fileData: File = null;
	previewUrl: any = null;
	fileUploadProgress: string = null;
	uploadedFilePath: string = null;


	// The fileProgress method will called when the user choose file It will get the file object of selected file and store in the fileData.
	fileProgress(fileInput: any) {
		this.fileData = <File>fileInput.target.files[0];
		this.preview();
	}

	preview() {
		// Show preview
		var mimeType = this.fileData.type;
		if (mimeType.match(/image\/*/) == null) {
			return;
		}

		var reader = new FileReader();
		reader.readAsDataURL(this.fileData);
		reader.onload = (_event) => {
			this.previewUrl = reader.result;
		};
	}

	onSubmit() {
		const formData = new FormData();
		formData.append('file', this.fileData);
		this.imageService.uploadImage(formData).subscribe(
			(res) => {
				console.log('success');
			},
			(err) => {
				console.log(err);
			}
		);
	}

	onSubmitAbdominalUltrasound(): void {
		if (this.updateAbdominalUltrasoundForm.valid) {
			this.showAbdominalUltrasoundErrors = false;
			this.medicalRecord.details.abdominalUltrasound.abdominalUltrasoundResult
				= this.updateAbdominalUltrasoundForm.get("abdominalUltrasoundResult").value
			this.medicalRecord.details.abdominalUltrasound.doctorId = this.authService.userInfo.userId;
			this.medicalRecord.details.abdominalUltrasound.doctorName = this.authService.userInfo.fullName;
			this.medicalRecord.details.abdominalUltrasound.departmentId = this.authService.userInfo.departmentId;
			this.medicalRecordService.updateAbdominalUltrasound(this.medicalRecord.details.abdominalUltrasound,
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
			this.showAbdominalUltrasoundErrors = true;
		}
	}

	onSubmitThyroidUltrasound(): void {
		if (this.updateThyroidUltrasoundForm.valid) {
			this.showThyroidUltrasoundErrors = false;
			this.medicalRecord.details.thyroidUltrasound.thyroidUltrasoundResult
				= this.updateThyroidUltrasoundForm.get("thyroidUltrasoundResult").value
			this.medicalRecord.details.thyroidUltrasound.doctorId = this.authService.userInfo.userId;
			this.medicalRecord.details.thyroidUltrasound.doctorName = this.authService.userInfo.fullName;
			this.medicalRecord.details.thyroidUltrasound.departmentId = this.authService.userInfo.departmentId;
			this.medicalRecordService.updateThyroidUltrasound(this.medicalRecord.details.thyroidUltrasound,
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
			this.showThyroidUltrasoundErrors = true;
		}
	}

	onSubmitBreastUltrasound(): void {
		if (this.updateBreastUltrasoundForm.valid) {
			this.showBreastUltrasoundErrors = false;
			this.medicalRecord.details.breastUltrasound.breastUltrasoundResult
				= this.updateBreastUltrasoundForm.get("breastUltrasoundResult").value
			this.medicalRecord.details.breastUltrasound.doctorId = this.authService.userInfo.userId;
			this.medicalRecord.details.breastUltrasound.doctorName = this.authService.userInfo.fullName;
			this.medicalRecord.details.breastUltrasound.departmentId = this.authService.userInfo.departmentId;
			this.medicalRecordService.updateBreastUltrasound(this.medicalRecord.details.breastUltrasound,
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
			this.showBreastUltrasoundErrors = true;
		}
	}

	onSubmitCardiacUltrasoundProbes(): void {
		if (this.updateCardiacUltrasoundProbesForm.valid) {
			this.showCardiacUltrasoundProbesErrors = false;
			this.medicalRecord.details.cardiacUltrasoundProbes.cardiacUltrasoundProbesResult
				= this.updateCardiacUltrasoundProbesForm.get("cardiacUltrasoundProbesResult").value
			this.medicalRecord.details.cardiacUltrasoundProbes.doctorId = this.authService.userInfo.userId;
			this.medicalRecord.details.cardiacUltrasoundProbes.doctorName = this.authService.userInfo.fullName;
			this.medicalRecord.details.cardiacUltrasoundProbes.departmentId = this.authService.userInfo.departmentId;
			this.medicalRecordService.updateCardiacUltrasoundProbes(this.medicalRecord.details.cardiacUltrasoundProbes,
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
			this.showCardiacUltrasoundProbesErrors = true;
		}
	}

	onSubmitChestXray(): void {
		if (this.updateChestXrayForm.valid) {
			this.showChestXrayErrors = false;
			this.medicalRecord.details.chestXray.chestXrayResult
				= this.updateChestXrayForm.get("chestXrayResult").value
			this.medicalRecord.details.chestXray.doctorId = this.authService.userInfo.userId;
			this.medicalRecord.details.chestXray.doctorName = this.authService.userInfo.fullName;
			this.medicalRecord.details.chestXray.departmentId = this.authService.userInfo.departmentId;
			this.medicalRecordService.updateChestXray(this.medicalRecord.details.chestXray,
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
			this.showChestXrayErrors = true;
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
