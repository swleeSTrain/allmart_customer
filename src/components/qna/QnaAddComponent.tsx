import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useCustomerCookie } from "../../hooks/useCustomerCookie";
import {addQuestion} from "../../api/qnaAPi.ts";

const QnaAddComponent: React.FC = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [tags, setTags] = useState("");
    const [files, setFiles] = useState<FileList | null>(null);

    const { getCustomerCookies } = useCustomerCookie(); // 쿠키에서 정보 가져오기
    const [customerName, setCustomerName] = useState<string | null>(null);
    const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate

    useEffect(() => {
        const cookies = getCustomerCookies(); // 쿠키에서 사용자 정보 가져옴
        if (cookies.name) {
            setCustomerName(cookies.name);
        } else {
            setCustomerName(null);
        }
    }, [getCustomerCookies]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!customerName) {
            alert("로그인이 필요합니다. 로그인 후 다시 시도해주세요.");
            return;
        }

        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);
        formData.append("tags", tags);
        formData.append("writer", customerName); // 쿠키에서 가져온 작성자 정보 추가

        if (files) {
            Array.from(files).forEach((file) => formData.append("files", file));
        }

        try {
            const response = await addQuestion(formData); // API 호출
            alert(`질문 등록 성공! ID: ${response.id}`);

            // 질문 등록 후 /qna/list로 이동
            navigate("/qna/list");
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
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="태그 (쉼표 구분)"
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
