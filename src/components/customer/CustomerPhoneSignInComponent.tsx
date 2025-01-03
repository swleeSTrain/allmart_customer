import { useState } from "react";
import { postPhoneSignIn } from "../../api/CustomerAPI.ts";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useCustomerStore } from "../../stores/customerStore.ts";
import { useCustomerCookie } from "../../hooks/useCustomerCookie";

function CustomerPhoneSignInComponent() {
    const [phoneNumber, setPhoneNumber] = useState("");
    const navigate = useNavigate();
    const { setTokens, setCustomerInfo } = useCustomerStore();
    const { setCustomerCookies } = useCustomerCookie();

    const handleKakaoLogin = () => {
        const kakaoURL = `http://localhost:8080/oauth2/authorization/kakao`;
        window.location.href = `${kakaoURL}`;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const trimmedPhoneNumber = phoneNumber.trim();
        if (!trimmedPhoneNumber) {
            toast.error("전화번호를 입력해주세요.", { autoClose: 1500 });
            return;
        }

        try {
            const response = await postPhoneSignIn(trimmedPhoneNumber);

            // Zustand 상태 저장
            setTokens(response.accessToken, response.refreshToken);
            setCustomerInfo(response.name, response.customerID, response.martID, "phone");

            setCustomerCookies(
                response.accessToken,
                response.refreshToken,
                response.name,
                response.customerID,
                response.martID
            );

            // 로그인 성공 후 페이지 이동
            navigate(`/${response.martID}`);
            toast.success(`로그인 성공: ${response.name}님 환영합니다!`, {
                autoClose: 1500,
                className: "bg-blue-500 text-white font-semibold rounded-lg shadow-md px-4 py-3",
                bodyClassName: "text-center",
            });
        } catch (error) {
            toast.error("로그인 실패: 등록되지 않은 번호입니다", {
                autoClose: 1500,
                className: "bg-red-500 text-white font-semibold rounded-lg shadow-md px-4 py-3",
                bodyClassName: "text-center",
            });
            console.error("Error during sign-in:", error);
        }
    };

    return (
        <div className="min-h-screen bg-white flex items-center justify-center">
            <div className="w-full max-w-md rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">로그인</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                            전화번호
                        </label>
                        <input
                            type="text"
                            id="phoneNumber"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            placeholder="01012345678"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-200"
                    >
                        로그인
                    </button>

                    <div className="mt-6 border-t pt-6">
                        <button
                            type="button"
                            onClick={handleKakaoLogin}
                            className="w-full flex items-center rounded-lg justify-center"
                        >
                            <img
                                src="/logo/kakao_login_large_wide.png"
                                alt="카카오 로그인"
                                className="w-full"
                            />
                        </button>
                    </div>
                </form>
            </div>
            <ToastContainer position="top-center" autoClose={2000} />
        </div>
    );
}

export default CustomerPhoneSignInComponent;
