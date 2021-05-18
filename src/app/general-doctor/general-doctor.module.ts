import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { GeneralDoctorRoutingModule } from './general-doctor-routing.module';
import { GeneralDoctorComponent } from './general-doctor.component';
import { SharedModule } from "../_shared/shared-module.module";
import { ExaminationResultComponent } from './examination-result/examination-result/examination-result.component';
import { FinalExaminationResultComponent } from './final-examination-result/final-examination-result/final-examination-result.component';

@NgModule({
	declarations: [
		GeneralDoctorComponent,
  ExaminationResultComponent,
  FinalExaminationResultComponent
	],
	imports: [
		CommonModule,
		GeneralDoctorRoutingModule,
		MatInputModule,
		MatIconModule,
		NgxSpinnerModule,
		MatTabsModule,
		SharedModule,
		MatRadioModule,
		ReactiveFormsModule,
		FormsModule
	]
})
export class GeneralDoctorModule { }
