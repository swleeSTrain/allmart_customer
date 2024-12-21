import { loadTossPayments } from "@tosspayments/payment-sdk";
import { useEffect } from "react";

interface TossPayProps {
    amount: number;
    orderId: string;
    orderName: string;
    customerName: string;
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
        }
    };

    useEffect(() => {
        handlePayment();
    }, []);

    return null; // UI 없음
};

export default TossPayComponent;