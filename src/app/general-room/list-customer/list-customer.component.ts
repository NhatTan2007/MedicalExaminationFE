import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/_shared/services/customer/customer.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Customer, QuerryCustomersRes } from 'src/app/_shared/models/customer.Models';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-list-customer',
	templateUrl: './list-customer.component.html',
	styleUrls: ['./list-customer.component.scss']
})
export class ListCustomerComponent implements OnInit {
customers: Customer[] =[]
customers$: Observable<QuerryCustomersRes>
listPageSize = [
	{label: "10", value: 10},
	{label: "25", value: 25},
	{label: "50", value: 50},
	{label: "100", value: 100}]
pageSize = this.listPageSize[0]
currentPage = 1
totalCustomer = 0
customer: Customer
	constructor(private customerService: CustomerService,
				private router: Router,
				private spinner: NgxSpinnerService) { }

	ngOnInit(): void {
		this.spinner.show();
		this.GetCustomers(this.currentPage, this.pageSize.value);
	}

  	GetCustomers(currentPage, pageSize){
		this.customers$ = this.customerService.GetCustomersByPagination(currentPage, pageSize);
		this.customers$.subscribe((res) => {
			this.customers = res.customers
			this.totalCustomer = res.totalCustomer
			this.customers = this.customers.map(c => ({...c, fullName : `${c.lastName} ${c.firstName}`}))
			this.spinner.hide();
		}, (err) => {
			this.spinner.hide();
		})
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

	changePageSize(value: any){
		this.pageSize = value
		this.currentPage = 1
		this.GetCustomers(1, value.value)
	}

	changePage(){
		this.GetCustomers(this.currentPage, this.pageSize.value);
	}
}
