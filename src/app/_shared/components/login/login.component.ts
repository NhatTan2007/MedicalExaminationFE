import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountLogin } from '../../models/accountLogin.Model';
import { AuthService } from '../../services/authService/auth-service.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
	loginForm: FormGroup;
	hide = true;
	constructor(
		private formBuilder: FormBuilder,
		private authService: AuthService,
		private notification: NzNotificationService
	) {}

	ngOnInit(): void {
		this.loginForm = this.formBuilder.group({
			username: ['', [Validators.required]],
			password: ['', [Validators.required]],
			remember: [false, [Validators.required]],
		});
	}

	loginSubmit(){
		if(this.loginForm.valid){
			let loginData = this.loginForm.value as AccountLogin
      		loginData.username = loginData.username.toLowerCase();
			this.authService.login(loginData).subscribe((res) => {
				this.notification.blank('Đăng nhập thành công', `Chào ${res.fullName} quay trở lại`, {nzClass: "success text-white", nzAnimate: true})
				this.authService.getUserInfo();
			}, (err) => {
				if(err.status == 401){
					this.notification.blank('Lỗi đăng nhập', err.error, {nzClass: "error text-white", nzAnimate: true})
				}
			});
		} else{
			this.loginForm.patchValue(
				{
					username: this.loginForm.get("username").value,
					password: ""
				}
			)
		}
	}
}
