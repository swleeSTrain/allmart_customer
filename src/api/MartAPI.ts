import axios from 'axios';
import { IMart } from '../types/mart';

const host = 'https://allmartsystem.shop/api/v1/kakao/marts';
// const host = 'http://localhost:8080/api/v1/kakao/marts';
export const getMartRead = async (martID: number): Promise<IMart> => {
    try {

        const response = await axios.get<IMart>(`https://allmartsystem.shop/api/v1/mart/${martID}`);

        return response.data; // 조회된 마트 데이터를 반환
    } catch (error) {

        console.error(`Failed to fetch mart with ID ${martID}:`, error);

        throw error; // 에러를 호출한 곳으로 다시 전달
    }
};

export const getMartList = async (
    lat: number, lng: number, keyword?: string, type?: string
): Promise<IMart[]> => {

    const res = await axios.get(`${host}/list`, {

        params: { lat, lng, keyword, type },
        withCredentials: true,
    });

    return res.data.dtoList; // dtoList를 반환
};