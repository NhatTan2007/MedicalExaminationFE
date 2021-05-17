import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MatTabsModule } from '@angular/material/tabs';

import { GeneralDoctorRoutingModule } from './general-doctor-routing.module';
import { GeneralDoctorComponent } from './general-doctor.component';
import { SharedModule } from "../_shared/shared-module.module";

@NgModule({
	declarations: [
		GeneralDoctorComponent
	],
	imports: [
		CommonModule,
		GeneralDoctorRoutingModule,
		MatInputModule,
		MatIconModule,
		NgxSpinnerModule,
		MatTabsModule,
		SharedModule
	]
})
export class GeneralDoctorModule { }
