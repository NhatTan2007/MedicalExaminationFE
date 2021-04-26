import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MedicalRoomsRoutingModule } from './medical-rooms-routing.module';
import { CreateOgranizationComponent } from './create-ogranization/create-ogranization.component';


@NgModule({
  declarations: [
    CreateOgranizationComponent
  ],
  imports: [
    CommonModule,
    MedicalRoomsRoutingModule
  ]
})
export class MedicalRoomsModule { }
