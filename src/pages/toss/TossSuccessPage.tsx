import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { confirmPayment } from "../../api/tosspaymentAPI";

function TossSuccessPage() {
    const [searchParams] = useSearchParams();

    useEffect(() => {
        if (!searchParams) {
            console.error("Search parameters가 초기화되지 않았습니다.");
            return;
        }

        const orderId = searchParams.get("orderId");
        const amount = searchParams.get("amount");
        const paymentKey = searchParams.get("paymentKey");

        if (!orderId || !amount || !paymentKey) {
            console.error("필수 결제 데이터가 누락되었습니다:", { orderId, amount, paymentKey });
            alert("필수 결제 정보가 누락되었습니다. 다시 시도해주세요.");
            return;
        }

        const requestData = {
            orderId,
            amount: parseInt(amount, 10),
            paymentKey,
        };

        const verifyPayment = async () => {
            try {
                console.log("결제 데이터 확인 중:", requestData);
                const response = await confirmPayment(requestData);
                console.log("결제 검증 성공:", response);

                alert("결제 검증에 성공했습니다.");
            } catch (error: any) {
                console.error("결제 검증 실패:", error.message);
                alert("결제 검증에 실패했습니다. 다시 시도해주세요.");
            }
        };

        verifyPayment();
    }, [searchParams]);

    const orderId = searchParams.get("orderId") || "정보 없음";
    const amount = Number(searchParams.get("amount") || 0).toLocaleString();

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="max-w-lg w-full bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">
                     주문이 완료 되었습니다.
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
                            onClick={() => window.location.href = "/"}
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                        >
                            홈으로 돌아가기
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TossSuccessPage;
