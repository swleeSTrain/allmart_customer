import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const OAuthCallbackComponent = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAuthData = async () => {
            try {
                // URL에서 code와 state 추출
                const urlParams = new URLSearchParams(window.location.search);
                const code = urlParams.get("code");
                const state = urlParams.get("state");

                if (!code) {
                    throw new Error("Authorization code is missing");
                }

                // 백엔드로 인증 코드 전달
                const response = await axios.get("http://localhost:8080/api/auth/kakao/callback", {
                    params: { code, state },
                    withCredentials: true, // 쿠키 포함
                });

                // 인증 데이터 받기
                const data = response.data;
                console.log("Authentication successful:", data);

                // 쿠키 또는 상태 저장
                localStorage.setItem("accessToken", data.accessToken);
                localStorage.setItem("refreshToken", data.refreshToken);

                // 원하는 페이지로 리디렉션
                navigate(`/${data.martID}`);
            } catch (err) {
                console.error("Error during authentication:", err);
                setError("Authentication failed. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchAuthData();
    }, [navigate]);

    if (loading) {
        return <p>Authenticating...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return <p>Authentication successful! Redirecting...</p>;
};

export default OAuthCallbackComponent;
