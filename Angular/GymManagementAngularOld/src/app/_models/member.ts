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
    gender: boolean;
    typeOfServiceId: number;
    typeOfServiceName: string;
}