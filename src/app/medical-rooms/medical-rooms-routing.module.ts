import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DermatologyExaminationComponent } from './dermatology-examination/dermatology-examination.component';
import { ImageAnalysationComponent } from './image-analysation/image-analysation.component';
import { InternalMedicineExaminationComponent } from './internal-medicine-examination/internal-medicine-examination.component';
import { MedicalGeneralDoctorComponent } from './medical-general-doctor/medical-general-doctor.component';
import { NeurologyExaminationComponent } from './neurology-examination/neurology-examination.component';
import { ObstetricsAndGynecologyExaminationComponent } from './obstetrics-and-gynecology-examination/obstetrics-and-gynecology-examination.component';
import { OphthalmologyExaminationComponent } from './ophthalmology-examination/ophthalmology-examination.component';
import { OralAndMaxillofacialExaminationComponent } from './oral-and-maxillofacial-examination/oral-and-maxillofacial-examination.component';
import { OtorhinolaryngologyExaminationComponent } from './otorhinolaryngology-examination/otorhinolaryngology-examination.component';
import { PhysicalExaminationComponent } from './physical-examination/physical-examination.component';
import { SurgeryExaminationComponent } from './surgery-examination/surgery-examination.component';
import { TestComponent } from './test/test.component';

const routes: Routes = [
  { path: 'bac-si-tong-quat', component: MedicalGeneralDoctorComponent },
  { path: 'chan-doan-hinh-anh', component: ImageAnalysationComponent },
  { path: 'xet-nghiem', component: TestComponent },
  { path: 'da-lieu', component:DermatologyExaminationComponent},
  { path: 'than-kinh', component: NeurologyExaminationComponent },
  { path: 'mat', component: OphthalmologyExaminationComponent },
  { path: 'rang-ham-mat',component:OralAndMaxillofacialExaminationComponent},
  { path: 'noi-khoa', component:InternalMedicineExaminationComponent},
  { path: 'phu-san', component:ObstetricsAndGynecologyExaminationComponent},
  { path: 'tai-mui-hong', component:OtorhinolaryngologyExaminationComponent},
  { path: 'the-luc', component:PhysicalExaminationComponent},
  { path: 'ngoai-khoa',component:SurgeryExaminationComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MedicalRoomsRoutingModule {}
