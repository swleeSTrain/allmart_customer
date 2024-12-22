import { useEffect } from "react";
import { useMartStore } from "../stores/martStore.ts"; // 상태 관리
import { useMartCookie } from "./useMartCookie.ts"; // 쿠키 관리

export const useMartSync = () => {
    const { martID, martLogo, setMartIDAndLogo } = useMartStore();
    const { setMartCookies, removeMartCookies, getMartCookies } = useMartCookie();

    // 애플리케이션 시작 시 쿠키 값을 상태에 반영
    useEffect(() => {
        const cookies = getMartCookies();
        if (cookies.martID !== null && cookies.martLogo !== null) {
            setMartIDAndLogo(cookies.martID, cookies.martLogo);
        }
    }, [getMartCookies, setMartIDAndLogo]);

    // 상태 변경 시 쿠키 업데이트
    useEffect(() => {
        if (martID !== null && martLogo !== null) {
            setMartCookies(martID, martLogo);
        } else {
            removeMartCookies();
        }
    }, [martID, martLogo, setMartCookies, removeMartCookies]);
};
