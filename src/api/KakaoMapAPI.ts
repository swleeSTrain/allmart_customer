import axios from "axios";
import { IMartMap } from "../types/mart.ts";

const host = "https://allmartsystem.shop/api/v1/kakao";

const axiosInstance = axios.create({
    baseURL: host,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
});

export const getMapScriptUrl = async (): Promise<string> => {
    try {
        const res = await axiosInstance.get<{ scriptUrl: string }>("/script");
        console.log(res.data.scriptUrl);
        return res.data.scriptUrl;
    } catch (error) {
        console.error("Failed to get Kakao Map Script URL", error);
        throw error;
    }
};

export const getMarts = async (lat: number, lng: number): Promise<IMartMap[]> => {
    try {
        const res = await axiosInstance.get<IMartMap[]>("/marts", {
            params: { lat, lng }
        });
        return res.data;
    } catch (error) {
        console.error("Failed to get mart data", error);
        throw error;
    }
};
