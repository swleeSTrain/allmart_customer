import {ICustomer, ISignUpParam} from "../types/customer.ts";
import axios, {AxiosRequestConfig} from "axios";
import {isRejectedWithValue} from "@reduxjs/toolkit";

const config:AxiosRequestConfig<ICustomer> = {
      headers: {"Content-Type": "application/x-www-form-urlencoded"}

}

const host = 'http://localhost:8080/api/customer'

export const postSignUp = async (param:ISignUpParam ,{rejectWithValue}):Promise<ICustomer> => {
    try{
        const res = await axios.post(`${host}/login`, param, config);
        return res.data
    }catch(error){
        return rejectWithValue(error.response.data);
    }

}


export const refreshRequest = async (accessToken:string, refreshToken:string):Promise<ICustomer> => {

    const res = await axios.get(`${host}/refresh?refreshToken=${refreshToken}`, {
        headers:{Authorization: `Bearer ${accessToken}`}
    });
    return res.data

}