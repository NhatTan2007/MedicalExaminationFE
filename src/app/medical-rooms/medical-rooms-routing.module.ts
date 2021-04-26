import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateOgranizationComponent } from '../general-room/create-ogranization/create-ogranization.component';

const routes: Routes = [
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MedicalRoomsRoutingModule { }
