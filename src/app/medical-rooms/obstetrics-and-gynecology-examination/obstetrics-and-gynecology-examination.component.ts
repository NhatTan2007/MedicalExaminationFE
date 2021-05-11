import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { MedicalRecordDetailsUpdate } from 'src/app/_shared/models/medicalExaminationDetails.Models';
import { MedicalRecord } from 'src/app/_shared/models/medicalRecord.Models';
import { MedicalRecordService } from 'src/app/_shared/services/medicalRecord/medical-record.service';
import { FormService } from 'src/app/_shared/services/form-service/form.service';


@Component({
  selector: 'app-obstetrics-and-gynecology-examination',
  templateUrl: './obstetrics-and-gynecology-examination.component.html',
  styleUrls: ['./obstetrics-and-gynecology-examination.component.scss'],
})
export class ObstetricsAndGynecologyExaminationComponent implements OnInit {
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
      this.medicalRecordDetailUpdate.obstetricsAndGynecologyExamination = res.details.obstetricsAndGynecologyExamination;
      this.spiner.hide();
  })
  this.updateForm = this.formBuilder.group({
    obstetricsAndGynecology :['',[Validators.required]],
    obstetricsAndGynecologyLevel :['',[Validators.required]]
  });
   this.formService.form = this.updateForm;
  }

  onSubmit(): void {
    if(this.updateForm.valid)
    {
      this.medicalRecord.details.obstetricsAndGynecologyExamination.obstetricsAndGynecology = this.updateForm.get("obstetricsAndGynecology").value
      this.medicalRecord.details.obstetricsAndGynecologyExamination.obstetricsAndGynecologyLevel = Number(this.updateForm.get("obstetricsAndGynecologyLevel").value)
      console.log('success');
    }
    else
    {
      this.showErrors = true
      console.log("failse");
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
