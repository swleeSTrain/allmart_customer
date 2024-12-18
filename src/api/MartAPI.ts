import axios from 'axios';
import { IMart } from '../types/mart';

const host = 'https://allmartsystem.shop/api/v1/kakao/marts';

export const getMartList = async (
    lat: number, lng: number, keyword?: string, type?: string
): Promise<IMart[]> => {
    try {
        const res = await axios.get(`${host}/list`, {
            params: { lat, lng, keyword, type },
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        });
        return res.data.dtoList;
    } catch (error) {
        console.error('Error fetching mart list:', error);
        throw error;
    }
};
