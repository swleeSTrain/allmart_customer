import axios from 'axios';
import {IProduct} from "../types/product.ts";

// const host = 'https://allmartsystem.shop/api/v1/product';
const host = 'http://localhost:8080/api/v1/product';

export const getReadProduct = async (martID: number, productID: number): Promise<IProduct> => {

    const res = await axios.get(`${host}/${martID}/${productID}`,{withCredentials: true,});

    return res.data;
}

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
        withCredentials: true,

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
        withCredentials: true,
    });

    return res.data;
};
