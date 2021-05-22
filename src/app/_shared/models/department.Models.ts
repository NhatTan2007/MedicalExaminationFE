export class CreateDepartmentReq{
    departmentName  : string
    isActive        : boolean
}

export class UpdateDepartmentReq{
    departmentId    : string
    departmentName  : string
    isActive        : boolean
}

export class Department{
    departmentId    : string
    departmentName  : string
    isActive        : boolean
}

export interface CreateDepartmentRes{
    departmentId    : string;
    message         : string;
    success         : boolean;
}

export interface UpdateDepartmentRes{
    department      : Department;
    message         : string;
    success         : boolean;
}

export enum DepartmentId{
    da_lieu = "2F221739-43A1-4687-BAE6-454C948FCE3A",
    mat = "085C40E7-2A0E-4CE7-82FB-70844070AD04",
    than_kinh = "750868BC-5CDB-4E5E-B812-9833DB0E45BE",
    ngoai_khoa = "7759A7D9-A947-4894-AC5A-D3BF8C59F972",
    chan_doan_hinh_anh = "7C9E82AE-F629-4B7B-900C-72E5424CAB9C",
    noi_khoa = "B14D004A-7014-483C-A9EF-18E8A248E0C2",
    tai_mui_hong = "CFA346AB-EA2B-410A-B869-65EFA695E729",
    xet_nghiem = "D052903E-5FBE-47CA-A2AE-09A1C4B85937",
    phu_san = "EF79FFC1-D352-4B7A-A75A-02068B0C094B",
    rang_ham_mat = "F78BD0AB-A57E-4106-90F6-79DBE63078D4",
    tong_hop = "38623151-C25A-4CAD-90ED-242AE9C07894",
    the_chat = "D63522C7-99D1-4F31-981C-C7E557263CA9"
}