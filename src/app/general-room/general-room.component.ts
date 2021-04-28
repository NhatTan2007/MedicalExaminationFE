import { Component, OnInit } from '@angular/core';
import { NavLinkLeft } from '../_shared/models/linkNavLeft.Model';

@Component({
	selector: 'app-general-room',
	templateUrl: './general-room.component.html',
	styleUrls: ['./general-room.component.scss']
})
export class GeneralRoomComponent implements OnInit {
	navLinks: NavLinkLeft[] = []
	constructor() { }

	ngOnInit(): void {
		this.AddNavLinks("Tạo thông tin bệnh nhân","tao-thong-tin-benh-nhan");
		this.AddNavLinks("Tạo bệnh án mới","tao-benh-an-benh-nhan");
		this.AddNavLinks("Điều chỉnh giá dịch vụ","danh-sach-dich-vu");
		this.AddNavLinks("Danh sách tổ chức","danh-sach-to-chuc");
		this.AddNavLinks("Tạo tổ chức","tao-to-chuc");
	}

	AddNavLinks(name, path){
		let newNavLink = new NavLinkLeft(name, path);
		this.navLinks.push(newNavLink);
	}

}
