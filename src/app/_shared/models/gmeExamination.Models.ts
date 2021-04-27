export class CreateGmeExaminationReq{
    dateStart: Date
    dateEnd: Date
    advances: number
    discount: number
    organiationId: string
}

export class UpdateGmeExaminationReq extends CreateGmeExaminationReq{
    gmExaminationId: string
}

export class GmeExamination extends UpdateGmeExaminationReq{

}

export class CreateGmeExaminationRes{
    gMExaminationId : string
    message         : string
    success         : boolean
}

export class UpdateGmeExaminationRes{
    gMExamination   : GmeExamination
    message         : string
    success         : boolean
}