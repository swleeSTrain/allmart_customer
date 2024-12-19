import {useLocation, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {useCustomerCookie} from "./useCustomerCookie.ts";
import {useCustomerStore} from "../stores/customerStore.ts";


export const SocialCookie = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { martID: cookieMartID } = useCustomerCookie().getCustomerCookies();
    const martID = useCustomerStore((state) => state.martID) || cookieMartID;

    useEffect(() => {
        // URL에서 쿼리 매개변수 읽기
        const params = new URLSearchParams(location.search);
        const accessToken = params.get("accessToken");
        const refreshToken = params.get("refreshToken");
        const name = params.get("name");
        const email = params.get("email");

        if (accessToken && refreshToken) {
            // 토큰을 로컬 스토리지에 저장
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);

            console.log("Name:", name);
            console.log("Email:", email);
        } else {
            // 토큰이 없는 경우 로그인 페이지로 리디렉션
            navigate(`${martID}/customer/signin`);
        }
    }, [location, navigate])

    return {SocialCookie};
};


