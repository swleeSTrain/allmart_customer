import axios from "axios";

// const BASE_URL = "https://allmartsystem.shop/api/v1/toss-payments";
const BASE_URL = "http://localhost:8080/api/v1/toss-payments";
// 백엔드 결제 검증 요청
export const confirmPayment = async (paymentData: { paymentKey: string; orderId: string; amount: number }) => {
    console.log("백엔드로 전송할 데이터:", paymentData); // 요청 전에 데이터 확인

    try {
        const response = await axios.post(`${BASE_URL}/confirm`, paymentData,{withCredentials: true,});
        console.log("백엔드 응답 데이터:", response.data); // 성공 시 응답 데이터 확인
        return response.data;
    } catch (error: any) {
        console.log("백엔드 요청 중 에러 발생:", error.message); // 에러 메시지 출력
        throw new Error(error.response?.data?.message || "결제 검증에 실패했습니다.");
    }
};
