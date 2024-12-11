import { useEffect, useState, useRef, useCallback } from "react";
import { useCustomerCookie } from "../../hooks/useCustomerCookie";
import { useCustomerStore } from "../../stores/customerStore";
import { getProductList } from "../../api/ProductAPI";
import { IProduct, IPageResponse } from "../../types/product";
import LoadingComponent from "../LoadingComponent";
import { useNavigate, useSearchParams } from "react-router-dom";

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

function ProductListComponent() {
    const navigate = useNavigate();
    const [page, setPage] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);
    const [pageResponse, setPageResponse] = useState<IPageResponse>(initialState);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [searchParams] = useSearchParams();
    const categoryID = searchParams.get("categoryID");

    const observer = useRef<IntersectionObserver | null>(null);

    // Zustand와 쿠키에서 martID 가져오기
    const { martID: cookieMartID } = useCustomerCookie().getCustomerCookies();
    const martID = useCustomerStore((state) => state.martID) || cookieMartID;

    const loadPageData = useCallback(
        async (pageToLoad: number) => {
            if (!martID) return; // martID가 없으면 요청 중단
            setLoading(true);


            try {
                const data = await getProductList(pageToLoad, 10, {
                    categoryID: categoryID ? Number(categoryID) : undefined,
                    martID: Number(martID),
                });
                setPageResponse((prevData) => ({
                    ...data,
                    dtoList:
                        pageToLoad === 1
                            ? data.dtoList
                            : [...prevData.dtoList, ...data.dtoList],
                }));
                setHasMore(data.dtoList.length === 10);
            } catch (error) {
                console.error("Error loading product data:", error);
            } finally {
                setLoading(false);
            }
        },
        [categoryID, martID]
    );

    const lastElementRef = useCallback(
        (node: HTMLElement | null) => {
            if (loading) return;
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

    useEffect(() => {
        loadPageData(page);
    }, [page, loadPageData]);

    const moveToDetail = (productID: number) => {
        navigate(`/product/detail/${productID}`);
    };

    const productItems = pageResponse.dtoList.map((product: IProduct, index) => (
        <li
            key={product.productID}
            onClick={() => moveToDetail(product.productID)}
            ref={index === pageResponse.dtoList.length - 1 ? lastElementRef : null}
            className="border rounded-lg shadow-md p-2 space-y-2"
        >
            {product.thumbnailImage && (
                <img
                    src={`http://localhost:8080/uploads/${product.thumbnailImage}`}
                    alt={product.name}
                    className="w-full h-36 object-cover rounded-md"
                />
            )}
            <div className="text-center">
                <h3 className="font-semibold text-sm">{product.name}</h3>
                <p className="font-medium text-blue-600 text-sm">{product.price}원</p>
            </div>
        </li>
    ));

    return (
        <div className="container mx-auto p-4">
            <ul className="grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-4">
                {productItems}
            </ul>
            {loading && <LoadingComponent />}
        </div>
    );
}

export default ProductListComponent;
