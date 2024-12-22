import axios from 'axios';
import {IOrder} from "../types/order.ts";

const host = 'https://allmartsystem.shop/api/v1/orders';
// const host = 'http://localhost:8080/api/v1/orders';

export const getReadOrder = async (): Promise<IOrder> => {
    try {
        const res = await axios.get(`${host}/1`,{withCredentials: true,});

        console.log("===============================");

        console.log(res.data);

        return res.data;
    } catch (error) {
        console.error('Error fetching order:', error);
        throw error; // 필요하면 에러를 다시 던지거나 다른 처리를 할 수 있습니다.
    }
};

// 결제 검증 API 호출
export const confirmPayment = async (data: {
    paymentKey: string;
    orderId: string;
    amount: number;
}) => {
    const response = await axios.post(`${host}/toss-payments/confirm`, data,{withCredentials: true,});
    return response.data;
};

// 주문 생성 API 호출
export const createOrder = async (data: {
    paymentDTO: { paymentKey: string; orderId: string; amount: string };
    orderItems: {
        productId: number;
        quantity: number;
        unitPrice: number;
        productName: string;
    }[];
}) => {
    const response = await axios.post(`${host}/create`, data,{withCredentials: true,});
    return response.data;
};


// 주문 목록 조회 API 호출
export const getOrderList = async (params: {
    status?: string;       // 주문 상태 필터링
    customerId?: string;   // 고객 ID 필터링
    page?: number;         // 페이지 번호
    size?: number;         // 페이지 크기
}) => {
    try {
        const response = await axios.get(`${host}/list`, { params,withCredentials:true },);
        console.log("Order List:", response.data);
        return response.data; // PageResponseDTO 반환
    } catch (error) {
        console.error("Error fetching order list:", error);
        throw error;
    }
};