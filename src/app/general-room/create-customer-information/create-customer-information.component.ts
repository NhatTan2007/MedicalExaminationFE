import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
				private router: Router) { }

	ngOnInit(): void {
		this.createForm = this.formBuilder.group({
			firstName: ['', [Validators.required]],
			lastName: ['', [Validators.required]],
			dateOfBirth: ['', [Validators.required]],
			email: [''],
			adress: ['', [Validators.required]],
			phoneNumber: ['', [Validators.required, Validators.minLength(10), Validators.pattern("^0+[0-9\\s]*")]],
			identityNumber: ['', Validators.required],
			gender: [null, Validators.required],
			dateOfIssuanceIdentityNumber: ['', [Validators.required]],
			placeOfIssuanceIdentityNumber: ['', [Validators.required]]
		})
	}

	CreateCustomer(){
		console.log(this.createForm.valid)
		if(this.createForm.valid){
			let newCustomer = this.createForm.value as CreateCustomerReq
			newCustomer.gender = this.createForm.get("dateOfBirth").value == 0 ? false : true
			this.customerService.CreateCustomer(this.createForm.value as CreateCustomerReq)
				.subscribe((res) => {
					if(res.success) this.router.navigate(['']);
					console.log(res.customerId)
				})
		}
	}

	resetForm(){
		this.createForm.reset({
			firstName: '',
			lastName: '',
			dateOfBirth: '',
			email: '',
			adress: '',
			phoneNumber: '',
			identityNumber: '',
			gender: null,
			dateOfIssuanceIdentityNumber: '',
			placeOfIssuanceIdentityNumber: ''
		})
	}

}
