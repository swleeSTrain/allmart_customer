import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useCustomerStore } from "../../stores/customerStore";
import BasicLayout from "../../layouts/BasicLayout.tsx";
import GeneralLayout from "../../layouts/GeneralLayout.tsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {sendPayFcm} from "../../api/FcmAPI.ts";
import {confirmPayment, createOrder} from "../../api/OrderAPI.ts";

function TossSuccessPage() {
    const { loginType, customerID, martID } = useCustomerStore(); // Zustand 상태로 로그인 타입 가져오기
    const Layout = loginType === "phone" ? BasicLayout : GeneralLayout;
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const paymentKey = searchParams.get("paymentKey");
        const orderId = searchParams.get("orderId");
        const amount = searchParams.get("amount");

        if (!orderId || !amount || !paymentKey) {
            console.error("필수 결제 데이터가 누락되었습니다:", { orderId, amount, paymentKey });
            toast.error("필수 결제 정보가 누락되었습니다. 다시 시도해주세요.", { autoClose: 2000 });
            return;
        }

        const requestData = {
            paymentKey,
            orderId,
            amount: parseInt(amount, 10),
        };

        const verifyAndCreateOrder = async () => {
            try {
                // 1. 결제 검증 요청
                console.log("결제 검증 요청:", requestData);
                const paymentResponse = await confirmPayment(requestData);
                console.log("결제 검증 성공:", paymentResponse);

                // 2. 주문 정보 생성
                const orderItems = JSON.parse(localStorage.getItem("orderItems") || "[]");

                const createOrderPayload = {
                    paymentDTO: {
                        paymentKey,
                        orderId,
                        amount: amount.toString(),
                    },
                    orderItems: orderItems,
                };

                console.log("주문 생성 요청:", createOrderPayload);
                const orderResponse = await createOrder(createOrderPayload);
                console.log("주문 생성 성공:", orderResponse);
                await sendPayFcm(customerID, martID); // FCM 전송
                // 결제 성공 메시지
                toast.success("결제에 성공했습니다.", {
                    autoClose: 2000,
                    className: "bg-green-500 text-white font-semibold rounded-lg shadow-md px-4 py-3",
                    bodyClassName: "text-center",
                });
            } catch (error: any) {
                console.error("결제 검증 실패:", error.message);
                // 결제 실패 메시지
                toast.error("결제 검증에 실패했습니다. 다시 시도해주세요.", {
                    autoClose: 2000,
                    className: "bg-red-500 text-white font-semibold rounded-lg shadow-md px-4 py-3",
                    bodyClassName: "text-center",
                });
            }
        };

        verifyAndCreateOrder();
    }, [searchParams]);

    const orderId = searchParams.get("orderId") || "정보 없음";
    const amount = Number(searchParams.get("amount") || 0).toLocaleString();

    return (
        <Layout>
            <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
                <div className="w-full max-w-lg bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-2xl font-bold text-center text-orange-400 mb-4">
                        주문이 완료되었습니다.
                    </h2>
                    <div className="space-y-4">
                        <div className="border-b pb-4">
                            <p className="text-gray-700 break-words">
                                <span className="font-semibold">주문번호:</span>{" "}
                                <span className="text-black">{orderId}</span>
                            </p>
                            <p className="text-gray-700 break-words">
                                <span className="font-semibold">결제금액:</span>{" "}
                                <span className="text-black">{amount}원</span>
                            </p>
                        </div>
                        <div className="flex justify-center mt-6">
                            <button
                                onClick={() => (window.location.href = "/")}
                                className="px-6 py-2 w-full max-w-xs bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-center"
                            >
                                홈으로 돌아가기
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer position="top-center" autoClose={2000}/>
        </Layout>
    );
}

export default TossSuccessPage;
