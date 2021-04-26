import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GeneralRoomLayoutComponent } from './_share/components/general-room-layout/general-room-layout.component';

const routes: Routes = [
  {path:'',component: GeneralRoomLayoutComponent}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
