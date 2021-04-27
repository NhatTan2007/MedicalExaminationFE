import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GeneralRoomRoutingModule } from './general-room-routing.module';
import { CreateNewPatientComponent } from './create-new-patient/create-new-patient.component';
import { GeneralRoomComponent } from './general-room.component';
import { CreateOgranizationExaminationComponent } from './create-ogranization-examination/create-ogranization-examination.component';
import { OgranizationListComponent } from './ogranization-list/ogranization-list.component';


@NgModule({
  declarations: [
    CreateNewPatientComponent,
    GeneralRoomComponent,
    CreateOgranizationExaminationComponent,
    OgranizationListComponent
  ],
  imports: [
    CommonModule,
    GeneralRoomRoutingModule
  ]
})
export class GeneralRoomModule { }
