import { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { IQuestion } from "../../types/qna";
import LoadingComponent from "../LoadingComponent";
import { fetchQuestions } from "../../api/qnaAPi.ts";
import {useCustomerCookie} from "../../hooks/useCustomerCookie.ts";
import {useCustomerStore} from "../../stores/customerStore.ts";

const initialState = {
    dtoList: [],
    pageNumList: [],
    pageRequestDTO: { page: 1, size: 10 },
    prev: false,
    next: false,
    totalCount: 0,
    prevPage: 0,
    nextPage: 0,
    totalPage: 0,
    current: 1,
};

const QnaListComponent = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const observer = useRef<IntersectionObserver | null>(null);

    const [pageResponse, setPageResponse] = useState(initialState);
    const [loading, setLoading] = useState<boolean>(false);
    const [hasMore, setHasMore] = useState<boolean>(true);

    const { martID: cookieMartID } = useCustomerCookie().getCustomerCookies();
    const martID = useCustomerStore((state) => state.martID) || cookieMartID;

    // 현재 페이지 번호를 쿼리 스트링에서 가져오기
    const page = parseInt(searchParams.get("page") || "1", 10);

    // 데이터 로드 함수
    const loadPageData = useCallback(
        async (pageToLoad: number) => {
            setLoading(true);
            try {
                const data = await fetchQuestions(pageToLoad, 10);
                setPageResponse((prevData) => ({
                    ...data,
                    dtoList:
                        pageToLoad === 1
                            ? data.dtoList
                            : [...prevData.dtoList, ...data.dtoList],
                }));
                setHasMore(data.dtoList.length === 10); // 데이터가 더 있으면 true
            } catch (error) {
                console.error("Error fetching questions:", error);
            } finally {
                setLoading(false);
            }
        },
        []
    );

    // Intersection Observer로 마지막 요소 감지
    const lastElementRef = useCallback(
        (node: HTMLElement | null) => {
            if (loading) return;
            if (observer.current) observer.current.disconnect();

            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    const nextPage = page + 1;
                    setSearchParams({ page: nextPage.toString() }); // URL 업데이트
                }
            });

            if (node) observer.current.observe(node);
        },
        [loading, hasMore, page, setSearchParams]
    );

    // 페이지 변경 시 데이터 로드
    useEffect(() => {
        loadPageData(page);
    }, [page, loadPageData]);

    // 상세 페이지 이동 함수
    const moveToDetail = (qno: number) => {
        navigate(`${martID}/qna/${qno}`);
    };

    // 질문 등록 페이지 이동 함수
    const moveToAddPage = () => {
        navigate(`${martID}/qna/add`);
    };

    // 질문 리스트 렌더링
    const questionItems = pageResponse.dtoList.map((question: IQuestion, index) => (
        <li
            key={question.qno}
            onClick={() => moveToDetail(question.qno)}
            ref={index === pageResponse.dtoList.length - 1 ? lastElementRef : null}
            className="flex flex-col border rounded-lg shadow-lg bg-white hover:shadow-xl transition-shadow duration-200 cursor-pointer"
        >
            <div className="p-4 flex-1">
                <h3 className="font-semibold text-lg text-blue-700">{question.title}</h3>
                <p className="mt-2 text-sm text-gray-600 line-clamp-3">{question.content}</p>
            </div>
            <div className="p-4 border-t text-sm text-gray-500">
                <span>작성자: {question.writer}</span>
            </div>
        </li>
    ));

    return (
        <div className="container mx-auto p-4 mt-6">
            {/* 상단 로고와 질문 등록 버튼 */}
            <header className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold text-indigo-600 cursor-pointer" onClick={() => navigate(`/${martID}`)}>
                    ALL Mart
                </h1>
                <button
                    onClick={moveToAddPage}
                    className="px-4 py-2 bg-indigo-500 text-white font-medium rounded-md shadow hover:bg-indigo-600 transition"
                >
                    질문 등록
                </button>
            </header>

            {/* 질문 리스트 */}
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {questionItems}
            </ul>
            {loading && <LoadingComponent />}
        </div>
    );
};

export default QnaListComponent;
