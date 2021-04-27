import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './errors/not-found/not-found.component';

import { GeneralRoomComponent } from './general-room/general-room.component';
import { LoginComponent } from './_shared/components/login/login.component';
import { MainLayoutComponent } from './_shared/components/main-layout/main-layout.component';

const routes: Routes = [
	{
		path: "",
		component: LoginComponent
	},
	{
		path:"auth",
		component: MainLayoutComponent,
		children: [
			{
				path: "phong-tong-hop",
				component: GeneralRoomComponent,
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
		]
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
