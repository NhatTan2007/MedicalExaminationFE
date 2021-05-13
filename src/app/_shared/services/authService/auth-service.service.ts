import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AccountLogin, AccountLoginRes } from '../../models/accountLogin.Model';
import { DepartmentId } from '../../models/department.Models';
import { NotificationStatus } from '../../models/system.Models';
import { UserInfoRes } from '../../models/user.Models';
import { ConfigService } from '../config/config.service';
import { NotificationService } from '../notification-service/notification.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    protected apiDomain = `${this.config.getDomain()}/Account`
	userInfo: UserInfoRes
	navigateList: any[] = []
	constructor(private config: ConfigService,
                private httpClient: HttpClient,
				private notificationService: NotificationService,
				private router: Router,
				private spiner: NgxSpinnerService) { }

	login(dataLogin: AccountLogin){
		this.spiner.show();
		this.httpClient.post(`${this.apiDomain}/login`, dataLogin)
			.subscribe(
				(data: AccountLoginRes) => {
					this.notificationService.emitNotification({message: "Đăng nhập thành công", status: NotificationStatus.Success})
					this.getUserInfo();
				},
				(error) => {
					if(error.status == 401){
						this.notificationService.emitNotification({message: "Sai tên đăng nhập hoặc mật khẩu", status: NotificationStatus.Failed})
					}
					this.spiner.hide();
				},() => {
					this.spiner.hide();
				}
			);
	}

	logout(){
		this.httpClient.get(`${this.apiDomain}/logout`)
			.subscribe(() => {
				this.router.navigate([""]);
			})
	}

	getUserInfo(){
		this.httpClient.get(`${this.apiDomain}/userInfo`)
			.pipe(map(res => res as UserInfoRes)).subscribe((res) => {
				this.userInfo = res as UserInfoRes
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

	setNavigateList(){
		this.navigateList.push(
			{
				
			},
			{

			}
		)
	}
}
