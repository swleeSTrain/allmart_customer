import axios from 'axios';

const host = 'http://localhost:8080/api/v1/orders';

interface SearchParams {
    keyword?: string;
    type?: string;
    orderId?: string;
}


export const getListOrder = async (page: number, searchParams: SearchParams = {})=> {
    const { keyword, type, orderId } = searchParams;

    const res = await axios.get(`${host}/list`, {
        params: {
            page: page,
            size: 10,
            keyword: keyword || null,
            type: type || null,
            orderId: orderId || null,
        },
    });

    return res.data;
};

// 조회 (Read)
export const getReadOrder = async (orderID: string)=> {
    const res = await axios.get(`${host}/${orderID}`);

    return res.data;
};
