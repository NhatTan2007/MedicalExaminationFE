import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AccountLogin, AccountLoginRes } from '../../models/accountLogin.Model';
import { NotificationStatus } from '../../models/system.Models';
import { ConfigService } from '../config/config.service';
import { NotificationService } from '../notification-service/notification.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    protected apiDomain = `${this.config.getDomain()}/Account`
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
					localStorage.setItem("userId", data.userId);
					localStorage.setItem("departmentId", data.departmentId);
					localStorage.setItem("fullName", data.fullName);
					this.notificationService.emitNotification({message: "Đăng nhập thành công", status: NotificationStatus.Success})
					this.router.navigateByUrl("/auth/phong-tong-hop/tao-thong-tin-benh-nhan")
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
}
