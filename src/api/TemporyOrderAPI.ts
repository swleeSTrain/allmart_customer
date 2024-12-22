import axios from 'axios';
import { ITemporaryOrder } from '../types/iTemporaryOrder.ts';

// const host = 'http://localhost:8080/api/v1/temporary-orders';
const host = 'https://allmartsystem.shop/api/v1/temporary-orders';

// 상태별 임시 주문 리스트 조회 함수
export const getTemporaryOrders = async (status: string): Promise<ITemporaryOrder[]> => {
    try {
        const res = await axios.get(`${host}/status/${status}`, { withCredentials: true });

        console.log('===============================');
        console.log('Temporary Orders:', res.data);

        return res.data;
    } catch (error) {
        console.error('Error fetching temporary orders:', error);
        throw error;
    }
};

export const deleteTemporaryOrder = async (tempOrderId: number): Promise<void> => {
    try {
        await axios.delete(`${host}/${tempOrderId}`, { withCredentials: true });
        console.log(`Order ${tempOrderId} deleted successfully.`);
    } catch (error) {
        console.error('Error deleting order:', error);
        throw error;
    }
};