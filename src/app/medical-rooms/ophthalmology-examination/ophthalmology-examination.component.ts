import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { MedicalRecordDetailsUpdate } from 'src/app/_shared/models/medicalExaminationDetails.Models';
import { MedicalRecord } from 'src/app/_shared/models/medicalRecord.Models';
import { MedicalRecordService } from 'src/app/_shared/services/medicalRecord/medical-record.service';
import { FormService } from 'src/app/_shared/services/form-service/form.service';


@Component({
  selector: 'app-ophthalmology-examination',
  templateUrl: './ophthalmology-examination.component.html',
  styleUrls: ['./ophthalmology-examination.component.scss'],
})

export class OphthalmologyExaminationComponent implements OnInit {
  showErrors = false
  updateForm: FormGroup;
  medicalRecord: MedicalRecord
  medicalRecord$: Observable<MedicalRecord>;
  medicalRecordDetailUpdate: MedicalRecordDetailsUpdate

  constructor(private formBuilder: FormBuilder,
              private medicalRecordService:MedicalRecordService,
              private spiner:NgxSpinnerService,
              private formService:FormService) {}

  ngOnInit(): void {
    this.medicalRecord$ = this.medicalRecordService.getMedicalRecord$();
    this.medicalRecord$.subscribe((res) =>{
      this.spiner.show();
      this.medicalRecordDetailUpdate = new MedicalRecordDetailsUpdate(res.medicalRecordId)
      this.medicalRecord = res
      this.medicalRecordDetailUpdate.ophthalmologyExamination = res.details.ophthalmologyExamination;
      this.spiner.hide();
  })
  this.updateForm = this.formBuilder.group({
    rightEyeSightWithoutGlass :['',[Validators.required]],
    leftEyeSightWithoutGlass :['',[Validators.required]],
    rightEyeSightWithGlass :['',[Validators.required]],
    leftEyeSightWithGlass :['',[Validators.required]],
    eyeDiseases :['',[Validators.required]],
    ophthalmologyLevel :['',[Validators.required]]
  });
  this.formService.form = this.updateForm;
  }

  onSubmit(): void {
    if(this.updateForm.valid)
    {
      this.medicalRecord.details.ophthalmologyExamination.rightEyeSightWithoutGlass= this.updateForm.get("rightEyeSightWithoutGlass").value
      this.medicalRecord.details.ophthalmologyExamination.leftEyeSightWithoutGlass= this.updateForm.get("leftEyeSightWithoutGlass").value
      this.medicalRecord.details.ophthalmologyExamination.rightEyeSightWithGlass= this.updateForm.get("rightEyeSightWithGlass").value
      this.medicalRecord.details.ophthalmologyExamination.leftEyeSightWithGlass= this.updateForm.get("leftEyeSightWithGlass").value
      this.medicalRecord.details.ophthalmologyExamination.eyeDiseases= this.updateForm.get("eyeDiseases").value
      this.medicalRecord.details.ophthalmologyExamination.ophthalmologyLevel = Number(this.updateForm.get("ophthalmologyLevel").value)

      console.log('success');
    }
    else
    {
      this.showErrors = true;
      console.log("fail");
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
