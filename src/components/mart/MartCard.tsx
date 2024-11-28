import React from 'react';
import { IMart } from '../../types/mart';
import Swal from 'sweetalert2';

interface MartCardProps {
    mart: IMart;
}

const MartCard: React.FC<MartCardProps> = ({ mart }) => {
    const handleMartClick = () => {
        Swal.fire({
            title: `${mart.martName}를 추가하시겠습니까?`,
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "추가",
            cancelButtonText: "취소",
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "추가 완료!",
                    text: `${mart.martName}가 추가되었습니다.`,
                    icon: "success",
                    confirmButtonColor: "#3085d6",
                });
            }
        });
    };

    return (
        <div
            className="flex flex-col items-center bg-white rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-transform duration-300 p-4 cursor-pointer"
            onClick={handleMartClick}
        >
            {/* 로고 */}
            <div className="w-24 h-24 bg-white border border-gray-200 overflow-hidden flex items-center justify-center mb-4">
                <img
                    src={`http://localhost:8080/uploads/s_${mart.thumbnailImage}`}
                    alt={`${mart.martName} Thumbnail`}
                    className="max-w-full max-h-full object-contain"
                />
            </div>

            {/* 마트 정보 */}
            <h3 className="text-lg font-bold text-gray-800 text-center">{mart.martName}</h3>
            <p className="text-gray-500 text-sm text-center mt-2">
                <span role="img" aria-label="phone">📞</span> {mart.phoneNumber}
            </p>
            <p className="text-gray-500 text-sm text-center">
                <span role="img" aria-label="location">📍</span> {mart.address}
            </p>
        </div>
    );
};

export default MartCard;
