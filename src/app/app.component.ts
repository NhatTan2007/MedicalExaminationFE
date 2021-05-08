import { Component, OnInit } from '@angular/core';
import { Notification } from './_shared/models/system.Models';
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
	constructor(private notificationService: NotificationService){}

	ngOnInit(): void {
		this.notificationService.notification$.subscribe(noti => {
			this.notification = noti
			this.opacity = "opacity: 1;";
			setTimeout(() => {
				this.opacity = "opacity: 0;";
				setTimeout(() => {this.notification = null;}, 1 * 1000);
			}, 3 * 1000);
		})
	}
}
