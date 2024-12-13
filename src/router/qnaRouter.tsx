import { lazy, Suspense } from "react";
import LoadingPage from "../pages/LoadingPage";

// 로딩 페이지
const Loading = <LoadingPage></LoadingPage>;

// Lazy-loaded QnA 페이지 컴포넌트
const QnaIndexPage = lazy(() => import("../pages/qna/QnaIndexPage.tsx"));
const QnaListPage = lazy(() => import("../pages/qna/QnaListPage.tsx"));
const QnaDetailPage = lazy(() => import("../pages/qna/QnaDetailPage.tsx"));
const QnaAddPage = lazy(() => import("../pages/qna/QnaAddPage.tsx"));
const QnaEditPage = lazy(() => import("../pages/qna/QnaEditPage.tsx"));

// QnA 라우터 설정
const qnaRouter = {
    path: "qna",
    element: <Suspense fallback={Loading}><QnaIndexPage /></Suspense>,
    children: [
        {
            path: "list",
            element: <Suspense fallback={Loading}><QnaListPage /></Suspense>,
        },
        {
            path: ":qno",
            element: <Suspense fallback={Loading}><QnaDetailPage /></Suspense>,
        },

        {
            path: "add",
            element: <Suspense fallback={Loading}><QnaAddPage /></Suspense>,
        },
        {
            path: "edit/:qno", // 수정된 부분: QnA 수정 경로 추가
            element: <Suspense fallback={Loading}><QnaEditPage /></Suspense>,
        },
    ],
};

export default qnaRouter;
