import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AccountLogin, AccountLoginRes } from '../../models/accountLogin.Model';
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

	getUserInfo(): Observable<UserInfoRes>{
		return this.httpClient.get(`${this.apiDomain}/userInfo`)
			.pipe(map(res => res as UserInfoRes))
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
