import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders
} from '@angular/common/http';

import { Observable } from 'rxjs';

/** Inject With Credentials into the request */
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
	private headers = new HttpHeaders({
		'Content-Type':'application/json; charset=utf-8;' 
		,'Accept':'*/*'
	  });

  	intercept(req: HttpRequest<any>, next: HttpHandler):
    			Observable<HttpEvent<any>> {
        
	req = req.clone({
		headers: this.headers,
		withCredentials: true
	});
      
      return next.handle(req);
  }
}