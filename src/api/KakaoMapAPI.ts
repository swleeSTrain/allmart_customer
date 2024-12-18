import axios from "axios";
import {IMartMap} from "../types/mart.ts";

const host = "https://allmartsystem.shop/api/v1/kakao";

export const getMapScriptUrl = async (): Promise<string> => {
    try {
        const res = await axios.get<{ scriptUrl: string }>(`${host}/script`);

        console.log(res.data.scriptUrl);

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
        });
        return res.data;
    } catch (error) {
        console.error("Failed to get mart data", error);
        throw error;
    }
};


