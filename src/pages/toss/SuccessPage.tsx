import React, { useEffect } from 'react';
import {confirmPayment} from "../../api/tosspaymentAPI.ts";


const SuccessPage: React.FC = () => {
    useEffect(() => {
        const query = new URLSearchParams(window.location.search);
        const paymentKey = query.get('paymentKey');
        const orderId = query.get('orderId');
        const amount = query.get('amount');

        if (paymentKey && orderId && amount) {
            confirmPayment(paymentKey, orderId, parseInt(amount, 10))
                .then((data) => {
                    console.log('결제가 성공적으로 검증되었습니다:', data);
                })
                .catch((error) => {
                    console.error('결제 검증 실패:', error);
                });
        }
    }, []);

    return (
        <div>
            <h1>결제가 성공적으로 완료되었습니다!</h1>
        </div>
    );
};

export default SuccessPage;
