import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ogranization-list',
  templateUrl: './ogranization-list.component.html',
  styleUrls: ['./ogranization-list.component.scss']
})
export class OgranizationListComponent implements OnInit {
  pathOrganizationDetails = "/auth/phong-tong-hop/tao-dot-kham-to-chuc"
  constructor() { }

  ngOnInit(): void {
  }

}
