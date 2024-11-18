import {ICustomer, ISignUpParam} from "../types/customer.ts";
import axios, {AxiosRequestConfig} from "axios";


const config:AxiosRequestConfig = {
      headers: {"Content-Type": "application/json"}

}

const host = 'http://localhost:8080/api/v1/customer'

export const postSignUp = async (param:ISignUpParam ):Promise<ICustomer> => {

    const formData = new URLSearchParams();
    formData.append("phoneNumber", param.phoneNumber);
    const phoneNum = param.phoneNumber

    const res = await axios.post(`${host}/signUp/phoneNumber/${phoneNum}`,param, {headers: {"Content-Type": "application/json"}});

    return res.data

}


export const refreshRequest = async (accessToken:string, refreshToken:string):Promise<ICustomer> => {

    const res = await axios.get(`${host}/refresh?refreshToken=${refreshToken}`, {
        headers:{Authorization: `Bearer ${accessToken}`}
    });
    return res.data

}