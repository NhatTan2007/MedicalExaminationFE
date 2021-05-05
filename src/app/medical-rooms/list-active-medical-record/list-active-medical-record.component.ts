import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MedicalRecordViewRes } from 'src/app/_shared/models/medicalRecord.Models';
import { MedicalRecordService } from 'src/app/_shared/services/medicalRecord/medical-record.service';

@Component({
  selector: 'app-list-active-medical-record',
  templateUrl: './list-active-medical-record.component.html',
  styleUrls: ['./list-active-medical-record.component.scss']
})
export class ListActiveMedicalRecordComponent implements OnInit {
	listActiveMedicalRecord: MedicalRecordViewRes[] = []
	constructor(private medicalRecordService: MedicalRecordService,
				private spiner: NgxSpinnerService) { }

	async ngOnInit(): Promise<void> {
		this.spiner.show();
		await this.getActiveMedicalRecord();
	}

	async getActiveMedicalRecord(){
		this.medicalRecordService.GetActiveMedicalRecord()
			.toPromise().then((res) => {
				this.listActiveMedicalRecord = <MedicalRecordViewRes[]>res
				this.spiner.hide()
			}, () => {this.spiner.hide()});
	}

	async getMedicalRecord(medicalRecordId: string){
		await this.medicalRecordService.GetMedicalRecord(medicalRecordId)
		.subscribe((res) => {
			this.medicalRecordService.medicalRecord = res
		})
	}
}