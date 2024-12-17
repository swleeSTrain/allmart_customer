import React, { useState, useEffect } from "react";
import axios from "axios";
import {useNavigate, useSearchParams} from "react-router-dom";
import {useCustomerCookie} from "../../hooks/useCustomerCookie.ts";
import {useCustomerStore} from "../../stores/customerStore.ts";

const CustomerUpdate = () => {
    const [customer, setCustomer] = useState({
        customerID: "",
        phoneNumber: "",
        email: "",
        name: "",
        loyaltyPoints: 0,
        loginType: "",
    });
    const navigate = useNavigate();
    const{setTokens, setCustomerInfo} = useCustomerStore();
    const {setCustomerCookies, getCustomerCookies} = useCustomerCookie()


    const [isLoading, setIsLoading] = useState(false);

    const [searchParams] = useSearchParams();

    // 쿼리 파라미터 값 읽기
    const name : string | undefined = searchParams.get("name");
    const email : string | null = searchParams.get('email');
    const id : string | null = searchParams.get('phoneNumber');
    const accessToken :  string | null= searchParams.get('accessToken');
    const refreshToken : string | null= searchParams.get('refreshToken');

    // 값이 없을 경우 기본값 설정
    const defaultValue = searchParams.get('value') || '기본값';

    // 고객 정보 가져오기
    const fetchCustomer = async () => {

        setCustomerCookies(
            accessToken, refreshToken, name, customerID , martID
        )

        console.log("Param name:" + email)
        console.log("Param id:" + id)
        console.log("Param accessToken:" + accessToken)
        console.log("Param refreshToken:" + refreshToken)

        try {
            setIsLoading(true);
            const response = await axios.get("https://allmartservice.shop/api/v1/customer/get");
            setCustomer(response.data);
            setIsLoading(false);
        } catch (error) {
            console.error("고객 정보 가져오기 오류:", error);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchCustomer();
    }, []);

    // 입력 핸들러
    const handleChange = (e) => {
        const { name, value } = e.target;
        setCustomer({
            ...customer,
            [name]: value,
        });
    };

    // 회원 정보 수정 요청
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(
                `https://allmartservice.shop/api/v1/customers/update/${customer.customerID}`,
                customer
            );
            alert("회원 정보가 성공적으로 수정되었습니다.");
            navigate(`${martId}/details`)
        } catch (error) {
            console.error("회원 정보 수정 오류:", error);
            alert("회원 정보 수정에 실패했습니다.");
        }
    };

    if (isLoading) {
        return <div>로딩 중...</div>;
    }

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6 text-center">회원정보 수정</h1>
            <form onSubmit={handleSubmit} className="bg-gray-100 p-6 rounded-lg shadow-md">
                <div className="mb-4">
                    <label className="block text-lg font-medium text-gray-700">전화번호</label>
                    <input
                        type="text"
                        name="phoneNumber"
                        value={customer.phoneNumber}
                        onChange={handleChange}
                        disabled={customer.loginType === "PHONE"}
                        className="mt-2 block w-full border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-400 text-lg p-3"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-lg font-medium text-gray-700">이메일</label>
                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={handleChange}
                        disabled={customer.loginType === "PHONE"}
                        className="mt-2 block w-full border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-400 text-lg p-3"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-lg font-medium text-gray-700">이름</label>
                    <input
                        type="text"
                        name="name"
                        value={customer.name || ""}
                        onChange={handleChange}
                        className="mt-2 block w-full border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-400 text-lg p-3"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-lg font-medium text-gray-700">로열티 포인트</label>
                    <input
                        type="number"
                        name="loyaltyPoints"
                        value={customer.loyaltyPoints}
                        onChange={handleChange}
                        disabled
                        className="mt-2 block w-full border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-400 text-lg p-3"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-600 text-lg"
                >
                    수정하기
                </button>
            </form>
        </div>
    );
};

export default CustomerUpdate;
