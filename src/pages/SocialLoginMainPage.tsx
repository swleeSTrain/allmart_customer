import { useEffect, useState } from "react";
import { IMartMap } from "../types/mart";
import { getMarts, getMapScriptUrl } from "../api/KakaoMapAPI";
import MartList from "../components/mart/MartList.tsx";
import {useSearchParams} from "react-router-dom";

interface Location {
    lat: number | null;
    lng: number | null;
}

function KakaoMap() {
    const [location, setLocation] = useState<Location>({ lat: null, lng: null });
    const [error, setError] = useState<string | null>(null);
    const [scriptUrl, setScriptUrl] = useState<string | null>(null);
    const [marts, setMarts] = useState<IMartMap[]>([]);
    const [searchParams, setSearchParams] = useSearchParams();

    const keyword = searchParams.get("keyword") || "";
    const type = searchParams.get("type") || "";

    useEffect(() => {
        // 위치 정보 가져오기
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                ({ coords: { latitude: lat, longitude: lng } }) => {
                    setLocation({ lat, lng }); // 위치 정보를 설정
                },
                (error) => {
                    setError(error.message);
                }
            );
        } else {
            setError("Geolocation is not supported by your browser.");
        }
    }, []);

    // 위치 정보가 로드된 이후에만 지도 스크립트 가져오기
    useEffect(() => {
        if (location.lat !== null && location.lng !== null) {
            const fetchMapScriptUrl = async () => {
                try {
                    if (!scriptUrl) {
                        const response = await getMapScriptUrl();
                        const queryString = response.split("?")[1];
                        const urlParams = new URLSearchParams(queryString);
                        const encodedAppKey = urlParams.get("appkey");

                        if (encodedAppKey) {
                            const decodedAppKey = atob(encodedAppKey);
                            const decodedUrl = response.replace(encodedAppKey, decodedAppKey);
                            setScriptUrl(decodedUrl);
                        } else {
                            setScriptUrl(response);
                        }
                    }
                } catch (error) {
                    setError("Failed to load Kakao map script URL.");
                    console.log(error);
                }
            };
            fetchMapScriptUrl();
        }
    }, [location]);

    useEffect(() => {

        console.log("========================");
        console.log(location.lat);
        console.log("========================");
        console.log(location.lng);

        if (location.lat !== null && location.lng !== null) {
            const fetchMartData = async () => {
                try {
                    // null 일수도 있으니
                    const response = await getMarts(location.lat!, location.lng!);
                    setMarts(response);
                } catch (error) {
                    setError("Failed to fetch mart information.");

                    console.log(error);
                }
            };
            fetchMartData();
        }
    }, [location]);

    // 스크립트 로드 후 지도 초기화
    useEffect(() => {
        if (scriptUrl && location.lat !== null && location.lng !== null) {
            const script = document.createElement("script");
            script.src = scriptUrl;
            script.async = true;
            document.head.appendChild(script);

            script.onload = () => {
                const kakao = (window as any).kakao;
                kakao.maps.load(() => {
                    const container = document.getElementById("map");
                    const options = {
                        center: new kakao.maps.LatLng(location.lat, location.lng),
                        level: 6,
                    };

                    const map = new kakao.maps.Map(container, options);

                    // 사용자 위치 마커
                    if (location.lat && location.lng) {
                        const markerPosition = new kakao.maps.LatLng(location.lat, location.lng);
                        const marker = new kakao.maps.Marker({
                            position: markerPosition,
                        });
                        marker.setMap(map);
                    }

                    // 마트 마커 표시
                    marts.forEach((mart) => {
                        const martPosition = new kakao.maps.LatLng(mart.lat, mart.lng);

                        const markerImage = new kakao.maps.MarkerImage(
                            "/logo/mart.png",
                            new kakao.maps.Size(32, 32)
                        );

                        const marker = new kakao.maps.Marker({
                            position: martPosition,
                            image: markerImage,
                            map: map,
                        });

                        kakao.maps.event.addListener(marker, "click", () => {
                            console.log(`Mart ID: ${mart.martID}`);
                            setSearchParams({ keyword: mart.martID.toString(), type: "martID" });
                        });
                    });
                });
            };
        }
    }, [scriptUrl, location, marts]);

    return (
        <div className="flex flex-col items-center mt-10">
            {error ? (
                <p className="text-red-500">{error}</p>
            ) : location.lat !== null && location.lng !== null ? (
                <div className="relative w-full max-w-2xl">
                    {/* 카카오 맵 */}
                    <div id="map" className="w-full h-80 border border-gray-300 shadow-md rounded-lg"></div>

                    {/* 초기화 버튼 */}
                    <button
                        className="absolute top-0 right-0 z-10 bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
                        onClick={() => setSearchParams({})} // 초기화 시 쿼리스트링 제거
                    >
                        초기화
                    </button>
                </div>

            ) : (
                <p className="text-gray-500">Loading location...</p>
            )}
            <MartList location={location} keyword={keyword} type={type}/>
        </div>
    );
}

export default KakaoMap;
