import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import LoadingComponent from "../LoadingComponent";
import { IQuestion } from "../../types/qna";
import {fetchQuestions} from "../../api/qnaAPi.ts";


const QnaListComponent = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [questions, setQuestions] = useState<IQuestion[]>([]);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);

    const [searchParams, setSearchParams] = useSearchParams();

    // 데이터 로드 함수
    const loadQuestions = async (page: number) => {
        setLoading(true);
        try {
            const data = await fetchQuestions(page, 10); // 한 페이지에 10개씩 로드
            setQuestions(data.dtoList);
            setTotalPages(data.totalPages);
            setCurrentPage(data.number + 1); // 0-based index를 1-based로 변환
        } catch (error) {
            console.error("Error fetching questions:", error);
        } finally {
            setLoading(false);
        }
    };

    // URL 파라미터에 따라 데이터 로드
    useEffect(() => {
        const page = Number(searchParams.get("page")) || 1;
        loadQuestions(page);
    }, [searchParams]);

    // 페이지 변경
    const changePage = (page: number) => {
        setSearchParams({ page: String(page) });
    };

    // 페이징 버튼 렌더링
    const renderPagination = () => (
        <div className="mt-6 flex justify-center space-x-2">
            <button
                onClick={() => changePage(currentPage - 1)}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300"
                disabled={currentPage === 1}
            >
                ◀
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                    key={page}
                    onClick={() => changePage(page)}
                    className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-semibold ${
                        currentPage === page
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                    }`}
                >
                    {page}
                </button>
            ))}
            <button
                onClick={() => changePage(currentPage + 1)}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300"
                disabled={currentPage === totalPages}
            >
                ▶
            </button>
        </div>
    );

    // 질문 리스트 렌더링
    const renderQuestions = () => (
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {questions.map((question) => (
                <li
                    key={question.qno}
                    className="flex flex-col border rounded-lg shadow-lg bg-white hover:shadow-xl transition-shadow duration-200"
                >
                    <div className="p-4 flex-1">
                        <h3 className="font-semibold text-lg text-blue-700">{question.title}</h3>
                        <p className="mt-2 text-sm text-gray-600 line-clamp-3">{question.content}</p>
                    </div>
                    <div className="p-4 border-t text-sm text-gray-500">
                        <span>작성자: {question.writer}</span>
                    </div>
                </li>
            ))}
        </ul>
    );

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-lg font-semibold mb-4">QnA 리스트</h1>

            {loading ? (
                <LoadingComponent />
            ) : (
                <>
                    {/* 질문 리스트 */}
                    {renderQuestions()}

                    {/* 페이징 버튼 */}
                    {renderPagination()}
                </>
            )}
        </div>
    );
};

export default QnaListComponent;
