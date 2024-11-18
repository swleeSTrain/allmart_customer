
// 챗봇 응답
export interface IChatbotResponse {
    userId: string;
    bubbles: {
        data: {
            description: string;
        };
        slot?: ISlot[];
    }[];
}

// 챗봇 응답 내부 slot
export interface ISlot {
    name: string;
    value: string;
}

// 주문 데이터
export interface IOrderRequest {
    userId: string;
    productName: string;
    quantity: number;
}

// 챗봇 처리
export interface UseVoiceChatbotOptions {
    onTranscription?: (text: string) => void;
    onResponse?: (response: string) => void;
}