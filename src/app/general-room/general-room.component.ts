import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-general-room',
  templateUrl: './general-room.component.html',
  styleUrls: ['./general-room.component.scss']
})
export class GeneralRoomComponent implements OnInit {
  public pathCreateOrganization = "tao-to-chuc"
  public pathListOrganizations = "danh-sach-to-chuc"
  constructor() { }

  ngOnInit(): void {
  }

}
