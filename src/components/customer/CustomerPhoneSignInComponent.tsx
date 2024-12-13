import {useEffect, useState} from "react";
// import {kakaoSignInRequest, postPhoneSignIn} from "../../api/CustomerAPI.ts";
import {postPhoneSignIn, postSocialSignIn} from "../../api/CustomerAPI.ts";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate} from "react-router-dom";
import { useCustomerStore } from "../../stores/customerStore.ts";
import { useMartStore } from "../../stores/martStore.ts";

function CustomerPhoneSignInComponent() {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();
    const { setTokens, setCustomerInfo } = useCustomerStore();
    const { fetchAndStoreMartInfo } = useMartStore();

    // const {email,setEmail} = useState("");

    const handleKakaoLogin = async () => {
            // 카카오 OAuth2 로그인 URL로 이동
            const kakaoURL = `https://allmartsystem.shop/oauth2/authorization/kakao`;
            window.location.href = `${kakaoURL}`;
    };

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('https://allmartsystem.shop/oauth2/authorization/kakao', {
                method: 'GET',
                credentials: 'include', // 세션 기반 인증 사용 시 필요
            });
            const data = await response.json();
            console.log("==============================");
            console.log('User info:', data); // 받은 JSON 출력
        };
        fetchData();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const trimmedPhoneNumber = phoneNumber.trim();
        if (!trimmedPhoneNumber) {
            toast.error("전화번호를 입력해주세요.", { autoClose: 1500 });
            return;
        }

        try {
            const response = await postPhoneSignIn(trimmedPhoneNumber);

            // 로그인 시 상태, 쿠키 저장을 위한 부분
            // 상태 저장
            setTokens(response.accessToken, response.refreshToken);
            setCustomerInfo(response.name, response.customerID, response.martID,"phone");

            await fetchAndStoreMartInfo(response.phoneNumber, "phone");

            // 로그인 성공 후 페이지 이동
            navigate(`/${response.martID}`);
            //await handleFCMTokenUpdate(response.customerID, response.martID);

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

    const handleEmailSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        const trimmedEmail = email.trim();
        if (!trimmedEmail) {
            toast.error("이메일을 입력해주세요.", { autoClose: 1500 });
            return;
        }

        try {
            const response = await postSocialSignIn(trimmedEmail);

            setTokens(response.accessToken, response.refreshToken);
            setCustomerInfo(response.name, response.customerID, response.martID, "email");

            await fetchAndStoreMartInfo(response.email, "email");

            navigate(`/${response.martID}`);
            toast.success(`로그인 성공: ${response.name}님 환영합니다!`, { autoClose: 1500 });
        } catch (error) {
            toast.error("로그인 실패: 등록되지 않은 이메일입니다", { autoClose: 1500 });
            console.error("Error during email sign-in:", error);
        }
    };


    return (
        <div className="min-h-screen bg-white flex items-center justify-center ">
            <div className="w-full max-w-md rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6 ">로그인</h2>
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

                    {/* 이메일 로그인 */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            이메일
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="example@example.com"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        />
                        <button
                            type="button"
                            onClick={handleEmailSignIn}
                            className="w-full mt-2 bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition duration-200"
                        >
                            이메일로 로그인
                        </button>
                    </div>
                    <div className="mt-6 border-t pt-6">
                        <button
                            type="button"
                            onClick={handleKakaoLogin}
                            className="w-full flex items-center rounded-lg justify-center"
                        >
                            <img
                                src="/logo/kakao_login_large_wide.png" // public 폴더에 있는 이미지 경로
                                alt="카카오 로그인"
                                className="w-full"
                            />
                        </button>
                    </div>
                </form>
            </div>
            <ToastContainer position="top-center" autoClose={2000}/>
        </div>
    );
}

export default CustomerPhoneSignInComponent;
