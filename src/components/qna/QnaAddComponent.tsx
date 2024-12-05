import  { useState } from "react";
import {addQuestion} from "../../api/qnaAPi.ts";


const QnaAddComponent = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [tags, setTags] = useState("");
    const [files, setFiles] = useState<FileList | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);
        formData.append("tags", tags);

        if (files) {
            Array.from(files).forEach((file) => formData.append("files", file));
        }

        try {
            const response = await addQuestion(formData);
            alert(`질문 등록 성공! ID: ${response}`);
        } catch (error) {
            console.error(error);
            alert("질문 등록 실패!");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>제목:</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
            <label>내용:</label>
            <textarea value={content} onChange={(e) => setContent(e.target.value)} required />
            <label>태그 (쉼표 구분):</label>
            <input type="text" value={tags} onChange={(e) => setTags(e.target.value)} />
            <label>첨부파일:</label>
            <input type="file" multiple onChange={(e) => setFiles(e.target.files)} />
            <button type="submit">질문 등록</button>
        </form>
    );
};

export default QnaAddComponent;
