import { Component, OnInit } from '@angular/core';
import { MedicalServiceService } from './_shared/services/medical-service/medical-service.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
	title = 'MedicalExaminationFE';
	constructor(private medicalService: MedicalServiceService){}
	
	ngOnInit(): void {
		this.GetMedicalServices();
	}

	GetMedicalServices(){
		this.medicalService.GetMedicalServices().subscribe(
			res => {
				console.log(res);
			}
		);
	}
}
