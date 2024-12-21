
export interface ICustomer{
    name: string;
    email: string;
    phoneNumber: string;
    customerID: number;
    martID: number;
    loyaltyPoints: number;
    social: boolean;
    accessToken: string;
    refreshToken: string;
    loginType:string;
}

export interface ISignUpParam{
    phoneNumber: string;
}