import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GeneralRoomRoutingModule } from './general-room-routing.module';
import { CreateNewPatientComponent } from './create-new-patient/create-new-patient.component';
import { GeneralRoomComponent } from './general-room.component';
import { CreateOgranizationComponent } from "./create-ogranization/create-ogranization.component";
import { OrganizationDetailsComponent } from './organization-details/organization-details.component';
import { OgranizationListComponent } from './ogranization-list/ogranization-list.component';
import { ServicesListComponent } from './services-list/services-list.component';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";



@NgModule({
  declarations: [
    CreateNewPatientComponent,
    GeneralRoomComponent,
    OrganizationDetailsComponent,
    OgranizationListComponent,
    CreateOgranizationComponent,
    ServicesListComponent
  ],
  imports: [
    CommonModule,
    GeneralRoomRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class GeneralRoomModule { }
