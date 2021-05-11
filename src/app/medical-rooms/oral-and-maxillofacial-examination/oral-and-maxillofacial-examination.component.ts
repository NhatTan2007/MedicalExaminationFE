import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { MedicalRecordDetailsUpdate } from 'src/app/_shared/models/medicalExaminationDetails.Models';
import { MedicalRecord } from 'src/app/_shared/models/medicalRecord.Models';
import { MedicalRecordService } from 'src/app/_shared/services/medicalRecord/medical-record.service';
import { FormService } from 'src/app/_shared/services/form-service/form.service';


@Component({
  selector: 'app-oral-and-maxillofacial-examination',
  templateUrl: './oral-and-maxillofacial-examination.component.html',
  styleUrls: ['./oral-and-maxillofacial-examination.component.scss'],
})
export class OralAndMaxillofacialExaminationComponent implements OnInit {
  showErrors = false
  updateForm: FormGroup;
  medicalRecord: MedicalRecord
  medicalRecord$: Observable<MedicalRecord>;
  medicalRecordDetailUpdate: MedicalRecordDetailsUpdate

  constructor(private formBuilder: FormBuilder,
              private medicalRecordService:MedicalRecordService,
              private spiner:NgxSpinnerService,
              private formService: FormService) {}

  ngOnInit(): void {
    this.medicalRecord$ = this.medicalRecordService.getMedicalRecord$();
    this.medicalRecord$.subscribe((res) =>{
      this.spiner.show();
      this.medicalRecordDetailUpdate = new MedicalRecordDetailsUpdate(res.medicalRecordId)
      this.medicalRecord = res
      this.medicalRecordDetailUpdate.oralAndMaxillofacialExamination = res.details.oralAndMaxillofacialExamination;
      this.spiner.hide();
    })
    this.updateForm = this.formBuilder.group({
      upperJaw :['',[Validators.required]],
      lowerJaw :['',[Validators.required]],
      oralAndMaxillofacialDiseases :['',[Validators.required]],
      oralAndMaxillofacialLevel :['',[Validators.required]]
  });
  this.formService.form = this.updateForm;
}

  onSubmit(): void {
    if(this.updateForm.valid)
    {
    this.medicalRecord.details.oralAndMaxillofacialExamination.upperJaw= this.updateForm.get("upperJaw").value
    this.medicalRecord.details.oralAndMaxillofacialExamination.lowerJaw= this.updateForm.get("lowerJaw").value
    this.medicalRecord.details.oralAndMaxillofacialExamination.oralAndMaxillofacialDiseases= this.updateForm.get("oralAndMaxillofacialDiseases").value
		this.medicalRecord.details.oralAndMaxillofacialExamination.oralAndMaxillofacialLevel = Number(this.updateForm.get("oralAndMaxillofacialLevel").value)
    console.log("success");
    }
    else
    {
      console.log('false');
    }
  }

  isError(name: string){
		return this.formService.isError(name);
	}

	isTouched(name: string){
		return this.formService.isTouched(name);
	}

	hasError(name: string, errorName: string){
		return this.formService.hasError(name, errorName);
	}

}
