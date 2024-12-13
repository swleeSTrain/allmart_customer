
import axios from 'axios';
import { IMart } from '../types/mart';

const host = 'http://localhost:8080/api/v1/mart';

export const getMartList = async (): Promise<IMart[]> => {
    const res = await axios.get(`${host}/list`);
    return res.data.dtoList; // dtoList를 반환
};
``