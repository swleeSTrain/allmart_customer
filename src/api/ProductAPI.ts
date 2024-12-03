import axios from 'axios';

const host = 'http://localhost:8080/api/v1/product';

// 리스트
export const getProductList = async (
    page: number = 1,
    size: number = 10,
    searchParams: { keyword?: string; type?: string; categoryID?: number } = {}
) => {



    const { keyword, type, categoryID } = searchParams;

    const res = await axios.get(`${host}/list`, {
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

