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
	customers: Customer[] = []
	customersSearch$: Observable<QuerryCustomersRes>
	customers$: Observable<QuerryCustomersRes>
	listPageSize = [
		{label: "10", value: 10},
		{label: "20", value: 20},
		{label: "50", value: 50},
		{label: "100", value: 100}]
	pageSize = this.listPageSize[0]
	currentPage = 1
	totalCustomer = 0
	key = ''
	customer: Customer
	ordinalNumber = (this.currentPage - 1) * this.pageSize.value
	constructor(private customerService: CustomerService,
				private router: Router,
				private spinner: NgxSpinnerService) { }

	ngOnInit(): void {
		this.spinner.show();
		this.GetCustomers(this.currentPage, this.pageSize.value);
	}

	GetCustomers(currentPage: number, pageSize: number){
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

  	SearchCustomers(key: string, currentPage: number, pageSize: number){
		this.customersSearch$ = this.customerService.SearchCustomer(key, currentPage, pageSize);
		this.customersSearch$.subscribe((res) => {
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


	changePageSize(value: any){
		this.pageSize = value
		this.currentPage = 1
		if(this.key.trim() == ''){
			this.GetCustomers(this.currentPage, this.pageSize.value);
		} else{
			this.SearchCustomers(this.key, this.currentPage, this.pageSize.value);
		}
	}
	changePage(){
		this.ordinalNumber = (this.currentPage - 1) * this.pageSize.value
		if(this.key.trim() == ''){
			this.GetCustomers(this.currentPage, this.pageSize.value);
		} else{
			this.SearchCustomers(this.key, this.currentPage, this.pageSize.value);
		}
	}

	InputSearch(key: string){
		this.key = key.trim();
		if(this.key.trim() == ''){
			this.GetCustomers(this.currentPage, this.pageSize.value);
		} else{
			this.SearchCustomers(this.key, this.currentPage, this.pageSize.value);
		}
	}
}
