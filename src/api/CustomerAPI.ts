import {ICustomer, ISignUpParam} from "../types/customer.ts";
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

export const postSocialSignIn = async (email: string): Promise<ICustomer> => {

    try {
        const res = await axios.post(
            `${host}/signIn/social`,
            { email,withCredentials: true }, // POST 요청 body에 phoneNumber 포함
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
            {withCredentials: true},
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
        headers:{Authorization: `Bearer ${accessToken}`},
        withCredentials: true,
    });
    return res.data

}
//
// export const kakaoSignInRequest = async () : Promise<ICustomer> => {
//
//    try{
//        const res = await axios.get("http://localhost:8080/oauth2/authorization/kakao", {
//            withCredentials: true, // 쿠키 포함
//        });
//        return res.data;
//
//    }catch (error: any) {
//     console.error("Error during sign-up request:", error.response || error.message);
//     throw new Error("Sign-up request failed");
//     }
//
// }
//
//
// export  const  handleFetchTokens = async () => {
//
//     const navigate = useNavigate()
//
//     try {
//         const response = await axios.get("http://localhost:8080/login/oauth2/code/kakao", { withCredentials: true });
//
//         const { accessToken, refreshToken, name, email } = response.data;
//
//         // 로컬 스토리지에 저장
//         localStorage.setItem("accessToken", accessToken);
//         localStorage.setItem("refreshToken", refreshToken);
//
//         // 다음 화면으로 이동
//         navigate("/dashboard");
//     } catch (error) {
//         console.error("토큰 요청 중 오류 발생:", error.response?.data || error.message);
//     }
// };