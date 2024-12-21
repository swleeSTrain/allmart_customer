import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { confirmPayment, createOrder } from "../../api/orderAPI";
import { useCustomerStore } from "../../stores/customerStore";
import BasicLayout from "../../layouts/BasicLayout";
import GeneralLayout from "../../layouts/GeneralLayout";

function TossSuccessPage() {
    const { loginType } = useCustomerStore(); // Zustand 상태로 로그인 타입 가져오기
    const Layout = loginType === "phone" ? BasicLayout : GeneralLayout;
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const paymentKey = searchParams.get("paymentKey");
        const orderId = searchParams.get("orderId");
        const amount = searchParams.get("amount");

        if (!paymentKey || !orderId || !amount) {
            alert("필수 결제 데이터가 누락되었습니다.");
            console.error("결제 데이터 누락:", { paymentKey, orderId, amount });
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

                alert("주문이 성공적으로 완료되었습니다!");
                localStorage.removeItem("orderItems"); // 주문 데이터 제거
            } catch (error) {
                console.error("결제 검증 또는 주문 생성 실패:", error);
                alert("결제 처리 중 오류가 발생했습니다. 다시 시도해주세요.");
            }
        };

        verifyAndCreateOrder();
    }, [searchParams]);

    const orderId = searchParams.get("orderId") || "정보 없음";
    const amount = Number(searchParams.get("amount") || 0).toLocaleString();

    return (
        <Layout>
            <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
                <div className="max-w-lg w-full bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">
                        주문이 완료되었습니다.
                    </h2>
                    <div className="space-y-4">
                        <div className="border-b pb-4">
                            <p className="text-gray-700">
                                <span className="font-semibold">주문번호:</span>{" "}
                                <span className="text-black">{orderId}</span>
                            </p>
                            <p className="text-gray-700">
                                <span className="font-semibold">결제금액:</span>{" "}
                                <span className="text-black">{amount}원</span>
                            </p>
                        </div>
                        <div className="flex justify-center mt-6">
                            <button
                                onClick={() => (window.location.href = "/")}
                                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                            >
                                홈으로 돌아가기
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default TossSuccessPage;
