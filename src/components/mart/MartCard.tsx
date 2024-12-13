import React from 'react';
import { IMart } from '../../types/mart';
import Swal from 'sweetalert2';
import {useNavigate} from "react-router-dom";

interface MartCardProps {
    mart: IMart;
}


const MartCard: React.FC<MartCardProps> = ({ mart }) => {

    const navigate = useNavigate();

    const handleMartClick = () => {
        Swal.fire({
            title: `${mart.martName}를 선택하시겠습니까?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '선택',
            cancelButtonText: '취소',
        }).then(() => {
            navigate(`/${mart.martID}`);
        });
    };

    return (
        <div
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
