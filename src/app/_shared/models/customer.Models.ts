export class CreateCustomerReq{
    firstName: string
    lastName: string
    dateOfBirth: Date
    email: string
    adress: string
    phoneNumber: string
    identityNumber: string
    gender: boolean
    dateOfIssuanceIdentityNumber: Date
    placeOfIssuanceIdentityNumber: string
}

export class Customer extends CreateCustomerReq{
    customerId: string
}

export class UpdateCustomerReq extends Customer{
}

export interface CreateCustomerRes{
    customerId      : string
    message         : string
    success         : boolean
}

export interface UpdateCustomerRes{
    customer        : Customer
    message         : string
    success         : boolean
}