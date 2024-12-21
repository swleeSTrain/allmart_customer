import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useCustomerStore } from "../../stores/customerStore.ts";
import { toast, ToastContainer } from "react-toastify"; // Import Toast
import "react-toastify/dist/ReactToastify.css";
import {useCustomerCookie} from "../../hooks/useCustomerCookie.ts"; // Toast styles

const OAuthCallbackComponent = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const martID = useCustomerStore((state) => state.martID);
    const { setCustomerInfo, setTokens } = useCustomerStore();
    const { setCustomerCookies } = useCustomerCookie();

    useEffect(() => {
        const fetchAuthData = async () => {
            const searchParams = new URLSearchParams(location.search);
            const code = searchParams.get("code");
            const state = searchParams.get("state");

            if (!code || !state) {
                console.error("Missing authorization code or state.");
                toast.error("Missing authorization code or state."); // Toast for error
                return;
            }

            try {
                const response = await axios.post(
                    "http://localhost:8080/api/oauth/kakao/callback",
                    { code, state, martID },
                    {
                        withCredentials: true,
                        headers: { "Content-Type": "application/json" },
                    }
                );

                console.log("Authentication successful:", response.data);

                toast.info(`${response.data.name}님 환영합니다! 저희 서비스를 원할하게 이용하시려면 추가 회원정보를 입력해주세요`, {
                    autoClose: 3000,
                    className: "bg-blue-500 text-white font-semibold rounded-lg shadow-md px-4 py-3",
                    bodyClassName: "text-center",
                    position: "top-right", // 위치
                    hideProgressBar: false, // 진행 상태 바 숨김 여부
                    closeOnClick: true, // 클릭 시 닫기
                    pauseOnHover: true, // 마우스 오버 시 일시정지
                    draggable: true, // 드래그 가능 여부
                    theme: "light", // 테마 (light, dark, colored)
                });

                // Zustand 상태 업데이트
                setTokens(response.data.accessToken, response.data.refreshToken);
                setCustomerInfo(response.data.name, response.data.customerID, response.data.martID, "email");

                setCustomerCookies(
                    response.data.accessToken,
                    response.data.refreshToken,
                    response.data.name,
                    response.data.customerID,
                    response.data.martID
                );

                console.log("After setCustomerInfo (zustand state):", useCustomerStore.getState());

                // Redirect logic
                if (response.data.phoneNumber === "N/A") {
                    navigate(`/${martID}/customer/update`);
                } else {
                    navigate(`/${martID}`);
                }
            } catch (error) {
                console.error("Authentication failed:", error);
                toast.error("로그인에 실패했습니다.", {
                    autoClose: 1500,
                    className: "bg-red-500 text-white font-semibold rounded-lg shadow-md px-4 py-3",
                    bodyClassName: "text-center",
                });
            }
        };

        fetchAuthData();
    }, [location, navigate, martID, setCustomerInfo, setTokens]);

    return (
        <>
            <ToastContainer /> {/* Toast Container for notifications */}
        </>
    );
};

export default OAuthCallbackComponent;