import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { addQuestion } from "../../api/qnaAPi";
import { useCustomerStore } from "../../stores/customerStore.ts";

const QnaAddComponent: React.FC = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [files, setFiles] = useState<FileList | null>(null);

    // Zustand 상태 가져오기
    const customerID = useCustomerStore((state) => state.customerID);
    const martID = useCustomerStore((state) => state.martID);
    const name = useCustomerStore((state) => state.name);
    const setCustomerInfo = useCustomerStore((state) => state.setCustomerInfo);

    const navigate = useNavigate();

    // 새로고침 시 상태 복구 (쿠키 기반)
    useEffect(() => {
        if (!customerID || !martID) {
            const cookies = document.cookie.split("; ").reduce((acc, cookie) => {
                const [key, value] = cookie.split("=");
                acc[key] = decodeURIComponent(value);
                return acc;
            }, {} as Record<string, string>);

            if (cookies.customerID && cookies.martID && cookies.name) {
                setCustomerInfo(
                    cookies.name,
                    parseInt(cookies.customerID, 10),
                    parseInt(cookies.martID, 10)
                );
                console.log("쿠키에서 상태 복구 완료", {
                    name: cookies.name,
                    customerID: cookies.customerID,
                    martID: cookies.martID,
                });
            }
        }
    }, [name, customerID, martID, setCustomerInfo]);

    useEffect(() => {
        console.log("zustand 상태 확인", { name, martID });
    }, [name, martID]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!name || !martID) {
            alert("로그인이 필요합니다. 로그인 후 다시 시도해주세요.");
            return;
        }

        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);
        formData.append("writer", name);
        formData.append("martID", martID.toString());


        if (files) {
            Array.from(files).forEach((file) => formData.append("files", file));
        }

        try {
            const response = await addQuestion(formData);
            console.log("API 응답:", response);

            // 응답이 단순 값인지 확인
            if (typeof response === "number") {
                alert(`질문 등록 성공! ID: ${response}`);
                navigate("/qna/list");
            } else if (response.id) {
                alert(`질문 등록 성공! ID: ${response.id}`);
                navigate("/qna/list");
            } else {
                alert("질문 등록 성공했지만 ID를 받지 못했습니다.");
            }
        } catch (error) {
            console.error("질문 등록 실패:", error);
            alert("질문 등록 실패!");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white shadow rounded">
            <h2 className="text-xl font-bold mb-4">질문 등록</h2>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="제목"
                required
                className="w-full p-2 border rounded mb-4"
            />
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="내용"
                rows={5}
                required
                className="w-full p-2 border rounded mb-4"
            />
            <input
                type="file"
                multiple
                onChange={(e) => setFiles(e.target.files)}
                className="w-full mb-4"
            />
            <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            >
                질문 등록
            </button>
        </form>
    );
};

export default QnaAddComponent;
