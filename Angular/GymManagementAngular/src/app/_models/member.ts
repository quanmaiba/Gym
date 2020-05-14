export interface Member {
    id: number;
    codeMember: string;
    fullName: string;
    dob: string;
    address: string;
    registrationDate: string;
    expirationDate: string;
    status: string;
    image: string;
    phoneNumber: string;
    email?: string;
    gender: string;
    typeOfServiceId: number;
    typeOfServiceName: string;
}