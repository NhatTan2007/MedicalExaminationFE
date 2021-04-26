import { Injectable } from '@angular/core';
import { Config } from "../../config";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ConfigService } from '../config/config.service';

@Injectable({
    providedIn: 'root'
})
export class DepartmentService {

    constructor(private httpClient: HttpClient,
				private config: ConfigService) { }
    
	
}
