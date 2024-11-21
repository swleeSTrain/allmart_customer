import { ChangeEvent, useState, useEffect } from "react";
import useSignUp from "../../hooks/useSignup.ts";
import { ISignUpParam } from "../../types/customer.ts";
import LoginCheckPage from "../../pages/customer/SignUpModalPage.tsx";

const initialState: ISignUpParam = {
    phoneNumber: "",
};

function SignUpComponent() {
    const [param, setParam] = useState<ISignUpParam>({ ...initialState });
    const [showModal, setShowModal] = useState(false); // 모달 상태 관리
    const [modalMessage, setModalMessage] = useState(""); // 모달 메시지 관리

    const { doSignUp } = useSignUp();

    useEffect(() => {
        // 스크롤 비활성화
        document.body.style.overflow = "hidden";

        // 컴포넌트 언마운트 시 스크롤 복구
        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const name = event.target.name as keyof ISignUpParam;
        const value = event.target.value;

        setParam((prevParam) => ({
            ...prevParam,
            [name]: value,
        }));
    };

    const handleClick = () => {
        const isSuccess = param.phoneNumber.length > 0;
        if (isSuccess) {
            setModalMessage("회원가입이 성공적으로 완료되었습니다!");
        } else {
            setModalMessage("회원가입에 실패했습니다. 다시 시도해주세요.");
        }

        setShowModal(true); // 모달 열기

        // 입력값 초기화
        setParam({ ...initialState });
    };

    const handleModalClose = () => {
        setShowModal(false); // 모달 닫기
    };

    return (
        <div className="flex justify-center items-center min-h-screen p-4 bg-gray-100">
            <div
                className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl transform -translate-y-16"
            >
                <h1 className="text-2xl font-bold text-center mb-8">회원가입</h1>
                <input
                    type="text"
                    name="phoneNumber"
                    className="w-full border border-gray-300 rounded-lg p-3 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
                    placeholder="전화번호를 입력 해주세요"
                    value={param.phoneNumber}
                    onChange={(e) => handleChange(e)}
                />
                <button
                    onClick={handleClick}
                    className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition duration-300"
                >
                    로그인
                </button>
            </div>

            {/* 모달 렌더링 */}
            {showModal && (
                <LoginCheckPage
                    msg={modalMessage}
                    callback={handleModalClose} // 모달 닫기 함수 전달
                />
            )}
        </div>
    );
}

export default SignUpComponent;
