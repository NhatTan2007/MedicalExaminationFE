import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { MedicalRecordDetailsUpdate } from 'src/app/_shared/models/medicalExaminationDetails.Models';
import { MedicalRecord } from 'src/app/_shared/models/medicalRecord.Models';
import { MedicalRecordService } from 'src/app/_shared/services/medicalRecord/medical-record.service';
import { FormService } from 'src/app/_shared/services/form-service/form.service';

@Component({
  selector: 'app-physical-examination',
  templateUrl: './physical-examination.component.html',
  styleUrls: ['./physical-examination.component.scss'],
})
export class PhysicalExaminationComponent implements OnInit {
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
      this.medicalRecordDetailUpdate.physicalExamination = res.details.physicalExamination;
      this.spiner.hide();
    })
    this.updateForm = this.formBuilder.group({
      height :['',[Validators.required]],
      weight :['',[Validators.required]],
      bMIIndex :['',[Validators.required]],
      heartBeat :['',[Validators.required]],
      physicalLevel :['',[Validators.required]],
    });
    this.formService.form = this.updateForm;
  }

  onSubmit(): void {
    if(this.updateForm.valid)
    {
      this.medicalRecord.details.physicalExamination.height= this.updateForm.get("height").value
      this.medicalRecord.details.physicalExamination.weight= this.updateForm.get("weight").value
      this.medicalRecord.details.physicalExamination.bMIIndex= this.updateForm.get("bMIIndex").value
      this.medicalRecord.details.physicalExamination.heartBeat= this.updateForm.get("heartBeat").value
      this.medicalRecord.details.physicalExamination.physicalLevel= Number(this.updateForm.get("physicalLevel").value)

      console.log('success');
    }
    else
    {
      this.showErrors = true;
      console.log('fail');
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



