import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DepartmentId } from './_shared/models/department.Models';
import { Notification } from './_shared/models/system.Models';
import { UserInfoRes } from './_shared/models/user.Models';
import { AuthService } from './_shared/services/authService/auth-service.service';
import { NotificationService } from './_shared/services/notification-service/notification.service';


@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
	title = 'MedicalExaminationFE';
	notification?: Notification | null;
	opacity = "opacity: 0"
	constructor(private notificationService: NotificationService,
				private authService: AuthService,
				private router: Router){}

	ngOnInit(): void {
		this.notificationService.notification$.subscribe(noti => {
			this.notification = noti
			this.opacity = "opacity: 1;";
			setTimeout(() => {
				this.opacity = "opacity: 0;";
				setTimeout(() => {this.notification = null;}, 1 * 1000);
			}, 3 * 1000);
		})

		this.authService.getUserInfo()
			.subscribe((res) => {
				this.authService.userInfo = res as UserInfoRes
				console.log(res)
				switch (res.departmentId) {
					case DepartmentId.da_lieu:
						this.router.navigateByUrl('auth/phong-kham/da-lieu')
						break;
					case DepartmentId.mat:
						this.router.navigateByUrl('auth/phong-kham/mat')
						break;
					case DepartmentId.than_kinh:
						this.router.navigateByUrl('auth/phong-kham/than-kinh')
						break;
					case DepartmentId.ngoai_khoa:
						this.router.navigateByUrl('auth/phong-kham/ngoai-khoa')
						break;
					case DepartmentId.chan_doan_hinh_anh:
						this.router.navigateByUrl('auth/phong-kham/chan-doan-hinh-anh')
						break;
					case DepartmentId.noi_khoa:
						this.router.navigateByUrl('auth/phong-kham/noi-khoa')
						break;
					case DepartmentId.tai_mui_hong:
						this.router.navigateByUrl('auth/phong-kham/tai-mui-hong')
						break;
					case DepartmentId.xet_nghiem:
						this.router.navigateByUrl('auth/phong-kham/xet-nghiem')
						break;
					case DepartmentId.phu_san:
						this.router.navigateByUrl('auth/phong-kham/phu-san')
						break;
					case DepartmentId.rang_ham_mat:
						this.router.navigateByUrl('auth/phong-kham/rang-ham-mat')
						break;

					default:
						break;
				}
			},(err) => {
				if(err.status == 401){
					this.router.navigate([""]);
				}
			})
	}
}
