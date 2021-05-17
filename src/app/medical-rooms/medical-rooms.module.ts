import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatTabsModule } from '@angular/material/tabs';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { SharedModule } from "../_shared/shared-module.module";

import { MedicalRoomsRoutingModule } from './medical-rooms-routing.module';
import { MedicalRoomsComponent } from './medical-rooms.component';
import { ImageAnalysationComponent } from './image-analysation/image-analysation.component';
import { TestComponent } from './test/test.component';
import { OphthalmologyExaminationComponent } from './ophthalmology-examination/ophthalmology-examination.component';
import { OralAndMaxillofacialExaminationComponent } from './oral-and-maxillofacial-examination/oral-and-maxillofacial-examination.component';
import { DermatologyExaminationComponent } from './dermatology-examination/dermatology-examination.component';
import { InternalMedicineExaminationComponent } from './internal-medicine-examination/internal-medicine-examination.component';
import { ObstetricsAndGynecologyExaminationComponent } from './obstetrics-and-gynecology-examination/obstetrics-and-gynecology-examination.component';
import { OtorhinolaryngologyExaminationComponent } from './otorhinolaryngology-examination/otorhinolaryngology-examination.component';
import { PhysicalExaminationComponent } from './physical-examination/physical-examination.component';
import { SurgeryExaminationComponent } from './surgery-examination/surgery-examination.component';
import { NeurologyExaminationComponent } from './neurology-examination/neurology-examination.component';
<<<<<<< HEAD

@NgModule({
	declarations: [
		MedicalRoomsComponent,
		NeurologyExaminationComponent,
		ImageAnalysationComponent,
		TestComponent,
		OphthalmologyExaminationComponent,
		OralAndMaxillofacialExaminationComponent,
		DermatologyExaminationComponent,
		InternalMedicineExaminationComponent,
		ObstetricsAndGynecologyExaminationComponent,
		OtorhinolaryngologyExaminationComponent,
		PhysicalExaminationComponent,
		SurgeryExaminationComponent
	],
	imports: [
		CommonModule,
		MedicalRoomsRoutingModule,
		ReactiveFormsModule,
		FormsModule,
		MatFormFieldModule,
		MatInputModule,
		MatIconModule,
		NgxSpinnerModule,
		MatButtonModule,
		MatRadioModule,
		NzNotificationModule,
		MatTabsModule,
		SharedModule
	]
=======
import { ListActiveMedicalRecordComponent } from './list-active-medical-record/list-active-medical-record.component';
import { CustomerInformationComponent } from './customer-information/customer-information.component';
import { NzNotificationModule } from 'ng-zorro-antd/notification';

@NgModule({
  declarations: [
    MedicalRoomsComponent,
    NeurologyExaminationComponent,
    MedicalGeneralDoctorComponent,
    ImageAnalysationComponent,
    TestComponent,
    OphthalmologyExaminationComponent,
    OralAndMaxillofacialExaminationComponent,
    DermatologyExaminationComponent,
    InternalMedicineExaminationComponent,
    ObstetricsAndGynecologyExaminationComponent,
    OtorhinolaryngologyExaminationComponent,
    PhysicalExaminationComponent,
    SurgeryExaminationComponent,
    ListActiveMedicalRecordComponent,
    CustomerInformationComponent,
  ],
  imports: [
    CommonModule,
    MedicalRoomsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    NgxSpinnerModule,
    MatButtonModule,
    MatRadioModule,
    NzNotificationModule
  ],
>>>>>>> dev
})
export class MedicalRoomsModule { }
