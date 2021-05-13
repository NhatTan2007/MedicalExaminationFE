import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { MedicalRecordDetailsUpdate } from 'src/app/_shared/models/medicalExaminationDetails.Models';
import { MedicalRecord } from 'src/app/_shared/models/medicalRecord.Models';
import { MedicalRecordService } from 'src/app/_shared/services/medicalRecord/medical-record.service';
import { FormService } from 'src/app/_shared/services/form-service/form.service';

@Component({
  selector: 'app-internal-medicine-examination',
  templateUrl: './internal-medicine-examination.component.html',
  styleUrls: ['./internal-medicine-examination.component.scss'],
})
export class InternalMedicineExaminationComponent implements OnInit {
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
      this.medicalRecordDetailUpdate.internalMedicineExamination = res.details.internalMedicineExamination;
      this.spiner.hide();
  })
  this.updateForm = this.formBuilder.group({
    circulatory :['',[Validators.required]],
    circulatoryLevel :['',[Validators.required]],
    respiratory :['',[Validators.required]],
    respiratoryLevel :['',[Validators.required]],
    alimentary :['',[Validators.required]],
    alimentaryLevel :['',[Validators.required]],
    nephroUrology :['',[Validators.required]],
    nephroUrologyLevel :['',[Validators.required]],
    musculoskeletal :['',[Validators.required]],
    musculoskeletalLevel :['',[Validators.required]]
  });
  this.formService.form = this.updateForm;
  }

  onSubmit(): void {
    if(this.updateForm.valid)
    {
      this.medicalRecord.details.internalMedicineExamination.circulatory = this.updateForm.get("circulatory").value
      this.medicalRecord.details.internalMedicineExamination.circulatoryLevel = Number(this.updateForm.get("circulatoryLevel").value)
      this.medicalRecord.details.internalMedicineExamination.respiratory = this.updateForm.get("respiratory").value
      this.medicalRecord.details.internalMedicineExamination.respiratoryLevel = Number(this.updateForm.get("respiratoryLevel").value)
      this.medicalRecord.details.internalMedicineExamination.alimentary = this.updateForm.get("alimentary").value
      this.medicalRecord.details.internalMedicineExamination.alimentaryLevel = Number(this.updateForm.get("alimentaryLevel").value)
      this.medicalRecord.details.internalMedicineExamination.nephroUrology = this.updateForm.get("nephroUrology").value
      this.medicalRecord.details.internalMedicineExamination.nephroUrologyLevel = Number(this.updateForm.get("nephroUrologyLevel").value)
      this.medicalRecord.details.internalMedicineExamination.musculoskeletal = this.updateForm.get("musculoskeletal").value
      this.medicalRecord.details.internalMedicineExamination.musculoskeletalLevel = Number(this.updateForm.get("musculoskeletalLevel").value)
      console.log("success");
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





