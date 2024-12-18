import axios from 'axios';
import { IMart } from '../types/mart';

const host = 'https://allmartsystem.shop/api/v1/kakao/marts';

export const getMartList = async (
    lat: number, lng: number, keyword?: string, type?: string
): Promise<IMart[]> => {
    const res = await axios.get(`${host}/list`, {

        params: { lat, lng, keyword, type },
        withCredentials: true,
    });
    return res.data.dtoList; // dtoList를 반환
};