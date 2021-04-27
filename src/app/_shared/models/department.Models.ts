export class CreateDepartmentReq{
    departmentName  : string
    isActive        : boolean
}

export class UpdateDepartmentReq{
    departmentId    : string
    departmentName  : string
    isActive        : boolean
}

export class Department{
    departmentId    : string
    departmentName  : string
    isActive        : boolean
}

export interface CreateDepartmentRes{
    departmentId    : string;
    message         : string;
    success         : boolean;
}

export interface UpdateDepartmentRes{
    department      : Department;
    message         : string;
    success         : boolean;
}