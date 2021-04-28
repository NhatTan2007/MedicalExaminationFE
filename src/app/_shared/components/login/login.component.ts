import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountLogin } from '../../models/accountLogin.Model';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    loginForm : FormGroup
	hide = true;
    constructor(private formBuilder: FormBuilder) { }

    ngOnInit(): void {
		this.loginForm = this.formBuilder.group({
			username: ["", [Validators.required]],
			password: ["", [Validators.required]],
			remember: [false]
		})
    }

	loginSubmit(){
		if(this.loginForm.valid){
			let loginData = this.loginForm.value as AccountLogin
			console.log(loginData);
		}
		this.loginForm.patchValue(
			{
				username: this.loginForm.get("username").value,
				password: ""
			}
		)
	}
}
