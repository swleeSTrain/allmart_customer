import React, { useState, useRef, useEffect } from "react";
import { convertSTT, convertTTS } from "../../api/VoiceAPI"; // 적절한 경로 수정
import { sendChatbotRequest } from "../../api/ChatbotAPI";

type ErrorState = string | null;

const OrderVoiceButton: React.FC = () => {
    const [isRecording, setIsRecording] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<ErrorState>(null);
    const [isOverlayVisible, setIsOverlayVisible] = useState<boolean>(false);
    const [chatMessages, setChatMessages] = useState<{ sender: string; text: string }[]>([]);

    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);
    const chatContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [chatMessages]);

    const handleClick = async () => {
        setError(null);

        try {
            if (!isRecording) {
                setIsRecording(true);
                setIsOverlayVisible(true);
                audioChunksRef.current = [];

                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                const mediaRecorder = new MediaRecorder(stream);
                mediaRecorder.ondataavailable = (event) => {
                    if (event.data.size > 0) {
                        audioChunksRef.current.push(event.data);
                    }
                };

                mediaRecorder.onstop = async () => {
                    setIsLoading(true);
                    const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
                    const audioFile = new File([audioBlob], "recording.webm", { type: "audio/webm" });

                    try {
                        const transcription = await convertSTT(audioFile);
                        setChatMessages((prev) => [...prev, { sender: "사용자", text: transcription }]);

                        const chatbotResponse = await sendChatbotRequest(transcription);
                        setChatMessages((prev) => [...prev, { sender: "챗봇", text: chatbotResponse }]);

                        const ttsBlob = await convertTTS(chatbotResponse);
                        const ttsUrl = URL.createObjectURL(ttsBlob);

                        const audio = new Audio(ttsUrl);
                        await audio.play();
                        audio.onended = () => URL.revokeObjectURL(ttsUrl);
                    } catch (err) {
                        setError("음성 주문 처리 중 문제가 발생했습니다. 다시 시도해 주세요.");
                        console.error(err);
                    } finally {
                        setIsLoading(false);
                    }
                };

                mediaRecorder.start();
                mediaRecorderRef.current = mediaRecorder;
            } else {
                setIsRecording(false);
                mediaRecorderRef.current?.stop();
            }
        } catch (err) {
            setError("녹음 시작 중 문제가 발생했습니다.");
            console.error(err);
            console.error(error);
        }
    };

    return (
        <div className="relative flex flex-col items-center">
            <button
                onClick={handleClick}
                className={`relative flex flex-col items-center justify-center w-28 h-28 rounded-full shadow-lg transform -translate-y-10 focus:outline-none transition-all duration-200 ${
                    isRecording
                        ? "bg-red-500 hover:bg-red-600"
                        : "bg-blue-500 hover:bg-blue-600"
                } ${isLoading ? "opacity-70 cursor-wait" : ""}`}
                aria-label={isRecording ? "주문 종료" : "음성 주문"}
                disabled={isLoading}
            >
                <div className="flex flex-col items-center justify-center h-full w-full">
                    {isLoading ? (
                        <svg
                            className="animate-spin w-12 h-12 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            ></circle>
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                            ></path>
                        </svg>
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-12 h-12"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z"
                            />
                        </svg>
                    )}
                    <span className="text-lg mt-1">
                        {isRecording ? "주문 종료" : "음성 주문"}
                    </span>
                </div>
            </button>

            {/* 오버레이 */}
            {isOverlayVisible && (
                <div className="fixed inset-x-0 top-[8rem] h-3/5 bg-[#FFF7E1] z-50 flex flex-col border-4 border-[#8B4513] rounded-lg shadow-lg overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-12 bg-[#8B4513] rounded-t-lg flex items-center justify-between px-4 z-10">
                        <h2 className="font-pixel text-3xl text-[#FFD700]">채팅 창</h2>
                        <button
                            onClick={() => setIsOverlayVisible(false)}
                            className="font-pixel text-3xl text-[#FFD700] hover:text-[#FFA500] transition-colors duration-200"
                        >
                            X
                        </button>
                    </div>
                    <div ref={chatContainerRef} className="mt-12 p-4 overflow-y-auto h-full">
                        {chatMessages.map((msg, index) => (
                            <div
                                key={index}
                                className={`mb-4 p-3 rounded-lg shadow-md max-w-sm ${
                                    msg.sender === "사용자"
                                        ? "ml-auto bg-[#FFD700] text-[#4B0082]"
                                        : "mr-auto bg-[#98FB98] text-[#006400]"
                                } border-2 border-[#8B4513]`}
                            >
                                <strong className="font-pixel text-2xl">{msg.sender}</strong>
                                <p className="font-pixel text-2xl mt-1">{msg.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {error && (
                <div className="mt-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
                    {error}
                </div>
            )}
        </div>
    );
};

export default OrderVoiceButton;
