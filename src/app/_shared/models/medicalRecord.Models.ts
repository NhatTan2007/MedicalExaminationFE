import { MedicalRecordDetails } from "./medicalExaminationDetails.Models"

export class MedicalHistory{
    haveOrNot: boolean
    details: string

    constructor(){
        this.haveOrNot = false
        this.details = ''
    }
}

export class AnotherQuestions{
    medicationsIsUsing: string
    pregnancyHistory: string

    constructor(){
        this.medicationsIsUsing = ''
        this.pregnancyHistory = ''
    }
}

export class MedicalHistoryForm{
    medicalHistoryCustomer: MedicalHistory
    medicalHistoryFamily: MedicalHistory
    anotherQuestions: AnotherQuestions

    constructor(){
        this.medicalHistoryCustomer = new MedicalHistory();
        this.medicalHistoryFamily = new MedicalHistory();
        this.anotherQuestions = new AnotherQuestions();
    }
}

//////////////////////////////////
export class CreateMedicalRecordReq{
    medicalHistory: MedicalHistoryForm
    details: MedicalRecordDetails
    isGroup: boolean
    customerFirstName: string
    customerLastName: string
    isActive: boolean
    organizationId: string
    gmExaminationId: string
    isPaid: boolean
    totalAmount: number
    wasFinishedExamination: boolean
    customerId: string
    reasonToExamination: string
    wasPrinted: boolean
    servicesRegisted: number
    
    constructor(customerId: string){
        this.medicalHistory = new MedicalHistoryForm();
        this.details = new MedicalRecordDetails()
        this.customerId = customerId;
        this.wasFinishedExamination = false;
        this.isActive = false;
        this.isPaid = false;
        this.isGroup = false;
        this.totalAmount = 0;
        this.wasPrinted = false;
        this.servicesRegisted = 0;
    }
}

export class MedicalRecord extends CreateMedicalRecordReq{
    medicalRecordId: string
    serviceUsed: number
    reasonCancel: string
}


export interface CreateMedicalRecordRes{
    medicalRecordId: string
    message: string
    success: boolean
}

export interface MedicalRecordViewRes{
    medicalRecordId: string
    customerFirstName: string
    customerLastName: string
    customerFullName: string
    createDate: number
    dateCompleted: number
    isActive: boolean
    isPaid: boolean
    reasonCancel: string
    wasPrinted: boolean
}

export interface UpdateMedicalRecordRes{
    medicalRecordId: string
    message: string
    success : boolean
}

export interface QueryMedicalRecordsRes{
    medicalRecords: MedicalRecordViewRes[]
    totalMedicalRecords: number
}

