import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { MedicalService, QuerryMSerciceRes, UpdateMedicalServiceReq } from 'src/app/_shared/models/medicalService.Models';
import { MedicalServiceService } from 'src/app/_shared/services/medical-service/medical-service.service';


@Component({
	selector: 'app-services-list',
	templateUrl: './services-list.component.html',
	styleUrls: ['./services-list.component.scss']
})
export class ServicesListComponent implements OnInit {
	medicalServices: MedicalService[] = []
	medicalService: MedicalService
	medicalServicesSearch$: Observable<QuerryMSerciceRes>
	medicalService$: Observable<QuerryMSerciceRes>
		listPageSize = [
		{label: "10", value: 10},
		{label: "20", value: 20},
		{label: "50", value: 50},
		{label: "100", value: 100}]
	pageSize = this.listPageSize[0]
	currentPage = 1
	totalMedicalSevices = 0
	key = ''
	ordinalNumber = (this.currentPage - 1) * this.pageSize.value

	constructor(private medicalServiceService: MedicalServiceService,
				private router: Router,
				private spinner: NgxSpinnerService) {}

	ngOnInit(): void {
		this.spinner.show();
		this.getServicesList(this.currentPage, this.pageSize.value)
	}

	getMedicalService(id: number): Observable<MedicalService>{
		return this.medicalServiceService.GetMedicalService(id);
	}


	getServicesList(currentPage: number, pageSize: number){
		this.medicalService$ = this.medicalServiceService.GetActiveMedicalServicesByPagination(currentPage, pageSize);
		this.medicalService$.subscribe((res) =>{
			this.medicalServices = res.medicalService
			this.totalMedicalSevices = res.totalMedicalSevices
			console.log(res)
			this.spinner.hide();
		}, () => {
			this.spinner.hide();
		})
		
		
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
					} else{
						this.getServicesList(this.currentPage, this.pageSize.value)
					}
				},
				() => {
					this.getServicesList(this.currentPage, this.pageSize.value)
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

	seachMedicalService(key: string, currentPage: number, pageSize: number){
		this.medicalServicesSearch$ = this.medicalServiceService.SearchMedicalService(key, currentPage, pageSize);
		this.medicalServicesSearch$.subscribe((res)=>{
			this.medicalServices = res.medicalService
			this.totalMedicalSevices = res.totalMedicalSevices
			console.log(res)
			this.spinner.hide();
				}, (err) => {
			this.spinner.hide();
		})
	}



	changePageSize(value: any){
		this.pageSize = value
		this.currentPage = 1
		if(this.key.trim() == ''){
			this.getServicesList(this.currentPage, this.pageSize.value);
		} else{
			this.seachMedicalService(this.key, this.currentPage, this.pageSize.value);
		}
	}

	changePage(){
		this.ordinalNumber = (this.currentPage - 1) * this.pageSize.value
		if(this.key.trim() == ''){
			this.getServicesList(this.currentPage, this.pageSize.value);
		} else{
			this.seachMedicalService(this.key, this.currentPage, this.pageSize.value);
		}
	}

	InputSearch(key: string){
		this.key = key.trim();
		if(this.key.trim() == ''){
			this.getServicesList(this.currentPage, this.pageSize.value);
		} else{
			this.seachMedicalService(this.key, this.currentPage, this.pageSize.value);
		}
	}
	
}
