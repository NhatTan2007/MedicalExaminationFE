import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { MedicalRecordDetailsUpdate } from 'src/app/_shared/models/medicalExaminationDetails.Models';
import { MedicalRecord } from 'src/app/_shared/models/medicalRecord.Models';
import { MedicalRecordService } from 'src/app/_shared/services/medicalRecord/medical-record.service';


@Component({
  selector: 'app-surgery-examination',
  templateUrl: './surgery-examination.component.html',
  styleUrls: ['./surgery-examination.component.scss'],
})
export class SurgeryExaminationComponent implements OnInit {
  updateForm: FormGroup;
  medicalRecord: MedicalRecord
  medicalRecord$: Observable<MedicalRecord>;
  medicalRecordDetailUpdate: MedicalRecordDetailsUpdate

  constructor(private formBuilder: FormBuilder,
              private medicalRecordService:MedicalRecordService,
              private spiner:NgxSpinnerService) {}

  ngOnInit(): void {
    this.medicalRecord$ = this.medicalRecordService.getMedicalRecord$();
    this.medicalRecord$.subscribe((res) =>{
      this.spiner.show();
      this.medicalRecordDetailUpdate = new MedicalRecordDetailsUpdate(res.medicalRecordId)
      this.medicalRecord = res
      this.medicalRecordDetailUpdate.surgeryExamination = res.details.surgeryExamination;
      this.spiner.hide();
    })
    this.updateForm = this.formBuilder.group({
      surgery :['',[Validators.required]],
      surgeryLevel :['',[Validators.required]]
    });
  }

  onSubmit(): void {
    this.medicalRecord.details.surgeryExamination.surgery= this.updateForm.get("surgery").value
    this.medicalRecord.details.surgeryExamination.surgeryLevel= Number(this.updateForm.get("surgeryLevel").value)
  }
}

