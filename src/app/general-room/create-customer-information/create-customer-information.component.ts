import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CreateCustomerReq } from 'src/app/_shared/models/customer.Models';
import { CustomerService } from 'src/app/_shared/services/customer/customer.service';

@Component({
	selector: 'app-create-customer-information',
	templateUrl: './create-customer-information.component.html',
	styleUrls: ['./create-customer-information.component.scss']
})
export class CreateCustomerInformationComponent implements OnInit {
	createForm: FormGroup
	constructor(private customerService: CustomerService,
				private formBuilder: FormBuilder,
				private router: Router,
				private spiner: NgxSpinnerService) { }

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
	}

	CreateCustomer(){
		
		if(this.createForm.valid){
			this.spiner.show();
			let newCustomer = this.createForm.value as CreateCustomerReq
			newCustomer.gender = this.createForm.get("gender").value == 0 ? false : true
			console.log(newCustomer);
			this.customerService.CreateCustomer(this.createForm.value as CreateCustomerReq)
				.subscribe((res) => {
					if(res.success) this.router.navigate(['']);
				},() => {}, () => {this.spiner.hide()})
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

}
