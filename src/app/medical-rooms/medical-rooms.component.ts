import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MedicalRecord } from '../_shared/models/medicalRecord.Models';
import { MedicalRecordService } from '../_shared/services/medicalRecord/medical-record.service';

@Component({
  selector: 'app-medical-rooms',
  templateUrl: './medical-rooms.component.html',
  styleUrls: ['./medical-rooms.component.scss']
})
export class MedicalRoomsComponent implements OnInit {
	medicalRecord$: Observable<MedicalRecord>
	medicalRecord: MedicalRecord
	constructor(private medicalRecordService: MedicalRecordService) { }

	ngOnInit(): void {
		this.medicalRecord$ = this.medicalRecordService.getMedicalRecord$();
		this.medicalRecord$.subscribe((res) => {	
			this.medicalRecord = res
		})
	}

  

}
