import axios from "axios";
import {IMartMap} from "../types/mart.ts";

const host = "https://allmartsystem.shop/api/v1/kakao";
// const host = "http://localhost:8080/api/v1/kakao";

export const getMapScriptUrl = async (): Promise<string> => {
    try {
        const res = await axios.get<{ scriptUrl: string }>(`${host}/script`,);

        return res.data.scriptUrl;
    } catch (error) {
        console.error("Failed to get Kakao Map Script URL", error);
        throw error;
    }
};

export const getMarts = async (lat: number, lng: number): Promise<IMartMap[]> => {
    try {
        const res = await axios.get<IMartMap[]>(`${host}/marts`, {
            params: { lat, lng }, // 위치 정보를 쿼리 파라미터로 전달
            withCredentials: true,
        });
        return res.data;
    } catch (error) {

        throw error;
    }
};


