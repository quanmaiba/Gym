export interface Member {
    id: number;
    codeMember: string;
    fullName: string;
    dob: Date;
    address: string;
    registrationDate: Date;
    expirationDate: Date;
    status: boolean;
    image: string;
    phoneNumber: string;
    email?: string;
    sex: boolean;
    typeOfServiceId: number;
    typeOfServiceName: string;
}