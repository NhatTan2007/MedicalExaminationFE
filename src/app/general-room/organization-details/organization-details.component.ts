import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router} from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { Organization } from 'src/app/_shared/models/organization.Models';
import { OrganizationService } from 'src/app/_shared/services/organization/organization.service';

@Component({
	selector: 'app-create-ogranization-examination',
	templateUrl: './organization-details.component.html',
	styleUrls: ['./organization-details.component.scss']
})
export class OrganizationDetailsComponent implements OnInit {
	organization: Organization
	$organization: Observable<Organization>
	formModify: FormGroup
	update = false
	constructor(private activatedRoute: ActivatedRoute,
				private organizationService: OrganizationService,
				private router: Router,
				private  spinner: NgxSpinnerService,
				private formBuilder: FormBuilder){}

	async ngOnInit(): Promise<void> {
		this.spinner.show();
		let organizationId = this.activatedRoute.snapshot.paramMap.get("organizationId")
		this.$organization = this.getOrganization(organizationId)
		this.$organization.subscribe((res) => {
			this.organization = res
			if(this.organization == null) this.router.navigate(['not-found'])
			this.formModify = this.formBuilder.group({
				organizationName: [res.organizationName, [Validators.required]],
				organizationPhoneNumber: [res.organizationPhoneNumber],
				organizationEmail: [res.organizationEmail],
				organizationAddress: [res.organizationAddress, [Validators.required]],
				personContact: [res.personContact, [Validators.required]],
				emailContact: [res.emailContact, [Validators.required]],
				phoneContact: [res.phoneContact, [Validators.required]]
			})
			this.spinner.hide();
		})

	}

	getOrganization(id: string): Observable<Organization>{
		return this.organizationService.GetOrganization(id)
	}

	openUpdate(){
		this.update = true
	}

	updateOrganizationInfo(){
		this.update = false
		let updateOrganization: Organization = this.formModify.value as Organization
		updateOrganization.organizationId = this.organization.organizationId
		this.organizationService.UpdateOrganization(updateOrganization).subscribe(
			(res) => {
				if(res.success) this.organization = res.organization
				console.log(res)
			}
		);
	}

}
