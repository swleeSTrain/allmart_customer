import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCustomerCookie } from "../../hooks/useCustomerCookie.ts";
import { useCustomerStore } from "../../stores/customerStore.ts";
import { updateCustomer } from "../../api/CustomerAPI.ts";
import { toast } from "react-toastify";
import axios from "axios";
import LoadingPage from "../../pages/LoadingPage.tsx";
import { useMartStore } from "../../stores/martStore.ts";
import { useMartSync } from "../../hooks/useMartSync.ts";

const CustomerUpdate = () => {
    const [customer, setCustomer] = useState({
        accessToken: "",
        customerID: 0,
        email: "",
        loyaltyPoints: 0,
        martID: 0,
        name: "",
        phoneNumber: "",
        refreshToken: "",
        social: false,
        loginType: ""
    });

    const navigate = useNavigate();
    const { setTokens, setCustomerInfo } = useCustomerStore();
    const { setCustomerCookies, getCustomerCookies } = useCustomerCookie();

    useMartSync();

    const martID = useMartStore((state) => state.martID);

    const [isLoading, setIsLoading] = useState(false);

    const fetchCustomer = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(
                `https://allmartsystem/api/v1/customer/update/${getCustomerCookies().customerID}`
            );
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

    const handleChange = (e) => {
        const { name, value } = e.target;

        setCustomer((prevCustomer) => ({
            ...prevCustomer,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await updateCustomer(customer);

            setTokens(response.accessToken, response.refreshToken);
            if (martID != null) {
                setCustomerInfo(
                    response.name,
                    response.customerID,
                    martID,
                    "email"
                );
            }
            if (martID != null) {
                setCustomerCookies(
                    response.accessToken,
                    response.refreshToken,
                    response.name,
                    response.customerID,
                    martID
                );
            }

            console.log("고객 정보가 성공적으로 업데이트되었습니다.");
            toast.success("고객 정보가 성공적으로 업데이트되었습니다.", {
                autoClose: 1500,
                className:
                    "bg-blue-500 text-white font-semibold rounded-lg shadow-md px-4 py-3",
                bodyClassName: "text-center",
            });

            navigate(`/1`);
        } catch (error) {
            console.error("회원정보 수정 오류:", error);
            toast.error("회원정보 수정 오류: 다시 시도 해주세요", {
                autoClose: 1500,
                className:
                    "bg-red-500 text-white font-semibold rounded-lg shadow-md px-4 py-3",
                bodyClassName: "text-center",
            });
        }
    };

    if (isLoading) {
        return <LoadingPage />;
    }

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6 text-center">회원정보 수정</h1>
            <form
                onSubmit={handleSubmit}
                className="bg-gray-100 p-6 rounded-lg shadow-md"
            >
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
                    <label className="block text-lg font-medium text-gray-700">
                        전화번호
                    </label>
                    <input
                        type="text"
                        name="phoneNumber"
                        value={customer.phoneNumber || ""}
                        onChange={handleChange}
                        className="mt-2 block w-full border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-400 text-lg p-3"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-lg font-medium text-gray-700">
                        이메일
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={customer.email || ""}
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
