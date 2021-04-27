import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CreateUserReq, CreateUserRes, UserDetails, UserViewModel } from '../../models/user.Models';
import { ConfigService } from '../config/config.service';

@Injectable({
  	providedIn: 'root'
})
export class UserService {
	protected apiDomain = `${this.config.getDomain()}/User`
    constructor(private config: ConfigService,
                private httpClient: HttpClient) { }

	CreateUser(user: CreateUserReq): Observable<CreateUserRes>{
		return this.httpClient.post(`${this.apiDomain}/create`, user)
			.pipe(map(res => res as CreateUserRes))
	}

	GetUsers(): Observable<UserViewModel[]>{
		return this.httpClient.get(`${this.apiDomain}`)
			.pipe(map(res => res as UserViewModel[]))
	}

	GetUser(userId: string): Observable<UserDetails>{
		return this.httpClient.get(`${this.apiDomain}/${userId}`)
			.pipe(map(res => res as UserDetails))
	}
}
