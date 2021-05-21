import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

import { SharedRoutingModule } from './shared-module-routing.module';
import { CustomerInformationComponent } from "./components/customer-information/customer-information.component";
import { ListActiveMedicalRecordComponent } from "./components/list-active-medical-record/list-active-medical-record.component";
import { ImageScannerComponent } from "./components/image-scanner/image-scanner.component";


@NgModule({
	declarations: [
		CustomerInformationComponent,
		ListActiveMedicalRecordComponent,
		ImageScannerComponent
	],
	imports: [
		CommonModule,
		SharedRoutingModule,
		NgxSpinnerModule,
		MatFormFieldModule,
		MatIconModule,
		MatInputModule
	],
	exports: [
		CustomerInformationComponent,
		ListActiveMedicalRecordComponent,
		ImageScannerComponent
	]
})
export class SharedModule { }
