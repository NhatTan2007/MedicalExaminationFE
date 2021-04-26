import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './errors/not-found/not-found.component';

const routes: Routes = [
	{
		path: "hanh-chinh",
		component: ,
		children: [
			{
				path: "",
				loadChildren: () => import("./general-room/general-room.module").then(g => g.GeneralRoomModule)
			}
		]
	},
	{
		path:"error",
		loadChildren: () => import("./errors/errors.module").then(e => e.ErrorsModule)
	},
	{
		path: '**',
		component: NotFoundComponent
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
