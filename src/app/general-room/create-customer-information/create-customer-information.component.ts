import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CreateCustomerReq } from 'src/app/_shared/models/customer.Models';
import { CustomerService } from 'src/app/_shared/services/customer/customer.service';
import { FormService } from 'src/app/_shared/services/form-service/form.service';

@Component({
	selector: 'app-create-customer-information',
	templateUrl: './create-customer-information.component.html',
	styleUrls: ['./create-customer-information.component.scss'],
	providers:  [ FormService ]
})
export class CreateCustomerInformationComponent implements OnInit {
	createForm: FormGroup
	showErrors = false
	constructor(private customerService: CustomerService,
				private formBuilder: FormBuilder,
				private router: Router,
				private spiner: NgxSpinnerService,
				private formService: FormService) { }

	ngOnInit(): void {
		this.createForm = this.formBuilder.group({
			firstName: ['', [Validators.required]],
			lastName: ['', [Validators.required]],
			dateOfBirth: ['', [Validators.required]],
			email: [''],
			address: ['', [Validators.required]],
			phoneNumber: ['', [Validators.required, Validators.minLength(10), Validators.pattern("^0+[0-9\\s]*")]],
			identityNumber: ['', Validators.required],
			gender: [null, Validators.required],
			dateOfIssuanceIdentityNumber: ['', [Validators.required]],
			placeOfIssuanceIdentityNumber: ['', [Validators.required]]
		})
		this.formService.form = this.createForm;
	}

	createCustomer(){
		if(this.createForm.valid){
			this.showErrors = false;
			this.spiner.show();
			let newCustomer = this.createForm.value as CreateCustomerReq
			newCustomer.gender = this.createForm.get("gender").value==0 ? false : true
			console.log(newCustomer);
			this.customerService.CreateCustomer(this.createForm.value as CreateCustomerReq)
				.subscribe((res) => {
					if(res.success) this.router.navigate(['']);
				},() => {}, () => {this.spiner.hide()})
		} else {
			this.showErrors = true
		}
	}

	resetForm(){
		this.createForm.reset({
			firstName: '',
			lastName: '',
			dateOfBirth: '',
			email: '',
			address: '',
			phoneNumber: '',
			identityNumber: '',
			gender: null,
			dateOfIssuanceIdentityNumber: '',
			placeOfIssuanceIdentityNumber: ''
		})
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
