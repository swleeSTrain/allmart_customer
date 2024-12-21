import { loadTossPayments } from "@tosspayments/payment-sdk";
import { useEffect } from "react";
import {toast} from "react-toastify";

interface TossPayProps {
    amount: number;
    orderId: string;
    orderName: string;
    customerName: string;
    onSuccess: () => void,
    onError: (error: string) => void
}

const TossPayComponent: React.FC<TossPayProps> = ({
                                                      amount,
                                                      orderId,
                                                      orderName,
                                                      customerName,

                                                  }) => {
    const handlePayment = async () => {
        try {
            const tossPayments = await loadTossPayments("test_ck_ma60RZblrqR6ROZp0Bze8wzYWBn1");

            await tossPayments.requestPayment("카드", {
                amount,
                orderId,
                orderName,
                customerName,
                successUrl: `${window.location.origin}/toss/success?orderId=${orderId}&amount=${amount}`,
                failUrl: `${window.location.origin}/toss/fail`,
            });
        } catch (error) {
            console.error("결제 요청 중 오류 발생:", error);
            toast.error("결제에 실패했습니다. 다시 시도해주세요.", {
                autoClose: 1500,
                className: "bg-blue-500 text-white font-semibold rounded-lg shadow-md px-4 py-3",
                bodyClassName: "text-center",
            });
        }
    };

    useEffect(() => {
        handlePayment();
    }, []);

    return null; // UI 없음
};

export default TossPayComponent;
