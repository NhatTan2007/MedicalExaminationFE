import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AuthInterceptor } from './_shared/interceptor/authInterceptor';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';

import { LoginComponent } from './_shared/components/login/login.component';
import { MainLayoutComponent } from './_shared/components/main-layout/main-layout.component';
import { SharedModule } from "./_shared/shared-module.module";

registerLocaleData(en);

@NgModule({
	declarations: [AppComponent, MainLayoutComponent, LoginComponent],
	imports: [
		BrowserModule,
		AppRoutingModule,
		NgbModule,
		BrowserAnimationsModule,
		HttpClientModule,
		FormsModule,
		SharedModule,
		ReactiveFormsModule,
		MatFormFieldModule,
		MatInputModule,
		MatIconModule,
		MatButtonModule,
		MatCheckboxModule,
		NgxSpinnerModule,
		NzNotificationModule
	],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	providers: [
		{
			provide: HTTP_INTERCEPTORS,
			useClass: AuthInterceptor,
			multi: true
		},
		{ provide: NZ_I18N, useValue: en_US }
	],
	bootstrap: [AppComponent],
	exports: [FormsModule, ReactiveFormsModule],
})
export class AppModule {}
