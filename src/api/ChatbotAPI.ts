import axios from "axios";
import { IOrderRequest, ISlot  } from "../types/chatbot.ts";

// const chatbotHost = 'https://0962-58-235-119-39.ngrok-free.app/api/v1/chatbot';
const chatbotHost = 'https://allmartservice.shop/api/v1/chatbot';
const orderHost = 'https://allmartservice.shop/api/v1/orders/voice';

// 챗봇 요청 보내기 함수
export const sendChatbotRequest = async (userId: number,descriptionText: string): Promise<string> => {

    // 챗봇 API에 전송할 JSON 형식 데이터
    const chatbotRequestData = {
        "version": "v2",
        "userId": userId,
        "timestamp": Date.now(),
        "bubbles": [
            {
                "type": "text",
                "data": {
                    "description": descriptionText
                }
            }
        ],
        "event": "send"
    };

    try {
        const response = await axios.post(chatbotHost, chatbotRequestData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        console.log("챗봇 응답 데이터:", response.data);

        // 응답에서 필요한 데이터 추출
        const userId = response.data.userId; // userId 추출
        const slot = response.data.bubbles[0]?.slot || []; // slot 배열 추출

        const productName = slot.find((item: ISlot) => item.name === "상품명")?.value || ""; // 상품명 추출
        const quantityText = slot.find((item: ISlot) => item.name === "수량")?.value || "";   // 수량 추출

        const quantity = parseInt(quantityText);  // 수량을 정수로 변환

        console.log("userId:", userId);
        console.log("productName:", productName);
        console.log("quantity:", quantity);

        // 조건이 모두 만족할 때만 주문 API 호출
        if (userId && productName && quantityText && !isNaN(quantity) && quantity > 0) {
            console.log("유효한 데이터, 주문 API 호출");
            await sendOrderRequest({ userId, productName, quantity });
        } else {
            console.warn("유효하지 않은 데이터, 주문 API 호출 생략");
        }

        // 응답 JSON에서 description 필드를 추출하여 반환
        const description = response.data.bubbles[0]?.data?.description;

        return description;

    } catch (error) {
        console.error("챗봇 요청 중 오류 발생:", error);
        throw error;
    }
};

// 주문 API 호출 함수
const sendOrderRequest = async (orderData: IOrderRequest): Promise<void> => {
    try {
        const response = await axios.post(orderHost, orderData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log("주문 전송 성공:", response.data);
    } catch (error) {
        console.error("주문 요청 중 오류 발생:", error);
    }
};