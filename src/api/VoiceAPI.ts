import axios from "axios";

// const host = 'https://ded0-39-114-123-123.ngrok-free.app/api/v1/voice';
const host = 'http://localhost:8081/api/v1/voice';

// STT
export const convertSTT = async (voiceFile) => {
    const formData = new FormData();
    formData.append("voiceFile", voiceFile);

    console.log("============= Voice STT =====================");
    try {

        const res = await axios.post(`${host}/stt`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        return res.data;
    } catch (error) {
        console.error('음성 변환 중 오류 발생:', error);
        if (error.response) {
            console.error('응답 에러 상태 코드:', error.response.status);
            console.error('응답 에러 데이터:', error.response.data);
        } else if (error.request) {
            console.error('서버로부터 응답이 없습니다:', error.request);
        } else {
            console.error('요청 설정 중 오류:', error.message);
        }
        throw error;
    }
};

// TTS
export const convertTTS = async (text: string) => {

    try {
        const res = await axios.post(`${host}/tts`, { text }, {
            responseType: 'arraybuffer', // 서버에서 byte[] 응답을 받을 때 arraybuffer 사용
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // 서버에서 받은 byte[] 데이터를 Blob으로 변환
        const audioBlob = new Blob([res.data], { type: 'audio/wav' });
        return audioBlob;
    } catch (error) {
        console.error('음성 합성 중 오류 발생:', error);
        if (error.response) {
            console.error('응답 에러 상태 코드:', error.response.status);
            console.error('응답 에러 데이터:', error.response.data);
        }
        throw error;
    }
};