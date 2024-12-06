import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useCustomerStore } from "../../stores/customerStore";
import {fetchQuestionById, updateQuestion} from "../../api/qnaAPi.ts";

const QnaEditComponent: React.FC = () => {
    const { qno } = useParams<{ qno: string }>();
    const navigate = useNavigate();
    const customerName = useCustomerStore((state) => state.name); // 작성자 이름 가져오기

    const [formData, setFormData] = useState({
        title: "",
        content: "",
        tags: "",
    });
    const [existingFiles, setExistingFiles] = useState<string[]>([]);
    const [newFiles, setNewFiles] = useState<FileList | null>(null);

    useEffect(() => {
        if (qno) {
            fetchQuestionById(Number(qno)).then((data) => {
                setFormData({
                    title: data.title,
                    content: data.content,
                    tags: data.tags.join(", "),
                });
                setExistingFiles(data.attachFiles || []);
            });
        }
    }, [qno]);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setNewFiles(e.target.files);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!qno) return;

        const formDataToSend = new FormData();
        formDataToSend.append("title", formData.title);
        formDataToSend.append("content", formData.content);
        formDataToSend.append("writer", customerName || ""); // 작성자 추가
        formData.tags.split(",").forEach((tag) => formDataToSend.append("tags", tag.trim()));

        // 기존 파일 추가
        existingFiles.forEach((fileName) => formDataToSend.append("existingFileNames", fileName));

        // 새 파일 추가
        if (newFiles) {
            Array.from(newFiles).forEach((file) => formDataToSend.append("files", file));
        }

        try {
            await updateQuestion(Number(qno), formDataToSend);
            alert("질문 수정 성공!");
            navigate(`/qna/${qno}`);
        } catch (error) {
            console.error("질문 수정 실패:", error);
            alert("질문 수정 실패!");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-6 bg-white shadow rounded">
            <h1 className="text-xl font-bold mb-4">질문 수정</h1>
            <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="제목"
                required
                className="w-full p-2 border rounded mb-4"
            />
            <textarea
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                placeholder="내용"
                rows={5}
                required
                className="w-full p-2 border rounded mb-4"
            />
            <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleInputChange}
                placeholder="태그 (쉼표 구분)"
                className="w-full p-2 border rounded mb-4"
            />
            <input
                type="file"
                multiple
                onChange={handleFileChange}
                className="w-full mb-4"
            />
            <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            >
                질문 수정
            </button>
        </form>
    );
};

export default QnaEditComponent;
