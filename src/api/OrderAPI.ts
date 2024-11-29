
import axios from "axios";
import { OrderList } from "../types/order";

export const fetchOrders = async (): Promise<OrderList[]> => {
    const response = await axios.get("http://localhost:8080/api/v1/orders/list");
    return response.data.data; // PageResponseDTO의 data
};
// interface SearchParams {
//     keyword?: string;
//     type?: string;
//     orderId?: string;
// }



// export const getListOrder = async (page: number, searchParams: SearchParams = {})=> {
//     const { keyword, type, orderId } = searchParams;
//
//     const res = await axios.get(`${host}/list`, {
//         params: {
//             page: page,
//             size: 10,
//             keyword: keyword || null,
//             type: type || null,
//             orderId: orderId || null,
//         },
//     });
//
//     return res.data;
// };


