import React, { useState, useEffect } from "react";
import qrImage from '../../assets/qrcode.png'
interface ResultModalProps {
    img: string;
    msg: string;
    callback: () => (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ResultModal: React.FC<ResultModalProps> = ({ img, msg, callback }) => {
    const [timeLeft, setTimeLeft] = useState(60); // 타이머 시작값 (초 단위)

    // 타이머 로직
    useEffect(() => {
        if (timeLeft <= 0) return;

        const timerId = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        // 컴포넌트가 언마운트될 때 타이머 정리
        return () => clearInterval(timerId);
    }, [timeLeft]);

    // 타이머가 0이 되면 자동으로 콜백 실행
    useEffect(() => {
        if (timeLeft === 0) {
            callback();
        }
    }, [timeLeft, callback]);

    return (
        // <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
        //     <div className="bg-blue-600 p-8 rounded-lg shadow-lg w-96">
        //         <h2 className="text-xl font-semibold mb-4">QR 본인인증</h2>
        //         <img
        //             className="mb-6"
        //             src={img}
        //             alt="qr 이미지를 찾지 못했습니다. 다시 시도해주세요"
        //         />
        //         <p className="mb-6">{msg}</p>
        //         {/* 타이머 표시 */}
        //         <p className="text-lg font-bold text-white mb-4">
        //             남은 시간: {timeLeft}초
        //         </p>
        //         <button
        //             className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        //             onClick={() => callback()}
        //         >
        //             닫기
        //         </button>
        //     </div>
        // </div>

        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-80 text-center">
                <h2 className="text-lg font-semibold mb-4">QR 체크인</h2>
                <img
                    //src={img}
                    src={qrImage}
                    alt="QR 코드 이미지"
                    className="w-full h-auto mb-4 border border-gray-300 rounded-md"
                />
                <p className="text-lg">
                    남은 시간:
                    <span className="text-red-500 font-bold">{timeLeft}초</span>
                </p>
                <p className="text-sm text-gray-600 mt-2">
                    {msg}
                </p>
                <button
                    className="mt-6 bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                    onClick={() => callback()}>취소
                </button>
            </div>
        </div>
    );
};

export default ResultModal;
