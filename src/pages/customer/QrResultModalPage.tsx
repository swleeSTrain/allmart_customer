import React, { useState } from "react";
import axios from "axios";
import ResultModal from "../../components/customer/QrSignUpModal.tsx";
import BasicLayout from "../../layouts/BasicLayout.tsx";

function QrResultModalPage() {
    const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태
    const [modalData, setModalData] = useState({ img: "", msg: "" }); // 모달 데이터

    // 백엔드에서 데이터 가져오기
    const fetchModalData = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/v1/qrcode/signUp");
            const { filePath, qrCodeUrl } = response.data;
            setModalData({ img: filePath, msg: qrCodeUrl });
            setIsModalOpen(true); // 모달 열기
        } catch (error) {
            console.error("Error fetching QR result:", error);
            setModalData({
                img: "",
                msg: "본인인증을 해주시길 바랍니다.",
            });
            setIsModalOpen(true); // 오류 상태로 모달 열기
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false); // 모달 닫기
    };

    return (
        <BasicLayout>
            <div className="flex justify-center items-start min-h-screen bg-gray-100 pt-20">
                <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg relative">
                    <h1 className="text-2xl font-bold mb-6 text-center text-blue-600">회원정보</h1>
                    <form className="space-y-6">
                        {/* 이름 입력 */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">이름</label>
                            <input
                                type="text"
                                name="name"
                                className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                placeholder="이름을 입력하세요"
                                required
                            />
                        </div>

                        {/* 이메일 입력 */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">이메일</label>
                            <input
                                type="email"
                                name="email"
                                className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                placeholder="이메일을 입력하세요"
                                required
                            />
                        </div>

                        {/* 전화번호 입력 */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">전화번호</label>
                            <input
                                type="tel"
                                name="phoneNumber"
                                className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                placeholder="전화번호를 입력하세요"
                                required
                            />
                        </div>

                        {/* 회원가입 버튼 */}
                        {/*<button*/}
                        {/*    type="submit"*/}
                        {/*    className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-300"*/}
                        {/*>*/}
                        {/*    회원가입*/}
                        {/*</button>*/}
                    </form>

                    {/* QR 인증 버튼 */}
                    <div className="mt-8 flex justify-center">
                        <button
                            onClick={fetchModalData}
                            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-300 text-lg"
                        >
                            QR 인증
                        </button>
                    </div>
                </div>
            </div>

            {/* 모달 렌더링 */}
            {isModalOpen && (
                <ResultModal
                    img={modalData.img}
                    msg={modalData.msg}
                    callback={handleCloseModal}
                />
            )}
        </BasicLayout>
    );
}

export default QrResultModalPage;
