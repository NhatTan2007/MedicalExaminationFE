import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Customer } from 'src/app/_shared/models/customer.Models';
import { CustomerService } from 'src/app/_shared/services/customer/customer.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-detail-customer',
  templateUrl: './detail-customer.component.html',
  styleUrls: ['./detail-customer.component.scss']
})
export class DetailCustomerComponent implements OnInit {
  	customer: Customer
	$customer: Observable<Customer>
	formModify: FormGroup
	update = false
	constructor(private activatedRoute: ActivatedRoute,
				private customerService: CustomerService,
				private router: Router,
				private spinner: NgxSpinnerService,
				private formBuilder: FormBuilder) { }

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
				email: [res.email,[Validators.required]],
				address: [res.address,[Validators.required]],
				phoneNumber: [res.phoneNumber,[Validators.required]],
				identityNumber: [res.identityNumber,[Validators.required]],
				gender: [res.gender,[Validators.required]],
				dateOfIssuanceIdentityNumber: [new Date(res.dateOfIssuanceIdentityNumber).toISOString().substring(0,10),[Validators.required]],
				placeOfIssuanceIdentityNumber: [res.placeOfIssuanceIdentityNumber,[Validators.required]],
			})
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
		let updateCustomer: Customer = this.formModify.value as Customer
		updateCustomer.customerId = this.customer.customerId
		updateCustomer.gender = this.formModify.get("gender").value == 0 ? false : true
		this.customerService.UpdateCustomer(updateCustomer).subscribe(
			(res) => {
				this.formModify.disable();
				// if(res.success) this.customer = res.customer
				// for (let key in res){
				// 	if(res.hasOwnProperty(key)){
				// 		console.log(res[key])
				// 	}
				// }
			},
			(err) => {
				console.log(err)
				this.restoreData()
      		}
		)
	}

	back(){
		this.formModify.disable();
		this.restoreData();
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

}
