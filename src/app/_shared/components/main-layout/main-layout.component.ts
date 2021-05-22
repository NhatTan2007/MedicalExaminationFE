import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserInfoRes } from '../../models/user.Models';
import { AuthService } from '../../services/authService/auth-service.service';

@Component({
	selector: 'app-main-layout',
	templateUrl: './main-layout.component.html',
	styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {
	getUserInfo$: Observable<UserInfoRes>
	userInfo: UserInfoRes
	constructor(private authService: AuthService) { }
	
	ngOnInit(): void {
		this.getUserInfo$ = this.authService.getUserInfo$();
		this.getUserInfo$.subscribe((data) => {
			this.userInfo = data;
		})
	}

	logout() {
		this.authService.logout();
	}

}
