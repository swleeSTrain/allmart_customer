import { useCookies } from "react-cookie";

// 새로고침 시 상태 날라가는 거 방지하기 위해 쿠키 사용
export const useCustomerCookie = () => {
    const [cookies, setCookie, removeCookie] = useCookies([
        "accessToken",
        "refreshToken",
        "name",
        "customerID",
        "martID",
    ]);

    // 로그인시 쿠키 생성
    const setCustomerCookies = (
        accessToken: string,
        refreshToken: string,
        name: string,
        customerID: number,
        martID: number
    ) => {
        setCookie("accessToken", accessToken, { expires: new Date(Date.now() + 86400000) }); // 1일
        setCookie("refreshToken", refreshToken, { expires: new Date(Date.now() + 604800000) }); // 7일
        setCookie("name", name, { expires: new Date(Date.now() + 604800000) }); // 7일
        setCookie("customerID", customerID, { expires: new Date(Date.now() + 604800000) }); // 7일
        setCookie("martID", martID, { expires: new Date(Date.now() + 604800000) }); // 7일


    };

    // 로그아웃시 쿠키 지우기
    const removeCustomerCookies = () => {
        removeCookie("accessToken");
        removeCookie("refreshToken");
        removeCookie("name");
        removeCookie("customerID");
        removeCookie("martID");

    };

    // 쿠키 값을 반환하는 함수 추가
    const getCustomerCookies = () => {
        return {
            name: cookies.name,
            customerID: cookies.customerID,
            martID: cookies.martID,
            accessToken: cookies.accessToken,
            refreshToken: cookies.refreshToken,
        };
    };


    return { setCustomerCookies, removeCustomerCookies, getCustomerCookies, cookies };
};