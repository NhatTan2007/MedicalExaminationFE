import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { MedicalRecordDetailsUpdate } from 'src/app/_shared/models/medicalExaminationDetails.Models';
import { MedicalRecord } from 'src/app/_shared/models/medicalRecord.Models';
import { MedicalRecordService } from 'src/app/_shared/services/medicalRecord/medical-record.service';
import { FormService } from 'src/app/_shared/services/form-service/form.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})
export class TestComponent implements OnInit {
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
      this.medicalRecordDetailUpdate.bloodTests = res.details.bloodTests;
      this.medicalRecordDetailUpdate.clinicalUrineTests = res.details.clinicalUrineTests;
      this.spiner.hide();
    })
    this.updateForm = this.formBuilder.group({
      hCAmount :['',[Validators.required]],
      leukocytesAmount :['',[Validators.required]],
      plateletsAmount :['',[Validators.required]],
      bloodSugar :['',[Validators.required]],
      ure :['',[Validators.required]],
      creatinin :['',[Validators.required]],
      aSATGOT :['',[Validators.required]],
      aLATGPT :['',[Validators.required]],
      sugar: [false,[Validators.required]],
      protein:[false,[Validators.required]],
      other: ['']

    });
    this.formService.form = this.updateForm;


  }
  onSubmit(): void {
    if(this.updateForm.valid)
    {
      this.medicalRecord.details.bloodTests.hCAmount= Number(this.updateForm.get("hCAmount").value)
      this.medicalRecord.details.bloodTests.leukocytesAmount= Number(this.updateForm.get("leukocytesAmount").value)
      this.medicalRecord.details.bloodTests.plateletsAmount= Number(this.updateForm.get("plateletsAmount").value)
      this.medicalRecord.details.bloodTests.bloodSugar= Number(this.updateForm.get("bloodSugar").value)
      this.medicalRecord.details.bloodTests.ure= Number(this.updateForm.get("ure").value)
      this.medicalRecord.details.bloodTests.creatinin= Number(this.updateForm.get("creatinin").value)
      this.medicalRecord.details.bloodTests.aSATGOT= Number(this.updateForm.get("aSATGOT").value)
      this.medicalRecord.details.bloodTests.aLATGPT= Number(this.updateForm.get("aLATGPT").value)
      this.medicalRecord.details.clinicalUrineTests.sugar = Number(this.updateForm.get("sugar").value) == 0 ? false : true
      this.medicalRecord.details.clinicalUrineTests.protein = Number(this.updateForm.get("protein").value) == 0 ? false : true
      this.medicalRecord.details.clinicalUrineTests.other = this.updateForm.get("other").value

      console.log('success')
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

