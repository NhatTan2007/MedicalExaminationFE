export class CreateOrganizationReq{
    organizationName: string
    organizationPhoneNumber: string
    organizationEmail: string
    organizationAddress: string
    personContact: string
    phoneContact: string
    emailContact: string
}

export class Organization extends CreateOrganizationReq{
    organizationId: string
}

export class UpdateOrganizationReq extends Organization{}

export class CreateOrganizationRes{
    organizationId: string
    message: string
    success: boolean
}

export class UpdateOrganizationRes{
    organization: Organization
    message: string
    success: boolean
}

export interface QuerryOrganizationRes{
    organization:  Organization[]
    totalOrganization:  number
}
