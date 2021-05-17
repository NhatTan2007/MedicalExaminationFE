import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AccountLogin, AccountLoginRes } from '../../models/accountLogin.Model';
import { DepartmentId } from '../../models/department.Models';
import { UserInfoRes } from '../../models/user.Models';
import { ConfigService } from '../config/config.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    protected apiDomain = `${this.config.getDomain()}/Account`
	userInfo: UserInfoRes
	navigateList: any[] = []
	constructor(private config: ConfigService,
                private httpClient: HttpClient,
				private router: Router) { }

	login(dataLogin: AccountLogin): Observable<AccountLoginRes>{
		return this.httpClient.post(`${this.apiDomain}/login`, dataLogin)
			.pipe(map(res => res as AccountLoginRes))
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
					case DepartmentId.the_chat:
						this.router.navigateByUrl('auth/phong-kham/the-chat')
						break;
					// default:
					// 	this.router.navigateByUrl('auth/phong-tong-hop/tao-thong-tin-benh-nhan')
					// 	break;
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
