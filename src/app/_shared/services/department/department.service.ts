import { Injectable } from '@angular/core';
import { Config } from "../../config";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ConfigService } from '../config/config.service';
import { CreateDepartmentReq,
            Department,
            CreateDepartmentRes,
            UpdateDepartmentRes,
            UpdateDepartmentReq } from '../../models/department.Models';

@Injectable({
    providedIn: 'root'
})
export class DepartmentService {
    protected apiDomain = `${this.config.getDomain()}/Department`

    constructor(private httpClient: HttpClient,
				private config: ConfigService) { }
    
	GetDepartment(departmentId: string): Observable<Department>{
        return this.httpClient.get(`${this.config.getDomain()}/${departmentId}`)
            .pipe(map(res => res as Department));
    };

    CreateDepartment(department: CreateDepartmentReq): Observable<CreateDepartmentRes>{
        return this.httpClient.post(`${this.config.getDomain()}/create`, department)
            .pipe(map(res => res as CreateDepartmentRes));
    }

    UpdateDepartment(department: UpdateDepartmentReq): Observable<UpdateDepartmentRes>{
        return this.httpClient.put(`${this.config.getDomain()}/create`, department)
            .pipe(map(res => res as UpdateDepartmentRes));
    }
}
