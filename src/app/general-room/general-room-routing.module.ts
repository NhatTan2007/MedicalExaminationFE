import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateOgranizationComponent } from './create-ogranization/create-ogranization.component';

const routes: Routes = [
  {
    path: "tao-to-chuc",
    component: CreateOgranizationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GeneralRoomRoutingModule { }
