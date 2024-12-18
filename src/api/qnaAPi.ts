
import axios from 'axios';


const host = 'https://allmartsystem.shop/api/v1/qna/question';

// 질문 리스트 가져오기

export const fetchQuestions = async (page: number = 1, size: number = 10) => {
    const res = await axios.get(`${host}/list`, {
        params: { page, size },
    });
    return res.data;
};

// 특정 질문 상세 조회
export const fetchQuestionById = async (qno: number) => {
    const response = await axios.get(`${host}/${qno}`);
    console.log(response.data);
    return response.data;
};

// 질문 추가
export const addQuestion = async (formData: FormData) => {
    const response = await axios.post(`${host}/add`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
};

// 질문 수정
export const updateQuestion = async (qno: number, formData: FormData) => {
    const response = await axios.put(`${host}/${qno}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
};

// 질문 삭제
export const deleteQuestion = async (qno: number) => {
    const response = await axios.delete(`${host}/${qno}`);
    return response.data;
};
