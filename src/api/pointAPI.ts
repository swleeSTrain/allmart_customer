import axios from "axios";
import { IPoint } from "../types/point";

// API 기본 URL 설정
const host: string = "http://localhost:8080/api/v1/points";


export const getDetail = async (customerID: number) : Promise<IPoint>  => {
    const res = await axios.get(`${host}/${customerID}`);

    console.log(res.data);
    return res.data;

};
