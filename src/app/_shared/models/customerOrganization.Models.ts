export class CreateCustomerOrganizationReq{
    customerId: string
    organizationId: string
    isActive: boolean
    customerFirstName: string
    customerLasNtame: string
}

export class CustomerOrganization extends CreateCustomerOrganizationReq{
}

export class UpdateCustomerOrganizationReq extends CreateCustomerOrganizationReq{
}

export interface CreateCustomerOrganizationRes{
    customerId      : string
    message         : string
    success         : boolean
}

export interface UpdateCustomerOrganizationRes{
    customerOrganization: CustomerOrganization
    message         : string
    success         : boolean
}