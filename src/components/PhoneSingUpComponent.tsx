import { ChangeEvent, useState } from "react";
import useSignUp from "../hooks/useSignup.ts";
import { ISignUpParam } from "../types/customer.ts";
import LoginCheckPage from "../pages/customer/SignUpModalPage.tsx";

const initialState: ISignUpParam = {
    phoneNumber: "",
};

function SignUpComponent() {
    const [param, setParam] = useState<ISignUpParam>({ ...initialState });
    const [showModal, setShowModal] = useState(false); // 모달 상태 관리
    const [modalMessage, setModalMessage] = useState(""); // 모달 메시지 관리

    const { doSignUp } = useSignUp();

    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        let name: string | undefined = event.target.name as keyof ISignUpParam;
        const value: string | undefined = event.target.value;

        setParam((prevParam) => ({
            ...prevParam,
            [name]: value,
        }));
    };

    const handleClick = () => {
        // 회원가입 로직 실행
        const isSuccess = param.phoneNumber.length > 0; // 예시: 성공 여부 조건
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
        <div className="flex justify-center items-start h-screen w-screen pt-16">
            <div className="w-full m-6 h-1/2 border-4 flex flex-col md:max-w-md">
                <h1 className="text-2xl font-bold text-center mb-9 mt-8">회원가입</h1>
                <input
                    type="text"
                    name="phoneNumber"
                    className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 mb-14"
                    placeholder="전화번호를 입력 해주세요"
                    value={param.phoneNumber}
                    onChange={(e) => handleChange(e)}
                />

                <button
                    onClick={handleClick}
                    className="bg-blue-500 text-white py-4 px-4 rounded-md hover:bg-blue-600 transition duration-300"
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
