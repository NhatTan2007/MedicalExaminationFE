import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { MedicalService, UpdateMedicalServiceReq } from 'src/app/_shared/models/medicalService.Models';
import { MedicalServiceService } from 'src/app/_shared/services/medical-service/medical-service.service';


@Component({
	selector: 'app-services-list',
	templateUrl: './services-list.component.html',
	styleUrls: ['./services-list.component.scss']
})
export class ServicesListComponent implements OnInit {
medicalServices: MedicalService[] = []
medicalService: MedicalService
constructor(private medicalServiceService: MedicalServiceService,
			private router: Router,
			private spinner: NgxSpinnerService) {}

ngOnInit(): void {
	this.spinner.show();
	this.GetServicesList()
}

GetMedicalService(id: number): Observable<MedicalService>{
	return this.medicalServiceService.GetMedicalService(id);
}

GetServicesList(){
	this.medicalServiceService.GetMedicalServices()
		.toPromise<MedicalService[]>().then((res) => {
		this.medicalServices = res
		this.spinner.hide();
		}, () => {
			this.spinner.hide();
		})
}

SeachMedicalService(keyword: string){
	this.medicalServiceService.GetMedicalServiceByDepartmentId(keyword)
							.subscribe((res) => this.medicalServices = res);
}

openModify(service: MedicalService){
	let index = this.medicalServices.indexOf(service)
	if(index != -1){
		service.update = true
		}
	}

async updateMedicalServiceInfo(service: MedicalService){
	service.update = null
	this.medicalServiceService.UpdateMedicalServices(service as UpdateMedicalServiceReq).subscribe(
			(res) => {
				if(res.success) {
					service = res.medicalService
					service.update = false
					console.log(this.medicalServices)
				}
			}
		);
}

updatePrice(price: number, service: MedicalService){
	let index = this.medicalServices.indexOf(service)
	if(index != -1){
		service.price = Number(price)
	}
}
activeService(isactive: MedicalService){
	let index = this.medicalServices.indexOf(isactive)
	if(index != -1){
		isactive.isActive = true
	}
}
deactiveService(isactive: MedicalService){
	let index = this.medicalServices.indexOf(isactive)
	if(index != -1){
		isactive.isActive = false
	}
}
}
