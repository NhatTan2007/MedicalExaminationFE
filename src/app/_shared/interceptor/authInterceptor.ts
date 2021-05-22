import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders, HttpResponse, HttpErrorResponse
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { catchError, map } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';

/** Inject With Credentials into the request */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
	
	constructor(private router: Router){}

  	intercept(req: HttpRequest<any>, next: HttpHandler):
    			Observable<HttpEvent<any>> {
	req = req.clone({
		withCredentials: true
	});
      
		return next.handle(req)
  }
}