import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MedicalRecord, MedicalRecordViewRes } from 'src/app/_shared/models/medicalRecord.Models';
import { CustomerService } from 'src/app/_shared/services/customer/customer.service';
import { MedicalRecordService } from 'src/app/_shared/services/medicalRecord/medical-record.service';

@Component({
  selector: 'app-list-active-medical-record',
  templateUrl: './list-active-medical-record.component.html',
  styleUrls: ['./list-active-medical-record.component.scss']
})
export class ListActiveMedicalRecordComponent implements OnInit {
	listActiveMedicalRecord: MedicalRecordViewRes[] = []
	medicalRecord: MedicalRecord = new MedicalRecord('a');
	constructor(private medicalRecordService: MedicalRecordService,
				private customerService: CustomerService,
				private spiner: NgxSpinnerService) { }

	async ngOnInit(): Promise<void> {
		this.spiner.show();
		await this.getActiveMedicalRecord();
	}

	async getActiveMedicalRecord(){
		this.medicalRecordService.GetActiveMedicalRecord()
			.toPromise().then((res) => {
				this.listActiveMedicalRecord = <MedicalRecordViewRes[]>res;
				this.spiner.hide()
			}, () => {this.spiner.hide()});
	}

	async getMedicalRecord(medicalRecordId: string){
		await this.medicalRecordService.GetMedicalRecord(medicalRecordId)
		.subscribe((res) => {
			this.medicalRecord = res
			this.medicalRecordService.emitMedicalRecord(res);
		})
	}
}
