import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ConfigService {
	private domain = "http://api.khamskdinhky.tech"
	tokenKey = ""
    constructor() { }

	getDomain(): string{
		return this.domain;
	}
}
