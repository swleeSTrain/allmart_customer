const BASE_URL = '/api/v1/toss-payments';

export const confirmPayment = async (paymentKey: string, orderId: string, amount: number) => {
    const response = await fetch(`${BASE_URL}/confirm`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            paymentKey,
            orderId,
            amount,
        }),
    });

    if (!response.ok) {
        throw new Error('결제 검증에 실패했습니다.');
    }

    return response.json();
};
