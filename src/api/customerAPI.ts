import {ICustomer, ISignUpParam} from "../types/customer.ts";
import axios, {AxiosRequestConfig} from "axios";


const config:AxiosRequestConfig = {
      headers: {"Content-Type": "application/json"}

}

const host = 'http://localhost:8080/api/v1/customer'

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