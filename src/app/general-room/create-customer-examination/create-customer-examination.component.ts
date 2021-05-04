import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Customer } from 'src/app/_shared/models/customer.Models';
import { CreateMedicalRecordReq } from 'src/app/_shared/models/medicalRecord.Models';
import { MedicalService } from 'src/app/_shared/models/medicalService.Models';
import { CustomerService } from 'src/app/_shared/services/customer/customer.service';
import { MedicalServiceService } from 'src/app/_shared/services/medical-service/medical-service.service';
import { MedicalRecordService } from 'src/app/_shared/services/medicalRecord/medical-record.service';

@Component({
	selector: 'app-create-customer-examination',
	templateUrl: './create-customer-examination.component.html',
	styleUrls: ['./create-customer-examination.component.scss']
})
export class CreateCustomerExaminationComponent implements OnInit {
	customer: Customer
	customerIdentityNumber= ''
	isSearch = false
	services: MedicalService[] = []
	medicalHistoryFrom: FormGroup
	medicalServices: FormGroup
	newMedicalRecord: CreateMedicalRecordReq
	constructor(private customerService: CustomerService,
				private medicalService: MedicalServiceService,
				private medicalRecordService: MedicalRecordService,
				private spiner: NgxSpinnerService,
				private formBuilder: FormBuilder) { }

	ngOnInit(): void {
		this.spiner.show();
		this.getMedicalServices();
		this.medicalHistoryFrom = this.formBuilder.group({
			reasonToExamination: ['', Validators.required],
			medicalHistoryFamilyHaveOrNot: [false, [Validators.required]],
			medicalHistoryFamilyDetails: [''],
			medicalHistoryCustomerHaveOrNot: [false, [Validators.required]],
			medicalHistoryCustomerDetails: [''],
			medicationsIsUsing: [''],
			pregnancyHistory: ['']
		})
	}

	getCustomerByIdentityNumber(){
		this.spiner.show();
		this.customerService.GetCustomerByIdentityNumber(this.customerIdentityNumber)
			.subscribe((res) => {
				this.customer = res
				if(this.customer != null){
					this.customer.fullName = `${this.customer.lastName} ${this.customer.firstName}`
					this.newMedicalRecord = this.medicalRecordService.newMedicalRecord = new CreateMedicalRecordReq(this.customer.customerId);
					this.isSearch = false;
					this.spiner.hide();
				}
				if(this.customer == null) this.isSearch = true
			})
	}

	getMedicalServices(){
		this.medicalService.GetActiveMedicalServices().toPromise().then((res) => {
			this.services = res
			this.spiner.hide();
			console.log(this.services)
		})
	}

	submitFirstStep(){
		if(this.medicalHistoryFrom.valid){
			this.bindingDataStep1();
		}
		console.log(this.newMedicalRecord);
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
		this.bindingDataStep1();
	}

	getValueFromField(nameField: string, form: FormGroup){
		return form.get(nameField).value;
	}

	bindingDataStep1(){
		this.newMedicalRecord.reasonToExamination = this.getValueFromField("reasonToExamination", this.medicalHistoryFrom);
		this.newMedicalRecord.medicalHistory.medicalHistoryFamily.haveOrNot = this.getValueFromField("medicalHistoryFamilyHaveOrNot", this.medicalHistoryFrom);
		this.newMedicalRecord.medicalHistory.medicalHistoryFamily.details = this.getValueFromField("medicalHistoryFamilyDetails", this.medicalHistoryFrom);
		this.newMedicalRecord.medicalHistory.medicalHistoryCustomer.haveOrNot = this.getValueFromField("medicalHistoryCustomerHaveOrNot", this.medicalHistoryFrom);
		this.newMedicalRecord.medicalHistory.medicalHistoryCustomer.details = this.getValueFromField("medicalHistoryCustomerDetails", this.medicalHistoryFrom);
		this.newMedicalRecord.medicalHistory.anotherQuetions.medicationsIsUsing = this.getValueFromField("medicationsIsUsing", this.medicalHistoryFrom);
		this.newMedicalRecord.medicalHistory.anotherQuetions.pregnancyHistory = this.getValueFromField("pregnancyHistory", this.medicalHistoryFrom);
	}
}
