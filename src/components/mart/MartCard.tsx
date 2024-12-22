import React from "react";
import { IMart } from "../../types/mart";
import { useNavigate } from "react-router-dom";
import { useMartStore } from "../../stores/martStore";
import { useMartCookie } from "../../hooks/useMartCookie"; // 쿠키 관리 훅 가져오기

interface MartCardProps {
    mart: IMart;
    refProp?: React.Ref<HTMLDivElement>;
}

const MartCard: React.FC<MartCardProps> = ({ mart, refProp }) => {
    const navigate = useNavigate();
    const { setMartCookies } = useMartCookie(); // 쿠키 저장 훅 호출
    const { setMartIDAndLogo } = useMartStore(); // zustand 상태 업데이트

    const handleMartClick = () => {
        const martID = mart.martID;
        const martLogo = mart.thumbnailImage;

        // zustand 상태 업데이트
        setMartIDAndLogo(martID, martLogo);

        // 쿠키에 저장
        setMartCookies(martID, martLogo);

        // 고객 로그인 화면으로 이동
        navigate(`/customer/signIn`, { state: { useGeneralLayout: true } });
    };

    return (
        <div
            ref={refProp || null} // 추가: ref가 있을 경우에만 전달
            className="flex items-center bg-white rounded-lg shadow-md hover:shadow-lg p-4 cursor-pointer border"
            onClick={handleMartClick}
        >
            {/* 왼쪽: 이미지 */}
            <div className="w-24 h-24 flex-shrink-0 flex items-center justify-center overflow-hidden rounded-md">
                <img
                    src={`${mart.thumbnailImage}`}
                    alt={`${mart.martName} Thumbnail`}
                    className="max-w-full max-h-full object-contain"
                />
            </div>

            {/* 오른쪽: 텍스트 정보 */}
            <div className="flex-1 ml-4">
                <h3 className="text-lg font-bold text-gray-800">{mart.martName}</h3>
                <p className="text-gray-500 text-sm mt-2">
                    <span role="img" aria-label="phone">📞</span> {mart.phoneNumber}
                </p>
                <p className="text-gray-500 text-sm">
                    <span role="img" aria-label="location">📍</span> {mart.address}
                </p>
            </div>
        </div>
    );
};

export default MartCard;
