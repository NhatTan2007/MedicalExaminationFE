import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ConfigService {
	private domain = "https://localhost:44323"
	tokenKey = ""
    constructor() { }

	getDomain(): string{
		return this.domain;
	}
}
