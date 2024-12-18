import { useEffect, useState, useRef, useCallback } from "react";
import { ICategory, IPageResponse } from "../types/category"; // ICategory와 IPageResponse 임포트
import { getCategoryList } from "../api/CategoryAPI";
import LoadingComponent from "./LoadingComponent"; // 로딩 컴포넌트
import { useNavigate } from "react-router-dom";
import {
    FaDog,
    FaHammer,
    FaUtensils,
    FaBroom,
    FaSpa,
    FaAppleAlt,
    FaCandyCane,
    FaPepperHot,
    FaSeedling,
    FaCoffee,
    FaFish,
    FaDrumstickBite,
    FaCarrot,
    FaWineBottle,
    FaCheese,
    FaLeaf,
    FaBreadSlice, FaShoppingBag,
} from "react-icons/fa";

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

    // 아이콘 매핑
    const getCategoryIcon = (categoryName: string) => {
        if (categoryName.includes("반려동물")) return <FaDog className="text-4xl text-yellow-500" />;
        if (categoryName.includes("생활잡화") || categoryName.includes("공구")) return <FaHammer className="text-4xl text-gray-500" />;
        if (categoryName.includes("주방용품")) return <FaUtensils className="text-4xl text-orange-500" />;
        if (categoryName.includes("청소") || categoryName.includes("생활용품")) return <FaBroom className="text-4xl text-blue-500" />;
        if (categoryName.includes("헤어") || categoryName.includes("바디") || categoryName.includes("뷰티")) return <FaSpa className="text-4xl text-pink-500" />;
        if (categoryName.includes("건강식품")) return <FaAppleAlt className="text-4xl text-green-500" />;
        if (categoryName.includes("과자") || categoryName.includes("간식")) return <FaCandyCane className="text-4xl text-red-500" />;
        if (categoryName.includes("양념") || categoryName.includes("오일")) return <FaPepperHot className="text-4xl text-yellow-500" />;
        if (categoryName.includes("면류") || categoryName.includes("통조림")) return <FaSeedling className="text-4xl text-teal-500" />;
        if (categoryName.includes("커피") || categoryName.includes("원두") || categoryName.includes("차")) return <FaCoffee className="text-4xl text-brown-500" />;
        if (categoryName.includes("생수") || categoryName.includes("음료") || categoryName.includes("주류")) return <FaWineBottle className="text-4xl text-blue-500" />;
        if (categoryName.includes("김치") || categoryName.includes("반찬") || categoryName.includes("델리")) return <FaBreadSlice className="text-4xl text-red-500" />;
        if (categoryName.includes("우유") || categoryName.includes("유제품")) return <FaCheese className="text-4xl text-yellow-500" />;
        if (categoryName.includes("수산물") || categoryName.includes("건해산")) return <FaFish className="text-4xl text-blue-500" />;
        if (categoryName.includes("정육") || categoryName.includes("계란류")) return <FaDrumstickBite className="text-4xl text-red-500" />;
        if (categoryName.includes("쌀") || categoryName.includes("잡곡") || categoryName.includes("견과")) return <FaLeaf className="text-4xl text-green-500" />;
        if (categoryName.includes("채소")) return <FaCarrot className="text-4xl text-green-500" />;
        if (categoryName.includes("과일")) return <FaAppleAlt className="text-4xl text-red-500" />;

        return <FaShoppingBag className="text-4xl text-gray-400" />; // 기본 아이콘
    };

    const categoryItems = pageResponse.dtoList.map((category: ICategory, index) => {

        return (
            <li
                key={category.categoryID}
                ref={index === pageResponse.dtoList.length - 1 ? lastElementRef : null}
                onClick={() => handleCategoryClick(category.categoryID)}
                className="flex flex-col items-center justify-center w-full h-40 p-4 border rounded-lg shadow-md bg-gradient-to-b from-white to-gray-50 hover:from-gray-100 hover:to-white transition-all duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
            >
                {getCategoryIcon(category.name)}
                <h3 className="mt-2 font-semibold text-lg text-gray-800 text-center break-keep whitespace-normal leading-tight">
                    {category.name}
                </h3>
            </li>
        );
    });

    return (
        <div className="container mx-auto p-4">
            <ul className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4">{categoryItems}</ul>
            {loading && <LoadingComponent />}
        </div>
    );
}

export default CategoryListComponent;
