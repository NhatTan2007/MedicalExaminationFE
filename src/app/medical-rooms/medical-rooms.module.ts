import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { MedicalRoomsRoutingModule } from './medical-rooms-routing.module';
import { MedicalRoomsComponent } from './medical-rooms.component';
import { MedicalGeneralDoctorComponent } from './medical-general-doctor/medical-general-doctor.component';
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
  ],
  imports: [
    CommonModule,
    MedicalRoomsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class MedicalRoomsModule {}
