export interface Member {
    id: number;
    codeMember: string;
    fullName: string;
    dob: Date;
    address: string;
    registrationDate: Date;
    expirationDate: Date;
    status: string;
    image: string;
    phoneNumber: string;
    email?: string;
    sex: string;
    typeOfServiceId: number;
    typeOfServiceName: string;
}