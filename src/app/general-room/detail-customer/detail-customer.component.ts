import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Customer } from 'src/app/_shared/models/customer.Models';
import { CustomerService } from 'src/app/_shared/services/customer/customer.service';
import { Observable } from 'rxjs';
import { FormService } from 'src/app/_shared/services/form-service/form.service';
import { MedicalRecord, MedicalRecordViewRes } from 'src/app/_shared/models/medicalRecord.Models';
import { MedicalRecordService } from 'src/app/_shared/services/medicalRecord/medical-record.service';
import { AExaminationRooms } from 'src/app/_shared/models/medicalExaminationDetails.Models';
import { MedicalService } from 'src/app/_shared/models/medicalService.Models';
import { MedicalServiceService } from 'src/app/_shared/services/medical-service/medical-service.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-detail-customer',
  templateUrl: './detail-customer.component.html',
  styleUrls: ['./detail-customer.component.scss'],
  providers:  [ FormService ]
})
export class DetailCustomerComponent implements OnInit {
  	customer: Customer
	$customer: Observable<Customer>
	formModify: FormGroup
	update = false
	showErrors = false;
	listMedicalRecord: MedicalRecordViewRes[]
	medicalRecord: MedicalRecord = new MedicalRecord('')
	medicalRecordDetails: AExaminationRooms[]
	listServicesRegisted: MedicalService[] = []
	totalAmount: number
	constructor(private activatedRoute: ActivatedRoute,
				private customerService: CustomerService,
				private medicalRecordService: MedicalRecordService,
				private router: Router,
				private spinner: NgxSpinnerService,
				private formBuilder: FormBuilder,
				private formService: FormService,
				private medicalService: MedicalServiceService,
				private notification: NzNotificationService) { }

  	async ngOnInit(): Promise<void> {
    this.spinner.show();
		let customerId = this.activatedRoute.snapshot.paramMap.get("customerId")
		this.$customer = this.getCustomer(customerId)
		this.$customer.subscribe((res) => {
			this.customer = res
			if(this.customer == null) this.router.navigate(['not-found'])
			this.formModify = this.formBuilder.group({
				firstName: [res.firstName,[Validators.required]],
				lastName: [res.lastName,[Validators.required]],
				dateOfBirth: [new Date(res.dateOfBirth).toISOString().substring(0,10),[Validators.required]],
				email: [res.email],
				address: [res.address,[Validators.required]],
				phoneNumber: [res.phoneNumber,[Validators.required, Validators.minLength(10), Validators.pattern("^0+[0-9\\s]*")]],
				identityNumber: [res.identityNumber,[Validators.required]],
				gender: [res.gender,[Validators.required]],
				dateOfIssuanceIdentityNumber: [new Date(res.dateOfIssuanceIdentityNumber).toISOString().substring(0,10),[Validators.required]],
				placeOfIssuanceIdentityNumber: [res.placeOfIssuanceIdentityNumber,[Validators.required]],
			})
			this.getMedicalRecordsByCustomerId(res.customerId);
			this.formService.form = this.formModify;
			this.formModify.disable();
			this.spinner.hide();
		})
  	}

  	getCustomer(id: string): Observable<Customer>{
		return this.customerService.GetCustomer(id)
	}
  
  	openUpdate(){
		this.update = true
		this.formModify.enable();
	}

  	updateCustomerInfo(){
		if(this.formModify.valid){
			this.showErrors = false;
			let updateCustomer: Customer = this.formModify.value as Customer
			updateCustomer.customerId = this.customer.customerId
			updateCustomer.gender = this.formModify.get("gender").value == 0 ? false : true
			this.customerService.UpdateCustomer(updateCustomer)
			.subscribe((res) => {
				this.update = false;
				this.formModify.disable();
				if(res.success) {
					this.notification.blank('Thành công', res.message, {nzClass: "success text-white", nzAnimate: true})
				} else{
					this.restoreData()
					this.notification.blank('Thất bại', res.message, {nzClass: "error text-white", nzAnimate: true})
				}
			},(err) => {
				this.restoreData()
				this.notification.blank('Thất bại', "Xin mời liên lạc với Quản trị viên", {nzClass: "error text-white", nzAnimate: true})
			})
		} else {
			this.showErrors = true;
		}
	}

	back(){
		this.formModify.disable();
		this.update = false
		this.restoreData();
	}

	getMedicalRecordsByCustomerId(customerId: string){
		this.medicalRecordService.getMedicalRecordsByCustomerId(customerId)
			.subscribe((res) => {
				this.listMedicalRecord = res
			})
	}

	getMedicalRecord(medicalRecordId: string){
		this.medicalRecordService.GetMedicalRecord(medicalRecordId)
			.subscribe((data) => {
				this.listServicesRegisted = []
				this.totalAmount = 0
				this.medicalRecord = data
				this.medicalRecordDetails = this.medicalRecordService.getListServicesFromMedicalRecord(data.details)
				this.medicalRecordDetails.forEach(s => {
					if(s.isRegistered){
						this.medicalService.GetMedicalService(s.mServiceId)
							.subscribe((res) => {
								if(res != null){
									this.listServicesRegisted.push(res)
									this.totalAmount += s.price
								}
							})
					}
				})
			})
	}

  	private restoreData(){
		this.formModify.reset(
			{
				firstName: this.customer.firstName,
				lastName: this.customer.lastName,
				dateOfBirth: new Date(this.customer.dateOfBirth).toISOString().substring(0,10),
				email: this.customer.email,
				address: this.customer.address,
				phoneNumber: this.customer.phoneNumber,
				identityNumber: this.customer.identityNumber,
				gender: this.customer.gender,
				dateOfIssuanceIdentityNumber: new Date(this.customer.dateOfIssuanceIdentityNumber).toISOString().substring(0,10),
				placeOfIssuanceIdentityNumber: this.customer.placeOfIssuanceIdentityNumber,
			}
		);
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
