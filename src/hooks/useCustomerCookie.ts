import { useCookies } from "react-cookie";

export const useCustomerCookie = () => {
    const [cookies, setCookie, removeCookie] = useCookies([
        "accessToken",
        "refreshToken",
        "name",
        "customerID",
        "martID",
    ]);

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

        console.log("========================== set");
        console.log("Cookies:", cookies);
        console.log("Document Cookies:", document.cookie);
    };

    const removeCustomerCookies = () => {
        removeCookie("accessToken");
        removeCookie("refreshToken");
        removeCookie("name");
        removeCookie("customerID");
        removeCookie("martID");

        console.log("========================== remove");
        console.log("Cookies after removal:", cookies);
        console.log("Document Cookies after removal:", document.cookie);
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
