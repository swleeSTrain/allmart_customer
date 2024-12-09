import axios from 'axios';

const host = 'http://localhost:8080/api/v1/product';

// 엘라스틱서치
export const getElasticList = async (
    page: number = 1,
    size: number = 10,
    searchParams: { keyword?: string; type?: string; categoryID?: number, martID?: number } = {}
) => {

    const { keyword, type, categoryID, martID } = searchParams;

    const res = await axios.get(`${host}/${martID}/elastic`, {
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


// 리스트
export const getProductList = async (
    page: number = 1,
    size: number = 10,
    searchParams: { keyword?: string; type?: string; categoryID?: number, martID?: number } = {}
) => {

    const { keyword, type, categoryID, martID } = searchParams;

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
