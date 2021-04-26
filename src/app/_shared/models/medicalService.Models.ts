export class CreateMedicalServiceReq{
    mServiceName: string;
    price       : number;
    isActive    : boolean;
    departmentId: string;
}

export class UpdateMedicalServiceReq{
    mServiceId  : number;
    mServiceName: string;
    price       : number;
    isActive    : boolean;
    departmentId: string;
}

export class MedicalService{
    mServiceId  : number;
    mServiceName: string;
    price       : number;
    isActive    : boolean;
    departmentId: string;
}

export class MedicalServiceRes{
    mServiceId  : number;
    message     : string;
    success     : boolean;
}