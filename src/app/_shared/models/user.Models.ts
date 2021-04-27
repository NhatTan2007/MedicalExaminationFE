export class CreateUserReq{
    userName: string
    email: string
    password: string
    phoneNumber: string
    firstName: string
    lastName: string
    dateOfBirth: Date
    address: string
    titles: string
    isActive: boolean
    departmentId: string
    avatar: string
    signature: string
    isEmployee: boolean
}

export class UserDetails{
    userId: string
    employeeCode: string
    userName: string
    email: string
    phoneNumber: string
    firstName: string
    lastName: string
    dateOfBirth: Date
    address: string
    titles: string
    isActive: boolean
    avatar: string
    signature: string
}

export interface UserViewModel{
    userId: string
    employeeCode: string
    firstName: string
    lastName: string
    isActive: Date
    departmentId: string
    departmentName: string
}

export interface CreateUserRes{
    userId: string,
    message: string,
    success: boolean
}