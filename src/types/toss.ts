// Toss 결제 요청 타입
export interface TossPaymentRequest {
    amount: number; // 결제 금액
    orderId: string; // 주문 ID
    orderName: string; // 주문 이름
    customerName: string; // 고객 이름
    successUrl: string; // 결제 성공 URL
    failUrl: string; // 결제 실패 URL
}

 export interface TossPayComponentProps {
    amount: number;
    orderId: string;
    orderName: string;
    customerName: string;
}

// Toss 결제 응답 타입 (성공)
export interface TossPaymentSuccessResponse {
    paymentKey: string; // 결제 고유 키
    orderId: string; // 주문 ID
    amount: number; // 결제 금액
    method: string; // 결제 수단
    status: string; // 결제 상태
    approvedAt: string; // 결제 승인 시간
    receiptUrl?: string; // 영수증 URL
}

// Toss 결제 응답 타입 (실패)
export interface TossPaymentFailResponse {
    code: string; // 실패 코드
    message: string; // 실패 메시지
}

