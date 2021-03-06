import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Customer } from 'src/app/_shared/models/customer.Models';
import { AExaminationRooms, MedicalRecordDetails } from 'src/app/_shared/models/medicalExaminationDetails.Models';
import { CreateMedicalRecordReq } from 'src/app/_shared/models/medicalRecord.Models';
import { MedicalService } from 'src/app/_shared/models/medicalService.Models';
import { CustomerService } from 'src/app/_shared/services/customer/customer.service';
import { MedicalServiceService } from 'src/app/_shared/services/medical-service/medical-service.service';
import { MedicalRecordService } from 'src/app/_shared/services/medicalRecord/medical-record.service';
import { MatDialog } from '@angular/material/dialog';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-create-customer-examination',
	templateUrl: './create-customer-examination.component.html',
	styleUrls: ['./create-customer-examination.component.scss']
})
export class CreateCustomerExaminationComponent implements OnInit {
	customer: Customer
	customerIdentityNumber= ''
	isSearch = false
	getMedicalServices$: Observable<MedicalService[]>
	services: MedicalService[] = []
	medicalHistoryFrom: FormGroup
	selectedServices: MedicalService[] = []
	servicesInMedicalRecord: AExaminationRooms[] = []
	blockCreate = true
	showError = false;
	newMedicalRecord: CreateMedicalRecordReq
	constructor(private customerService: CustomerService,
				private medicalService: MedicalServiceService,
				private medicalRecordService: MedicalRecordService,
				private spiner: NgxSpinnerService,
				private formBuilder: FormBuilder,
				private router: Router,
				private dialog: MatDialog,
				private notification: NzNotificationService) { }

	ngOnInit(): void {
		this.getMedicalServices$ = this.medicalService.GetActiveMedicalServices();
	}

	openBlockDialog(){
		const dialogRef = this.dialog.open(BlockSubmitDialog);
		dialogRef.afterClosed().subscribe(res => {
		})
	}

	getCustomerByIdentityNumber(){
		this.spiner.show();
		this.customerService.GetCustomerByIdentityNumber(this.customerIdentityNumber)
			.toPromise().then(async (res) => {
				this.customer = res
				if(this.customer != null){
					this.getMedicalServices$.subscribe((res) => {
						this.services = res
						this.medicalHistoryFrom = this.formBuilder.group({
							reasonToExamination: ['', [Validators.required]],
							medicalHistoryFamilyHaveOrNot: [false, [Validators.required]],
							medicalHistoryFamilyDetails: [''],
							medicalHistoryCustomerHaveOrNot: [false, [Validators.required]],
							medicalHistoryCustomerDetails: [''],
							medicationsIsUsing: [''],
							pregnancyHistory: ['']
						})
					})

					this.customer.fullName = `${this.customer.lastName} ${this.customer.firstName}`
					this.newMedicalRecord = new CreateMedicalRecordReq(this.customer.customerId);
					this.isSearch = false;
					this.newMedicalRecord.customerLastName = this.customer.lastName;
					this.newMedicalRecord.customerFirstName = this.customer.firstName;
					this.servicesInMedicalRecord = await this.medicalRecordService.getListServicesFromMedicalRecord(this.newMedicalRecord.details);
				}
				if(this.customer == null) this.isSearch = true
				this.spiner.hide();
			})
	}

	cancelCreate(){
		this.customer = null
		this.newMedicalRecord = null
	}

	submitFirstStep(){
		if(this.medicalHistoryFrom.valid){
			this.showError = false;
			this.bindingDataFirstStep();
		} else {
			this.showError = true;
		}
	}

	selectServices(service: MedicalService, selected: boolean){
		let index = this.selectedServices.indexOf(service)
		if(selected && index == -1){
			this.selectedServices.push(service)
			this.newMedicalRecord.totalAmount += service.price
		}
		if(!selected && index != -1){
			this.selectedServices.splice(index, 1);
			this.newMedicalRecord.totalAmount -= service.price
		}
		if(this.selectedServices.length > 0) this.blockCreate = false
		else this.blockCreate = true
	}

	resetFirstStep(){
		this.medicalHistoryFrom.reset({
			reasonToExamination: '',
			medicalHistoryFamilyHaveOrNot: false,
			medicalHistoryFamilyDetails: '',
			medicalHistoryCustomerHaveOrNot: false,
			medicalHistoryCustomerDetails: '',
			medicationsIsUsing: '',
			pregnancyHistory: ''
		})
		this.bindingDataFirstStep();
	}


	private getValueFromField(nameField: string, form: FormGroup){
		return form.get(nameField).value;
	}

	private bindingDataFirstStep(){
		this.newMedicalRecord.reasonToExamination = this.getValueFromField("reasonToExamination", this.medicalHistoryFrom);
		this.newMedicalRecord.medicalHistory.medicalHistoryFamily.haveOrNot = this.getValueFromField("medicalHistoryFamilyHaveOrNot", this.medicalHistoryFrom) == 0 ? false : true;
		this.newMedicalRecord.medicalHistory.medicalHistoryFamily.details = this.getValueFromField("medicalHistoryFamilyDetails", this.medicalHistoryFrom);
		this.newMedicalRecord.medicalHistory.medicalHistoryCustomer.haveOrNot = this.getValueFromField("medicalHistoryCustomerHaveOrNot", this.medicalHistoryFrom) == 0 ? false : true;
		this.newMedicalRecord.medicalHistory.medicalHistoryCustomer.details = this.getValueFromField("medicalHistoryCustomerDetails", this.medicalHistoryFrom);
		this.newMedicalRecord.medicalHistory.anotherQuestions.medicationsIsUsing = this.getValueFromField("medicationsIsUsing", this.medicalHistoryFrom);
		this.newMedicalRecord.medicalHistory.anotherQuestions.pregnancyHistory = this.getValueFromField("pregnancyHistory", this.medicalHistoryFrom);
	}

	private isServiceRegisterd(service: AExaminationRooms): number{
		for (let index = 0; index < this.selectedServices.length; index++){
			if(this.selectedServices[index].mServiceId == service.mServiceId) return index
		}
		return -1
	}

	createMedicalRecord(){
		if(!this.blockCreate){
			for (let i = 0; i < this.servicesInMedicalRecord.length; i++) {
				let index = this.isServiceRegisterd(this.servicesInMedicalRecord[i])
				if(index != -1){
					this.servicesInMedicalRecord[i].isRegistered = true
					this.servicesInMedicalRecord[i].price = this.selectedServices[index].price
				}
			}
			this.newMedicalRecord.details = <MedicalRecordDetails>this.servicesInMedicalRecord.reduce((obj, value) => {
												obj[value.objName] = value;
												return obj;
											}, {})
			this.newMedicalRecord.isActive = true
			this.newMedicalRecord.isPaid = true
			this.newMedicalRecord.servicesRegisted = this.selectedServices.length;
			this.medicalRecordService.CreateMedicalRecord(this.newMedicalRecord)
				.subscribe((res) => {
					if(res.success) {
						this.notification.blank('Th??nh c??ng', res.message, {nzClass: "success text-white", nzAnimate: true})
						this.router.navigateByUrl('auth/phong-tong-hop/danh-sach-benh-an');
					} else{
						this.notification.blank('Th???t b???i', res.message, {nzClass: "error text-white", nzAnimate: true})
					}
				},(err) => {
					this.notification.blank('Th???t b???i', "Xin m???i li??n l???c v???i Qu???n tr??? vi??n", {nzClass: "error text-white", nzAnimate: true})
				})
		} else {this.openBlockDialog()};
	}

	GetDetailCustomer(customerId: string){
		this.router.navigate(['/auth/phong-tong-hop/chi-tiet-benh-nhan', customerId])
	}
}

@Component({
	selector: 'dialog-block',
	templateUrl: 'content-block-dialog.html',
})
export class BlockSubmitDialog {}
