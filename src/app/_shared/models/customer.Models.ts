export class CreateCustomerReq{
    firstName: string
    lastName: string
    dateOfBirth: Date
    email: string
    address: string
    phoneNumber: string
    identityNumber: string
    gender: boolean
    dateOfIssuanceIdentityNumber: Date
    placeOfIssuanceIdentityNumber: string
}

export class Customer extends CreateCustomerReq{
    customerId: string
    fullName = `${this.lastName} ${this.firstName}`
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