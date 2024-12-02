import React from 'react';
import { loadTossPayments } from '@tosspayments/payment-sdk';

const TossPayComponent: React.FC = () => {
    const handlePayment = async () => {
        const tossPayments = await loadTossPayments(''); // 클라이언트 키 사용

        tossPayments
            .requestPayment('카드', {
                amount: 50000, // 결제 금액
                orderId: 'order12345', // 고유 주문 ID
                orderName: '테스트 결제',
                customerName: '홍길동',
                successUrl: `${window.location.origin}/toss/success`,
                failUrl: `${window.location.origin}/toss/fail`,
            })
            .catch((error) => {
                if (error.code === 'USER_CANCEL') {
                    console.log('사용자가 결제를 취소했습니다.');
                } else {
                    console.error('결제 요청 중 오류 발생:', error);
                }
            });
    };

    return (
        <button onClick={handlePayment}>
            결제하기
        </button>
    );
};

export default TossPayComponent;
