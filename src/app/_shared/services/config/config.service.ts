import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ConfigService {
	private domain = "https://api.khamskdinhky.tech:5001"
	tokenKey = ""
    constructor() { }

	getDomain(): string{
		return this.domain;
	}
}