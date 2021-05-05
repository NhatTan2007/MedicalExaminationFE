import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Customer } from 'src/app/_shared/models/customer.Models';
import { CustomerService } from 'src/app/_shared/services/customer/customer.service';
import { Observable } from 'rxjs';
import { promise } from 'selenium-webdriver';


@Component({
  selector: 'app-detail-customer',
  templateUrl: './detail-customer.component.html',
  styleUrls: ['./detail-customer.component.scss']
})
export class DetailCustomerComponent implements OnInit {
  customer: Customer
	$customer: Observable<Customer>
	formModify: FormGroup
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
        dateOfBirth: [res.dateOfBirth,[Validators.required]],
        email: [res.email,[Validators.required]],
        adress: [res.adress,[Validators.required]],
        phoneNumber: [res.phoneNumber,[Validators.required]],
        identityNumber: [res.identityNumber,[Validators.required]],
        gender: [res.gender,[Validators.required]],
        dateOfIssuanceIdentityNumber: [res.dateOfIssuanceIdentityNumber,[Validators.required]],
        placeOfIssuanceIdentityNumber: [res.placeOfIssuanceIdentityNumber,[Validators.required]],
			})
			this.spinner.hide();
		})
  }

  getCustomer(id: string): Observable<Customer>{
		return this.customerService.GetCustomer(id)
	}

}
