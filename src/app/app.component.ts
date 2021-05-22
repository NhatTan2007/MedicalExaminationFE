import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Notification } from './_shared/models/system.Models';
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

	async ngOnInit(): Promise<void> {
		await this.authService.getUserInfo();
	}
}
