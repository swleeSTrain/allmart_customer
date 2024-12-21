import axios from 'axios';

const host = 'https://allmartservice.shop/fcm';

export const sendPayFcm = async (userId: number | null, martId: number | null) => {
    const res = await axios.post(`${host}/notifications/send"`, {
        userId,
        martId,
        title:"결제",
        body:"결제가 완료되었습니다",
    });

    return res.data;
};

export const sendOrderFcm = async (userId: string,martId: string) => {
    const res = await axios.post(`${host}/send`, {
        userId,
        martId,
        title:"주문",
        body:martId+"번 마트"+userId+"주문이 접수되었습니다",
    });

    return res.data;
};