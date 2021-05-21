import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { MedicalRecord, MedicalRecordViewRes } from 'src/app/_shared/models/medicalRecord.Models';
import { CustomerService } from 'src/app/_shared/services/customer/customer.service';
import { MedicalRecordService } from 'src/app/_shared/services/medicalRecord/medical-record.service';
import { DepartmentId } from '../../models/department.Models';
import { AuthService } from '../../services/authService/auth-service.service';

@Component({
  selector: 'app-list-active-medical-record',
  templateUrl: './list-active-medical-record.component.html',
  styleUrls: ['./list-active-medical-record.component.scss']
})
export class ListActiveMedicalRecordComponent implements OnInit {
	listActiveMedicalRecord: MedicalRecordViewRes[]
	medicalRecord: MedicalRecord = new MedicalRecord('a');
	constructor(private medicalRecordService: MedicalRecordService,
				private authService: AuthService,
				private spiner: NgxSpinnerService) { }

	ngOnInit(): void{
		this.spiner.show();
		this.authService.getUserInfo$().subscribe((res) => {
			if(res.departmentId == DepartmentId.tong_hop) this.medicalRecordService.getActiveMedicalRecordFinishedExamination()
			else this.medicalRecordService.getActiveMedicalRecord();
		})
		this.medicalRecordService.listActiveMedicalRecord$.asObservable()
			.subscribe(data => {
				this.listActiveMedicalRecord = data
			})
	}

	getMedicalRecord(medicalRecordId: string){
		this.medicalRecordService.GetMedicalRecord(medicalRecordId)
			.subscribe((res) => {
				this.medicalRecord = res
				this.medicalRecordService.emitMedicalRecord(res);
			})
	}
}
