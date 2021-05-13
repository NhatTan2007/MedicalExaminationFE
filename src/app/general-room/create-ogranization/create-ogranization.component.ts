import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateOrganizationReq } from 'src/app/_shared/models/organization.Models';
import { FormService } from 'src/app/_shared/services/form-service/form.service';
import { OrganizationService } from 'src/app/_shared/services/organization/organization.service';

@Component({
	selector: 'app-create-ogranization',
	templateUrl: './create-ogranization.component.html',
	styleUrls: ['./create-ogranization.component.scss'],
	providers:  [ FormService ]
})
export class CreateOgranizationComponent implements OnInit {
    createForm: FormGroup
	showErrors = false
	emailPattern = "([\w])+([\w._])*\@([\w{2,}\-])+(\.[\w]{2,4})$";
    constructor(private formBuilder: FormBuilder,
				private organizationService: OrganizationService,
				private formService: FormService) { }

    ngOnInit(): void {
		this.createForm = this.formBuilder.group(
			{
				organizationName: ['', [Validators.required]],
				organizationPhoneNumber: [''],
				organizationEmail: [''],
				organizationAddress: ['', [Validators.required, Validators.minLength(10)]],
				personContact: ['',[Validators.required]],
				emailContact: ['', [Validators.required]],
				phoneContact: ['', [Validators.required, Validators.minLength(10), Validators.pattern("^0+[0-9\\s]*")]]
			}
		)
		this.formService.form = this.createForm;
    }

	createOrganization(){
		if(this.createForm.valid){
			this.showErrors = false
			this.organizationService.CreateOrganization(this.createForm.value as CreateOrganizationReq)
				.subscribe((res) => {console.log(res)})
		} else this.showErrors = true
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

	isError(name: string){
		return this.formService.isError(name);
	}

	isTouched(name: string){
		return this.formService.isTouched(name);
	}

	hasError(name: string, errorName: string){
		return this.formService.hasError(name, errorName);
	}
}
