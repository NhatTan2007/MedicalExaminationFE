import { MedicalRecordDetails } from "./medicalExaminationDetails.Models"

export class MedicalHistory{
    haveOrNot: boolean
    details: string
}

export class AnotherQuestions{
    medicationsIsUsing: string
    pregnancyHistory: string
}

export class MedicalHistoryForm{
    medicalHistoryCustomer: MedicalHistory
    medicalHistoryFamily: MedicalHistory
    anotherQuetions: AnotherQuestions
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
    isPaid: true
    totalAmount: number
    wasFinishedExamination: boolean
    customerId: string
    reasonToExamination: string
}

export class MedicalRecord extends CreateMedicalRecordReq{
    medicalRecordId: string
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
    isActive: boolean
    isPaid: boolean
}

export interface UpdateMedicalRecordRes{
    medicalRecordId: string
    message: string
    success : boolean
}

