import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountLogin } from '../../models/accountLogin.Model';
import { AuthService } from '../../services/authService/auth-service.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    loginForm : FormGroup
	hide = true;
    constructor(private formBuilder: FormBuilder,
				private authService: AuthService) { }

    ngOnInit(): void {
		this.loginForm = this.formBuilder.group({
			username: ["", [Validators.required]],
			password: ["", [Validators.required]],
			remember: [false, [Validators.required]]
		})
    }

	loginSubmit(){
		if(this.loginForm.valid){
			let loginData = this.loginForm.value as AccountLogin
			this.authService.login(loginData);
		}
		this.loginForm.patchValue(
			{
				username: this.loginForm.get("username").value,
				password: ""
			}
		)
	}
}
