import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateOgranizationExaminationComponent } from './create-ogranization-examination/create-ogranization-examination.component';
import { CreateOgranizationComponent } from './create-ogranization/create-ogranization.component';
import { OgranizationListComponent } from './ogranization-list/ogranization-list.component';

const routes: Routes = [
  {
    path: "tao-to-chuc",
    component: CreateOgranizationComponent
  },
  {
    path: "tao-dot-kham-to-chuc",
    component: CreateOgranizationExaminationComponent
  },
  {
    path: "danh-sach-to-chuc",
    component: OgranizationListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GeneralRoomRoutingModule { }
