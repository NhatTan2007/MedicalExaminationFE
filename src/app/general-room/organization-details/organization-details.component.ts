import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router} from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NgxSpinnerService } from 'ngx-spinner';
import { empty, Observable } from 'rxjs';
import { AExaminationRooms } from 'src/app/_shared/models/medicalExaminationDetails.Models';
import { Organization } from 'src/app/_shared/models/organization.Models';
import { FormService } from 'src/app/_shared/services/form-service/form.service';
import { OrganizationService } from 'src/app/_shared/services/organization/organization.service';

@Component({
	selector: 'app-create-ogranization-examination',
	templateUrl: './organization-details.component.html',
	styleUrls: ['./organization-details.component.scss'],
	providers:  [ FormService ]
})
export class OrganizationDetailsComponent implements OnInit {
	organization: Organization
	$organization: Observable<Organization>
	formModify: FormGroup
	showErrors = false
	update = false
	arr: AExaminationRooms[] = []
	constructor(private activatedRoute: ActivatedRoute,
				private organizationService: OrganizationService,
				private router: Router,
				private spinner: NgxSpinnerService,
				private formBuilder: FormBuilder,
				private formService: FormService,
				private notification: NzNotificationService){}

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
				emailContact: [res.emailContact, [Validators.required, Validators.pattern("(^[\\w])+([\\w._])*\@([\\w{2,}\\-])+(\\.[\\w]{2,4})$")]],
				phoneContact: [res.phoneContact, [Validators.required, Validators.minLength(10), Validators.pattern("^0+[0-9\\s]*")]]
			})
			this.formService.form = this.formModify;
			this.formModify.disable();
			this.spinner.hide();
		})
	}

	getOrganization(id: string): Observable<Organization>{
		return this.organizationService.GetOrganization(id)
	}

	openUpdate(){
		this.update = true
		this.formModify.enable();
	}

	updateOrganizationInfo(){
		if(this.formModify.valid){
			this.update = false
			this.showErrors = false;
			this.formModify.disable();
			let updateOrganization: Organization = this.formModify.value as Organization
			updateOrganization.organizationId = this.organization.organizationId
			this.organizationService.UpdateOrganization(updateOrganization)
			.subscribe((res) => {
				console.log(res)
				if(res.success) {
					if(res.success) this.organization = res.organization
					this.notification.blank('Thành công', res.message, {nzClass: "success text-white", nzAnimate: true})
				} else{
					this.notification.blank('Thất bại', res.message, {nzClass: "error text-white", nzAnimate: true})
				}
			},(err) => {
				this.notification.blank('Thất bại', "Xin mời liên lạc với Quản trị viên", {nzClass: "error text-white", nzAnimate: true})
			})
		} else{
			this.showErrors = true
		}
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
