import React, { useEffect, useState, useRef, useCallback } from "react";
import { IMart } from "../../types/mart";
import { getMartList } from "../../api/MartAPI";
import MartCard from "./MartCard";
import SkeletonLoader from "./SkeletonLoader";

interface MartListProps {
    location: { lat: number | null; lng: number | null };
    keyword: string | "";
    type: string | "";
}

const MartList: React.FC<MartListProps> = ({ location, keyword, type }) => {
    const [martList, setMartList] = useState<IMart[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState<number>(1);
    const [hasMore, setHasMore] = useState<boolean>(true);

    const observer = useRef<IntersectionObserver | null>(null);

    // API 호출 함수
    const fetchMarts = useCallback(
        async (pageToLoad: number) => {
            if (location.lat === null || location.lng === null) return;

            setLoading(true); // 새 요청 전 로딩 상태 설정
            try {
                const data = await getMartList(location.lat, location.lng, keyword, type); // 페이지 추가
                setMartList((prevMartList) =>
                    pageToLoad === 1 ? data : [...prevMartList, ...data]
                ); // 첫 페이지인지 확인
                setHasMore(data.length === 10); // 추가 데이터가 있는지 확인
                setError(null); // 이전 오류 상태 초기화
            } catch (error: any) {
                setError("Failed to load mart list. Please try again later.");
                console.error(error);
            } finally {
                setLoading(false); // 요청 완료 후 로딩 상태 해제
            }
        },
        [location, keyword, type]
    );

    // 무한 스크롤 감지용 Ref 콜백
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

    // 데이터 로드 트리거
    useEffect(() => {
        fetchMarts(page);
    }, [page, fetchMarts]);

    // 위치/검색 키워드가 변경되었을 때 초기화
    useEffect(() => {
        setPage(1);
        setMartList([]);
        setHasMore(true);
    }, [location, keyword, type]);

    if (error) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-lg font-semibold text-red-600">{error}</div>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4">
            <div className="space-y-4">
                {martList.map((mart, index) => (
                    <MartCard
                        key={mart.martID}
                        mart={mart}
                        refProp={index === martList.length - 1 ? lastElementRef : undefined} // 마지막 요소에 Ref 연결
                    />
                ))}
                {loading && <SkeletonLoader />}
            </div>
        </div>
    );
};

export default MartList;
