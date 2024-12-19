import React, { useState, useEffect } from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
import {useCustomerCookie} from "../../hooks/useCustomerCookie.ts";
import {useCustomerStore} from "../../stores/customerStore.ts";
import {updateCustomer} from "../../api/CustomerAPI.ts";
import {Simulate} from "react-dom/test-utils";
import {toast} from "react-toastify";
import {ICustomer} from "../../types/customer.ts";
import axios, {name} from "axios";
import {Cookies} from "react-cookie";


const CustomerUpdate = () => {

    const [customer, setCustomer] = useState<ICustomer | null>({
        accessToken: "",
        customerID: 0,
        email: "",
        loyaltyPoints: 0,
        martID: 0,
        name: "",
        phoneNumber: "",
        refreshToken: "",
        social: false,

    });
    const navigate = useNavigate();
    const{setTokens, setCustomerInfo} = useCustomerStore();
    const {setCustomerCookies, getCustomerCookies} = useCustomerCookie()

    // 마트id 사용하는 곳
    const {martID: cookieMartID} = useCustomerCookie().getCustomerCookies();
    const martID = useCustomerStore((state) => state.martID) || cookieMartID;

    const [isLoading, setIsLoading] = useState(false);

    const [searchParams] = useSearchParams();




    // 카카오 로그인으로 인해서 정보수정 화면으로 넘어 온건지 아니면 일반적으로 회원수정 화면에 접속한건지 구분해주는 값
    // kakao 값이 넘어옴
    const frag = searchParams.get('frag') || 'normal';

    // 고객 정보 가져오기
    const fetchCustomer = async () => {
        // 쿼리 파라미터 값 읽기
        if(frag === 'kakao'){
            console.log("frag :" + frag)
            setCustomerCookies(null, null, null, searchParams.get('customerID'), martID)
            const email = searchParams.get('email');

            // customer 상태에 email과 customerID 설정
            setCustomer((prev) => ({
                ...prev,
                email: email || "",
                customerID: Number(searchParams.get('customerID')) || 0,
            }));

        }
        try {
            setIsLoading(true);
            const Response = await axios.get(`http://localhost:8080/api/v1/customer/update/${getCustomerCookies().customerID}`);
            setCustomer(Response.data);
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
        })
    };

    if (!customer) {
        return <div>로딩 중...</div>;
    }

    // 회원 정보 수정 요청
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const response = await updateCustomer(customer);
                setTokens(response.accessToken, response.refreshToken);
                setCustomerInfo(response.name, response.customerID, martID, "social", response.email);
                setCustomerCookies(
                    response.accessToken,
                    response.refreshToken,
                    response.name,
                    response.customerID,
                    martID
                );

                console.log('고객 정보가 성공적으로 업데이트되었습니다.')
                toast.success(`고객 정보가 성공적으로 업데이트되었습니다.`, {
                    autoClose: 1500,
                    className: "bg-blue-500 text-white font-semibold rounded-lg shadow-md px-4 py-3",
                    bodyClassName: "text-center",
                });

                navigate(`/${martID}`)

        } catch (error) {

                console.error('회원정보 수정 오류 : ' + error)
                toast.error("회원정보 수정 오류: 다시 시도 해주세요", {
                    autoClose: 1500,
                    className: "bg-red-500 text-white font-semibold rounded-lg shadow-md px-4 py-3",
                    bodyClassName: "text-center"
                });

                navigate(`/${martID}/customer/update`)

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
                    <label className="block text-lg font-medium text-gray-700">이름</label>
                    <input
                        type="text"
                        name="name"
                        value={customer?.name || ""}
                        onChange={handleChange}
                        className="mt-2 block w-full border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-400 text-lg p-3"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-lg font-medium text-gray-700">전화번호</label>
                    <input
                        type="text"
                        name="phoneNumber"
                        value={customer?.phoneNumber || undefined}
                        onChange={handleChange}
                        className="mt-2 block w-full border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-400 text-lg p-3"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-lg font-medium text-gray-700">이메일</label>
                    <input
                        type="email"
                        name="email"
                        // value={frag === null ? customer?.email || ""  : email}
                        value= {customer?.email || "" }
                        onChange={handleChange}
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
