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
	previousTarget: any
	medicalRecord: MedicalRecord
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

	async getMedicalRecord($event: any, medicalRecordId: string){
		let target = $event.target.parentElement.parentElement;
		await this.medicalRecordService.GetMedicalRecord(medicalRecordId)
		.subscribe((res) => {
			if(this.previousTarget == null) {
				this.previousTarget = target
			} else if(this.previousTarget != null){
				this.previousTarget.style.backgroundColor = "transparent"
				this.previousTarget.firstElementChild.style.color = "#343a40"
				this.previousTarget = target
			}
			target.style.backgroundColor = "rgb(0 68 137 / 73%)"
			target.firstElementChild.style.color = "#fff"
			this.medicalRecord = res
			this.medicalRecordService.emitMedicalRecord(res);
		})
	}
}
