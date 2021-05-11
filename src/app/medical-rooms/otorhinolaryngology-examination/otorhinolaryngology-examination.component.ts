import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { MedicalRecordDetailsUpdate } from 'src/app/_shared/models/medicalExaminationDetails.Models';
import { MedicalRecord } from 'src/app/_shared/models/medicalRecord.Models';
import { MedicalRecordService } from 'src/app/_shared/services/medicalRecord/medical-record.service';
import { FormService } from 'src/app/_shared/services/form-service/form.service';

@Component({
  selector: 'app-otorhinolaryngology-examination',
  templateUrl: './otorhinolaryngology-examination.component.html',
  styleUrls: ['./otorhinolaryngology-examination.component.scss'],
})
export class OtorhinolaryngologyExaminationComponent implements OnInit {
  showErrors = false;
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
      this.medicalRecordDetailUpdate.otorhinolaryngologyExamination = res.details.otorhinolaryngologyExamination;
      this.spiner.hide();
    })
    this.updateForm = this.formBuilder.group({
      leftEarNormal :['',[Validators.required]],
      rightEarNormal :['',[Validators.required]],
      leftEarWhisper :['',[Validators.required]],
      rightEarWhisper :['',[Validators.required]],
      otorhinolaryngologyDiseases :['',[Validators.required]],
      otorhinolaryngologyLevel :['',[Validators.required]]
    });
    this.formService.form = this.updateForm;
  }

  onSubmit(): void {
    if(this.updateForm.valid)
    {
      this.medicalRecord.details.otorhinolaryngologyExamination.leftEarNormal= this.updateForm.get("rightEyeSightWithoutGlass").value
      this.medicalRecord.details.otorhinolaryngologyExamination.rightEarNormal= this.updateForm.get("rightEarNormal").value
      this.medicalRecord.details.otorhinolaryngologyExamination.leftEarWhisper= this.updateForm.get("leftEarWhisper").value
      this.medicalRecord.details.otorhinolaryngologyExamination.rightEarWhisper= this.updateForm.get("rightEarWhisper").value
      this.medicalRecord.details.otorhinolaryngologyExamination.otorhinolaryngologyDiseases= this.updateForm.get("otorhinolaryngologyDiseases").value
      this.medicalRecord.details.otorhinolaryngologyExamination.otorhinolaryngologyLevel= Number(this.updateForm.get("otorhinolaryngologyLevel").value)

      console.log('success');
    }
    else
    {
      console.log('fail');
      this.showErrors = true;
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

