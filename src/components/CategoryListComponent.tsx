import { useEffect, useState, useRef, useCallback } from "react";
import { ICategory, IPageResponse } from "../types/category"; // ICategory와 IPageResponse 임포트
import { getCategoryList } from "../api/CategoryAPI";
import LoadingComponent from "./LoadingComponent"; // 로딩 컴포넌트
import { useNavigate } from "react-router-dom";

const initialState: IPageResponse = {
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

function CategoryListComponent() {
    const [pageResponse, setPageResponse] = useState<IPageResponse>(initialState);
    const [loading, setLoading] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    const [hasMore, setHasMore] = useState<boolean>(true); // 데이터가 더 있는지 여부
    const observer = useRef<IntersectionObserver | null>(null);
    const navigate = useNavigate();

    const handleCategoryClick = (categoryID: number) => {
        navigate(`/product/list?categoryID=${categoryID}`);
    };

    const lastElementRef = useCallback(
        (node: HTMLElement | null) => {
            if (loading || !hasMore) return;
            if (observer.current) observer.current.disconnect();

            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    setPage((prevPage) => prevPage + 1);
                }
            });

            if (node) observer.current.observe(node);
        },
        [loading, hasMore]
    );

    const loadPageData = useCallback(async (pageToLoad: number) => {
        setLoading(true);
        try {
            const data = await getCategoryList(pageToLoad, 10); // API 호출
            setPageResponse((prevResponse) => ({
                ...data,
                dtoList: pageToLoad === 1 ? data.dtoList : [...prevResponse.dtoList, ...data.dtoList],
            }));

            // 다음 데이터가 있는지 여부를 확인
            setHasMore(data.dtoList.length === 10);
        } catch (error) {
            console.error("Error loading category data:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadPageData(page);
    }, [page, loadPageData]);

    const categoryItems = pageResponse.dtoList.map((category: ICategory, index) => (
        <li
            key={category.categoryID}
            ref={index === pageResponse.dtoList.length - 1 ? lastElementRef : null}
            onClick={() => handleCategoryClick(category.categoryID)}
            className="p-6 border rounded-lg mb-4 shadow-md bg-white min-h-[200px] w-full flex items-center justify-center cursor-pointer"
        >
            <h3 className="font-semibold text-3xl text-center">{category.name}</h3>
        </li>
    ));

    return (
        <div className="container mx-auto p-6">
            <ul className="grid grid-cols-2 gap-6">{categoryItems}</ul>
            {loading && <LoadingComponent />}
        </div>
    );
}

export default CategoryListComponent;
