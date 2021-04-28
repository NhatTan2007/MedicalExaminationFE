import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateOrganizationReq } from 'src/app/_shared/models/organization.Models';
import { OrganizationService } from 'src/app/_shared/services/organization/organization.service';

@Component({
	selector: 'app-create-ogranization',
	templateUrl: './create-ogranization.component.html',
	styleUrls: ['./create-ogranization.component.scss']
})
export class CreateOgranizationComponent implements OnInit {
    createForm: FormGroup
	emailPattern = "([\w])+([\w._])*\@([\w{2,}\-])+(\.[\w]{2,4})$";
    constructor(private formBuilder: FormBuilder,
				private organizationService: OrganizationService) { }

    ngOnInit(): void {
		this.createForm = this.formBuilder.group(
			{
				organizationName: ['', [Validators.required]],
				organizationPhoneNumber: [''],
				organizationEmail: [''],
				organizationAddress: ['', [Validators.required, Validators.minLength(10)]],
				personContact: ['',[Validators.required]],
				emailContact: ['', [Validators.required]],
				phoneContact: ['', [Validators.required, Validators.minLength(10)]]
			}
		)
    }

	createOrganization(){
		console.log(this.createForm.valid)
		if(this.createForm.valid){
			this.organizationService.CreateOrganization(this.createForm.value as CreateOrganizationReq)
				.subscribe((res) => {console.log(res)})
		}
	}

	resetForm(){
		this.createForm.reset(
			{
				organizationName: '',
				organizationPhoneNumber: '',
				organizationEmail: '',
				organizationAddress: '',
				personContact: '',
				emailContact: '',
				phoneContact: ''
			}
		);
	}

}
