import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { NgxSpinnerModule } from 'ngx-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button'; 
import { MatStepperModule } from '@angular/material/stepper';

import { GeneralRoomRoutingModule } from './general-room-routing.module';
import { GeneralRoomComponent } from './general-room.component';
import { CreateOgranizationComponent } from "./create-ogranization/create-ogranization.component";
import { OrganizationDetailsComponent } from './organization-details/organization-details.component';
import { OgranizationListComponent } from './ogranization-list/ogranization-list.component';
import { ServicesListComponent } from './services-list/services-list.component';
import { CreateCustomerExaminationComponent } from './create-customer-examination/create-customer-examination.component';
import { CreateCustomerInformationComponent } from './create-customer-information/create-customer-information.component';


@NgModule({
	declarations: [
		GeneralRoomComponent,
		OrganizationDetailsComponent,
		OgranizationListComponent,
		CreateOgranizationComponent,
		ServicesListComponent,
		CreateCustomerExaminationComponent,
		CreateCustomerInformationComponent,
	],
	imports: [
		CommonModule,
		GeneralRoomRoutingModule,
		ReactiveFormsModule,
		FormsModule,
		NgxSpinnerModule,
		MatRadioModule,
		MatDatepickerModule,
		MatNativeDateModule,
		MatInputModule,
		MatMenuModule,
		MatIconModule,
		MatButtonModule,
		MatStepperModule
	],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GeneralRoomModule { }
