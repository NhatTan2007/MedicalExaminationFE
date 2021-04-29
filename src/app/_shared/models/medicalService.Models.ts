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
    update      : boolean
}

export interface CreateMedicalServiceRes{
    mServiceId  : number;
    message     : string;
    success     : boolean;
}

export interface UpdateMedicalServiceRes{
    medicalService: MedicalService;
    message     : string;
    success     : boolean;
}