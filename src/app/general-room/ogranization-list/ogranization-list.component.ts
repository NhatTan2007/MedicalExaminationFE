import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Organization } from 'src/app/_shared/models/organization.Models';
import { OrganizationService } from 'src/app/_shared/services/organization/organization.service';

@Component({
	selector: 'app-ogranization-list',
	templateUrl: './ogranization-list.component.html',
	styleUrls: ['./ogranization-list.component.scss']
})
export class OgranizationListComponent implements OnInit {
	createOrganizationPath = "/auth/phong-tong-hop/tao-to-chuc"
	organizations: Organization[] = []
	constructor(private organizationService: OrganizationService,
					private router: Router) {}

	ngOnInit(): void {
		this.GetOrganizations()
	}

	GetOrganizations(){
		this.organizationService.GetOrganizations().toPromise<Organization[]>().then(res => this.organizations = res)
	}

	GetDetailsOrganization(organizationId: string){
		this.router.navigate(['/auth/phong-tong-hop/chi-tiet', organizationId])
	}

	SearchOrganization(keyword: string){
		this.organizationService.SearchOrganizationByNameASC(keyword)
			.subscribe((res) => this.organizations = res);
	}
}
