import {ICustomer} from "../types/customer.ts";
import axios, {AxiosRequestConfig} from "axios";
// import {useNavigate} from "react-router-dom";




const config:AxiosRequestConfig = {
      headers: {"Content-Type": "application/json"}

}

const host = 'https://allmartsystem.shop/api/v1/customer'
// const host = 'http://localhost:8080/api/v1/customer'

// martInfo 데이터를 가져오는 API 함수
export const fetchMartInfo = async (data: { phoneNumber?: string; email?: string }) => {
    try {
        const response = await axios.post(`${host}/martinfo`, data, config);
        return response.data; // API에서 받은 데이터를 반환
    } catch (error) {
        console.error("Mart info fetch error:", error);
        throw error;
    }
};

export const postPhoneSignIn = async (phoneNumber: string): Promise<ICustomer> => {

    try {
        const res = await axios.post(
            `${host}/signIn/phoneNumber`,
            { phoneNumber,withCredentials: true, }, // POST 요청 body에 phoneNumber 포함
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


export const refreshRequest = async (accessToken:string, refreshToken:string):Promise<ICustomer> => {

    const res = await axios.get(`${host}/refresh?refreshToken=${refreshToken}`, {
        headers:{Authorization: `Bearer ${accessToken}`},
        withCredentials: true,
    });
    return res.data

}

export const updateCustomer = async (customerData: {
    phoneNumber: string;
    social: boolean;
    customerID: number;
    name: string;
    accessToken: string;
    loyaltyPoints: number;
    martID: number;
    email: string;
    refreshToken: string
    loginType: string
}): Promise<ICustomer> => {
    const res = await axios.put(
        `${host}/update`,
        customerData,
        {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        }
    );

    return res.data;
}