import {ICustomer, ISignUpParam} from "../types/customer.ts";
import axios, {AxiosRequestConfig} from "axios";


const config:AxiosRequestConfig = {
      headers: {"Content-Type": "application/json"}

}

const host = 'http://localhost:8080/api/v1/customer'

export const postPhoneSignIn = async (phoneNumber: string): Promise<ICustomer> => {

    try {
        const res = await axios.post(
            `${host}/signIn/phoneNumber`,
            { phoneNumber }, // POST 요청 body에 phoneNumber 포함
            config
        );

        console.log(res.data);
        console.log("--------------------");

        return res.data;
    } catch (error: any) {
        console.error("Error during phone sign-in request:", error.response || error.message);
        throw new Error("Phone sign-in request failed");
    }
};

export const postSignUp = async (param:ISignUpParam ):Promise<ICustomer> => {
    
    console.log("postSignUp 여기 왔니");
    const phoneNumber = param.phoneNumber
    try {
        const res = await axios.post(
            `${host}/signUp/phoneNumber/${phoneNumber}`,
            null,
            config
        );
        return res.data;
    } catch (error: any) {
        console.error("Error during sign-up request:", error.response || error.message);
        throw new Error("Sign-up request failed");
    }

}


export const refreshRequest = async (accessToken:string, refreshToken:string):Promise<ICustomer> => {

    const res = await axios.get(`${host}/refresh?refreshToken=${refreshToken}`, {
        headers:{Authorization: `Bearer ${accessToken}`}
    });
    return res.data

}