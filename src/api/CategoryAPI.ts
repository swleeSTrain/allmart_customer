import axios from 'axios';

//const host = 'https://allmartsystem.shop/api/v1/category';
const host = 'http://localhost:8080/api/v1/category';

// 리스트
export const getCategoryList = async (page: number = 1, size: number = 10) => {
    const res = await axios.get(`${host}/list`, {
        params: {
            page,
            size,
        },
        withCredentials: true,
    });

    return res.data;
};
