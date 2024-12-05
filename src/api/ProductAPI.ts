import axios from 'axios';
import {useCustomerStore} from "../stores/customerStore.ts";


const host = 'http://localhost:8080/api/v1/product';

// 리스트
export const getProductList = async (
    page: number = 1,
    size: number = 10,
    searchParams: { keyword?: string; type?: string; categoryID?: number } = {}
) => {
    const { keyword, type, categoryID } = searchParams;

    // Zustand에서 martID 가져오기
    const { martID } = useCustomerStore.getState();

    if (!martID) {
        throw new Error('마트 ID가 설정되어 있지 않습니다.');
    }

    const res = await axios.get(`${host}/${martID}/list`, {
        params: {
            page,
            size,
            keyword: keyword || null,
            type: type || null,
            categoryID: categoryID || null,
        },
    });

    return res.data;
};
