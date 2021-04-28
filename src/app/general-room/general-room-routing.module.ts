import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OrganizationDetailsComponent } from './organization-details/organization-details.component';
import { CreateOgranizationComponent } from './create-ogranization/create-ogranization.component';
import { OgranizationListComponent } from './ogranization-list/ogranization-list.component';

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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GeneralRoomRoutingModule { }
