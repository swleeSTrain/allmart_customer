import React from 'react';
import { IMart } from '../../types/mart';
import {useNavigate} from "react-router-dom";

interface MartCardProps {
    mart: IMart;
    refProp?: React.Ref<HTMLDivElement>;
}

const MartCard: React.FC<MartCardProps> = ({ mart, refProp }) => {
    const navigate = useNavigate();

    const handleMartClick = () => {
        navigate(`/${mart.martID}`);
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
