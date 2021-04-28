import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OrganizationDetailsComponent } from './organization-details/organization-details.component';
import { CreateOgranizationComponent } from './create-ogranization/create-ogranization.component';
import { OgranizationListComponent } from './ogranization-list/ogranization-list.component';
import { ServicesListComponent } from './services-list/services-list.component';
import { CreateCustomerExaminationComponent } from './create-customer-examination/create-customer-examination.component';
import { CreateCustomerInformationComponent } from './create-customer-information/create-customer-information.component';


const routes: Routes = [
  {
    path: "tao-to-chuc",
    component: CreateOgranizationComponent
  },
  {
    path: "chi-tiet/:organizationId",
    component: OrganizationDetailsComponent
  },
  {
    path: "danh-sach-to-chuc",
    component: OgranizationListComponent
  },
  {
    path: "danh-sach-dich-vu",
    component: ServicesListComponent
  },
  {
    path:"tao-benh-an-benh-nhan",
    component: CreateCustomerExaminationComponent
  },
  {
    path:"tao-thong-tin-benh-nhan",
    component: CreateCustomerInformationComponent
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GeneralRoomRoutingModule { }
