import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { fetchAnswersByQno } from "../../api/answerAPI";
import { IQuestion, IAnswer } from "../../types/qna";
import { deleteQuestion, fetchQuestionById } from "../../api/qnaAPi.ts";

const QnaDetailComponent = () => {
    const { qno } = useParams<{ qno: string }>();
    const [question, setQuestion] = useState<IQuestion | null>(null);
    const [answers, setAnswers] = useState<IAnswer[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    // 서버에서 제공되는 이미지 기본 경로
    const BASE_IMAGE_URL = "http://localhost:8080/uploads";

    useEffect(() => {
        if (qno) {
            setLoading(true);
            setError(null);

            Promise.all([
                fetchQuestionById(Number(qno)), // 질문 데이터 가져오기
                fetchAnswersByQno(Number(qno)), // 답변 데이터 가져오기
            ])
                .then(([questionData, answerData]) => {
                    console.log("질문 데이터:", questionData); // 디버깅
                    setQuestion(questionData);
                    setAnswers(answerData); // 답변 상태 설정
                })
                .catch((err) => {
                    console.error("Error fetching data:", err);
                    setError("데이터를 불러오는 중 오류가 발생했습니다.");
                })
                .finally(() => setLoading(false));
        }
    }, [qno]);

    const handleDelete = async () => {
        if (window.confirm("정말로 이 질문을 삭제하시겠습니까?")) {
            try {
                await deleteQuestion(Number(qno));
                alert("질문이 삭제되었습니다.");
                navigate("/qna/list");
            } catch (err) {
                console.error("Error deleting question:", err);
                alert("질문 삭제 중 오류가 발생했습니다.");
            }
        }
    };

    const handleEdit = () => {
        navigate(`/qna/edit/${qno}`); // 수정 페이지로 이동
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-gray-500 text-lg">Loading...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-red-500 text-lg">{error}</p>
            </div>
        );
    }

    if (!question) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-red-500 text-lg">해당 질문을 찾을 수 없습니다.</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4">
            <div className="bg-white shadow-lg rounded-lg p-4">
                <h1 className="text-2xl font-bold text-blue-700 mb-4">{question.title || "제목 없음"}</h1>
                <p className="text-gray-700 mb-6">{question.content || "내용 없음"}</p>
                <div className="text-sm text-gray-500 mb-6">
                    <p>
                        작성자: <span className="font-medium text-gray-800">{question.writer || "익명"}</span>
                    </p>
                </div>

                {/* 첨부 파일 섹션 */}
                {question.attachFiles && question.attachFiles.length > 0 && (
                    <div className="mt-6">
                        <h2 className="text-lg font-semibold text-gray-800 mb-2">첨부 파일</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {question.attachFiles.map((file: string, index: number) => (
                                <div key={index} className="border rounded-lg overflow-hidden">
                                    <img
                                        src={`${BASE_IMAGE_URL}/${file}`}
                                        alt={`첨부 파일 ${index + 1}`}
                                        className="w-full h-auto object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* 답변 섹션 */}
                <div className="mt-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">답변</h2>
                    {answers.length > 0 ? (
                        <ul className="space-y-4">
                            {answers.map((answer) => (
                                <li
                                    key={answer.ano}
                                    className="border rounded-md bg-gray-50 p-4"
                                >
                                    <p className="text-gray-700">{answer.content}</p>
                                    <p className="text-sm text-gray-500 mt-2">
                                        작성자: {answer.writer} |{" "}
                                        {new Date(answer.createdDate).toLocaleString()}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500">아직 답변이 없습니다.</p>
                    )}
                </div>

                {/* 버튼 섹션 */}
                <div className="flex flex-col space-y-4 mt-6">
                    <button
                        onClick={handleEdit}
                        className="w-full px-4 py-2 bg-gray-800 text-white font-medium rounded-md hover:bg-gray-700"
                    >
                        ✏️ 수정
                    </button>
                    <button
                        onClick={handleDelete}
                        className="w-full px-4 py-2 bg-gray-900 text-white font-medium rounded-md hover:bg-gray-700"
                    >
                        🗑️ 삭제
                    </button>
                </div>
            </div>
        </div>
    );
};

export default QnaDetailComponent;
