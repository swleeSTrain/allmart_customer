import axios from "axios";

const host = "https://allmartsystem.shop/api/v1/qna/answer";
// const host = "http://localhost:8080/api/v1/qna/answer";

// 특정 질문의 답변 목록 가져오기
export const fetchAnswersByQno = async (qno: number) => {
    const response = await axios.get(`${host}/${qno}`,{ withCredentials: true });
    return response.data; // 답변 배열 반환
};
