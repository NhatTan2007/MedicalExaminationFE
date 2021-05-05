import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';

import { GeneralRoomRoutingModule } from './general-room-routing.module';
import { GeneralRoomComponent } from './general-room.component';
import { CreateOgranizationComponent } from "./create-ogranization/create-ogranization.component";
import { OrganizationDetailsComponent } from './organization-details/organization-details.component';
import { OgranizationListComponent } from './ogranization-list/ogranization-list.component';
import { ServicesListComponent } from './services-list/services-list.component';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

import { NgxSpinnerModule } from 'ngx-spinner';

import { CreateCustomerExaminationComponent } from './create-customer-examination/create-customer-examination.component';
import { CreateCustomerInformationComponent } from './create-customer-information/create-customer-information.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from "@angular/material/core";
import { DetailCustomerComponent } from './detail-customer/detail-customer.component';

@NgModule({
  declarations: [
    GeneralRoomComponent,
    OrganizationDetailsComponent,
    OgranizationListComponent,
    CreateOgranizationComponent,

    ServicesListComponent,
    CreateCustomerExaminationComponent,
    CreateCustomerInformationComponent,
    DetailCustomerComponent,

  ],
  imports: [
    CommonModule,
    GeneralRoomRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxSpinnerModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GeneralRoomModule { }
