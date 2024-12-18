import axios from 'axios';
import {IOrder} from "../types/order.ts";

const host = 'https://allmartsystem.shop/api/v1/orders';

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



