import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateGroupFormComponent } from './_share/components/create-group-form/create-group-form.component';
import { GeneralRoomLayoutComponent } from './_share/components/general-room-layout/general-room-layout.component';

const routes: Routes = [
  {path:'',component: GeneralRoomLayoutComponent},
  {path:'createGroupForm', component: CreateGroupFormComponent}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
