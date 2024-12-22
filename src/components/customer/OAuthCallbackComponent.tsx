import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useCustomerStore } from "../../stores/customerStore.ts";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCustomerCookie } from "../../hooks/useCustomerCookie.ts";

const OAuthCallbackComponent = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const martID = useCustomerStore((state) => state.martID) || 2;
    const { setCustomerInfo, setTokens } = useCustomerStore();
    const { setCustomerCookies } = useCustomerCookie();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchAuthData = async () => {
            setIsLoading(true);

            const searchParams = new URLSearchParams(location.search);
            const code = searchParams.get("code");
            const state = searchParams.get("state");

            if (!code || !state) {
                console.error("Missing authorization code or state.");
                toast.error("Missing authorization code or state.");
                setIsLoading(false);
                return;
            }

            try {
                // const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8080";
                const response = await axios.post(
                    // `${API_BASE_URL}/api/oauth/kakao/callback`,
                    `http://localhost:8080/api/oauth/kakao/callback`,
                    { code, state, martID },
                    {
                        withCredentials: true,
                        headers: { "Content-Type": "application/json" },
                    }
                );

                toast.info(`${response.data.name}님 환영합니다!`);
                setTokens(response.data.accessToken, response.data.refreshToken);
                setCustomerInfo(response.data.name, response.data.customerID, response.data.martID, "email");
                setCustomerCookies(
                    response.data.accessToken,
                    response.data.refreshToken,
                    response.data.name,
                    response.data.customerID,
                    response.data.martID
                );

                if (response.data.phoneNumber === "N/A") {
                    navigate(`/customer/update`, { replace: true });
                } else {
                    navigate(`/${martID}`, { replace: true });
                }
            } catch (error) {
                console.error("Authentication failed:", error);
                toast.error("로그인에 실패했습니다.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchAuthData();
    }, [location, navigate, martID, setCustomerInfo, setTokens]);

    return (
        <>
            <ToastContainer />
            {isLoading && <div className="spinner">Loading...</div>}
        </>
    );
};

export default OAuthCallbackComponent;
