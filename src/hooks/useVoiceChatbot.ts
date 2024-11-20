import { useState } from "react";
import {UseVoiceChatbotOptions} from "../types/chatbot.ts";

const useVoiceChatbot = ({ onTranscription, onResponse }: UseVoiceChatbotOptions) => {
    const [isRecording, setIsRecording] = useState(false);
    const [transcribedText, setTranscribedText] = useState("");
    const [responseText, setResponseText] = useState("");

    // 음성 녹음 시작
    const startRecording = () => {
        setIsRecording(true);
        console.log("Recording started...");
        // STT 로직 구현: Web Speech API 또는 외부 라이브러리 활용
    };

    // 음성 녹음 종료
    const stopRecording = () => {
        setIsRecording(false);
        console.log("Recording stopped...");
        const dummyTranscription = "This is a transcribed text"; // 예제용 텍스트
        setTranscribedText(dummyTranscription);
        if (onTranscription) onTranscription(dummyTranscription);
        processChatbotResponse(dummyTranscription); // 챗봇 API 호출
    };

    // 챗봇 응답 처리
    const processChatbotResponse = async (text: string) => {
        try {
            console.log("Sending text to chatbot:", text);
            // 실제 API 호출 구현
            const chatbotResponse = `Response to: "${text}"`; // 예제 응답
            setResponseText(chatbotResponse);
            if (onResponse) onResponse(chatbotResponse);
            playTTS(chatbotResponse); // 응답을 음성으로 변환
        } catch (error) {
            console.error("Error processing chatbot response:", error);
        }
    };

    // TTS: Text-to-Speech 로직
    const playTTS = (text: string) => {
        const utterance = new SpeechSynthesisUtterance(text);
        speechSynthesis.speak(utterance);
        console.log("Playing TTS:", text);
    };

    return {
        isRecording,
        transcribedText,
        responseText,
        startRecording,
        stopRecording,
    };
}

export default useVoiceChatbot;
