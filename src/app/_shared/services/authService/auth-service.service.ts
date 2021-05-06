import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AccountLogin } from '../../models/accountLogin.Model';
import { ConfigService } from '../config/config.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    protected apiDomain = `${this.config.getDomain()}/Account`
	constructor(private config: ConfigService,
                private httpClient: HttpClient) { }

	login(dataLogin: AccountLogin){
		this.httpClient.post(`${this.apiDomain}/login`, dataLogin,{ withCredentials: true })
			.subscribe(
				() => {
					console.log("Đăng nhập thành công");
				},
				(error) => {
					if(error.status == 401){
						"Invalid username or password, please try again";
					}
				}
			);
	}
}
