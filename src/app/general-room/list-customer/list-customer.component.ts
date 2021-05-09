import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/_shared/services/customer/customer.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Customer } from 'src/app/_shared/models/customer.Models';

@Component({
	selector: 'app-list-customer',
	templateUrl: './list-customer.component.html',
	styleUrls: ['./list-customer.component.scss']
})
export class ListCustomerComponent implements OnInit {
customers: Customer[] =[]
customer: Customer
	constructor(private customerService: CustomerService,
				private router: Router,
				private spinner: NgxSpinnerService) { }

	ngOnInit(): void {
		this.spinner.show();
		this.GetCustomers();
	}

  GetCustomers(){
		this.customerService.GetCustomers()
			.toPromise<Customer[]>().then((res) => {
				this.customers = res
				this.spinner.hide();
			}, () => {this.spinner.hide()})
	}

  GetDetailCustomer(customerId: string){
		this.router.navigate(['/auth/phong-tong-hop/chi-tiet-benh-nhan', customerId])
	}

  SearchCustomer(keyword: string){
    if(keyword !== ''){
      this.customerService.SearchCustomer(keyword)
			.subscribe((res) => this.customers = res);
    }
	}
}
