import { useCookies } from "react-cookie";

export const useMartCookie = () => {
    const [cookies, setCookie, removeCookie] = useCookies(["martID", "martLogo"]);

    // 쿠키 저장 함수
    const setMartCookies = (martID: number, martLogo: string) => {
        const expiryDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7일 후 만료
        setCookie("martID", martID, { expires: expiryDate });
        setCookie("martLogo", martLogo, { expires: expiryDate });
    };

    // 쿠키 제거 함수
    const removeMartCookies = () => {
        removeCookie("martID");
        removeCookie("martLogo");
    };

    // 쿠키 값 반환 함수
    const getMartCookies = () => {
        return {
            martID: cookies.martID ? Number(cookies.martID) : null,
            martLogo: cookies.martLogo || null,
        };
    };

    return { setMartCookies, removeMartCookies, getMartCookies, cookies };
};
