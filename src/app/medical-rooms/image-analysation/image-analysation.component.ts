import { Component, OnInit } from '@angular/core';
import { MedicalRecord } from 'src/app/_shared/models/medicalRecord.Models';
import { MedicalRecordService } from 'src/app/_shared/services/medicalRecord/medical-record.service';

@Component({
  selector: 'app-image-analysation',
  templateUrl: './image-analysation.component.html',
  styleUrls: ['./image-analysation.component.scss'],
})
export class ImageAnalysationComponent implements OnInit {
  medicalRecord: MedicalRecord;
  constructor(private medicalRecordService: MedicalRecordService) {}

  ngOnInit(): void {
    this.medicalRecord = this.medicalRecordService.medicalRecord;
  }

  getInfo() {
    console.log(this.medicalRecord);
  }
}
