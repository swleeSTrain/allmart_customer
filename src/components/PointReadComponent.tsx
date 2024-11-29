import React, { useEffect, useState } from "react";
import { IPoint } from "../types/point.ts";
import { getDetail } from "../api/pointAPI.ts";

const initialPointState: IPoint = {
    customerID: 0,
    totalPoints: 0,
};

const PointReadComponent: React.FC = () => {
    const [point, setPoint] = useState<IPoint>(initialPointState);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const customerID = 1; // 사용자 ID
                const data = await getDetail(customerID);
                setPoint(data);
            } catch (err: any) {
                setError(err.message || "포인트 데이터를 가져오는데 실패했습니다.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div
            className="flex flex-col items-center space-y-6 w-full max-w-screen-sm sm:max-w-screen-md md:max-w-screen-lg lg:max-w-screen-xl mx-auto bg-gradient-to-br from-white to-blue-50 shadow-lg p-6 sm:p-8 rounded-xl">
            <div className="flex flex-col items-center space-y-3">
                {/* 동전 모양 SVG */}
                <div
                    className="w-16 h-16 sm:w-24 sm:h-24 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg relative">
                    {/* 동전 테두리 */}
                    <div className="absolute inset-0 rounded-full border-4 border-yellow-500"></div>
                    {/* 중앙의 텍스트 또는 아이콘 */}
                    <span className="text-white font-bold text-2xl sm:text-3xl"></span>
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-800">
                    포인트 적립
                </h2>
                <p className="text-sm sm:text-base lg:text-lg text-gray-600 text-center">
                    고객님의 포인트 정보를 확인하세요.
                </p>
            </div>


    {
        loading ? (
            <div className="flex items-center justify-center space-x-2 text-xl sm:text-2xl text-gray-600">
                <svg
                    className="animate-spin h-6 w-6 sm:h-8 sm:w-8 text-blue-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    ></circle>
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                        ></path>
                    </svg>
                    <span>로딩 중...</span>
                </div>
            ) : error ? (
                <div className="text-center text-base sm:text-lg text-red-600 bg-red-100 border border-red-300 p-4 sm:p-6 rounded-lg shadow-md">
                    {error}
                </div>
            ) : (
                <div className="w-full space-y-4">
                    <div className="p-4 sm:p-6 bg-white border border-gray-300 rounded-lg shadow-md">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-700">
                                고객 정보
                            </h3>
                            <span className="px-3 py-2 sm:px-4 sm:py-2 text-sm sm:text-lg font-medium text-blue-800 bg-blue-100 rounded-full">
                ID: {point.customerID}
              </span>
                        </div>
                        <p className="text-gray-500 mt-2 text-sm sm:text-base">
                            고객님의 고유 식별 번호입니다.
                        </p>
                    </div>

                    <div className="p-4 sm:p-6 bg-blue-50 border border-blue-300 rounded-lg shadow-md">
                        <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-blue-700">
                            총 적립 포인트
                        </h3>
                        <p className="text-2xl sm:text-4xl lg:text-5xl font-bold text-blue-600 mt-3 sm:mt-4">
                            {point.totalPoints.toLocaleString()} 포인트
                        </p>
                        <p className="text-gray-500 text-sm sm:text-base mt-1 sm:mt-2">
                            적립된 포인트를 확인하세요.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PointReadComponent;
