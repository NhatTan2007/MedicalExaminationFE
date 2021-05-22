import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { Organization, QueryOrganizationRes } from 'src/app/_shared/models/organization.Models';
import { OrganizationService } from 'src/app/_shared/services/organization/organization.service';

@Component({
	selector: 'app-ogranization-list',
	templateUrl: './ogranization-list.component.html',
	styleUrls: ['./ogranization-list.component.scss']
})
export class OgranizationListComponent implements OnInit {
	createOrganizationPath = "/auth/phong-tong-hop/tao-to-chuc"
	organizations: Organization[] = []
	organizationsSearch$: Observable<QueryOrganizationRes>
	organization$: Observable<QueryOrganizationRes>
	listPageSize = [
		{label: "10", value: 10},
		{label: "20", value: 20},
		{label: "50", value: 50},
		{label: "100", value: 100}]
	pageSize = this.listPageSize[0]
	currentPage = 1
	totalOrganization = 0
	key = ''
	organization: Organization
	ordinalNumber = (this.currentPage - 1) * this.pageSize.value
	

	constructor(private organizationService: OrganizationService,
				private router: Router,
				private spinner: NgxSpinnerService){}

	ngOnInit(): void {
		this.spinner.show();
		this.GetOrganizations(this.currentPage, this.pageSize.value);
	}

	GetOrganizations(currentPage: number, pageSize: number){
		this.organization$ = this.organizationService.GetOrganizationsByPagination(currentPage, pageSize);
		this.organization$.subscribe((res) =>{
					this.organizations = res.organization
					this.totalOrganization = res.totalOrganization
					this.spinner.hide();
				},(err) => {
							this.spinner.hide();
						})
	}

	GetDetailsOrganization(organizationId: string){
		this.router.navigate(['/auth/phong-tong-hop/chi-tiet', organizationId])
	}

	SearchOrganization(key: string, currentPage: number, pageSize: number){
		this.organizationsSearch$ = this.organizationService.SearchOrganization(key, currentPage, pageSize);
		this.organizationsSearch$.subscribe((res )=>{
			this.organizations = res.organization
			this.totalOrganization = res.totalOrganization
			this.spinner.hide();
		}, (err) => {
			this.spinner.hide();		
		})
	
	}


	changePage(){
			this.ordinalNumber = (this.currentPage - 1) * this.pageSize.value
			if(this.key.trim() == ''){
				this.GetOrganizations(this.currentPage, this.pageSize.value);
			} else{
				this.SearchOrganization(this.key, this.currentPage, this.pageSize.value);
			}
		}

	changePageSize(value: any){
		this.pageSize = value
		this.currentPage = 1
		if(this.key.trim() == ''){
			this.GetOrganizations(this.currentPage, this.pageSize.value);
		} else{
			this.SearchOrganization(this.key, this.currentPage, this.pageSize.value);
		}
	}


	inputSearch(key: string){
		this.key = key.trim();
		if(this.key.trim() == ''){
			this.GetOrganizations(this.currentPage, this.pageSize.value);
		} else{
			this.SearchOrganization(this.key, this.currentPage, this.pageSize.value);
		}
	}
}
