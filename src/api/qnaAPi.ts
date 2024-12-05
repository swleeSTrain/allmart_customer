
import axios from 'axios';


const host = 'http://localhost:8080/api/v1/qna/question';

// 질문 리스트 가져오기

export const fetchQuestions = async (page: number = 1, size: number = 10) => {
    const res = await axios.get(`${host}/list`, {
        params: { page, size },
    });
    return res.data;
};

// 특정 질문 상세 조회
export const fetchQuestionById = async (qno: number) => {
    const response = await axios.get(`${host}/question/${qno}`);
    return response.data;
};

// 질문 추가
export const addQuestion = async (formData: FormData) => {
    const response = await axios.post(`${host}/question/add`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
};
