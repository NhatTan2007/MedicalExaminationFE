import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GeneralRoomRoutingModule } from './general-room-routing.module';
import { CreateNewPatientComponent } from './create-new-patient/create-new-patient.component';


@NgModule({
  declarations: [
    CreateNewPatientComponent
  ],
  imports: [
    CommonModule,
    GeneralRoomRoutingModule
  ]
})
export class GeneralRoomModule { }
