import { useEffect, useState } from "react";
import { IMartMap } from "../types/mart";
import { getMarts, getMapScriptUrl } from "../api/KakaoMapAPI";
import MartList from "../components/mart/MartList.tsx";



interface Location {
    lat: number | null;
    lng: number | null;
}

function KakaoMap() {
    const [location, setLocation] = useState<Location>({ lat: null, lng: null });
    const [error, setError] = useState<string | null>(null);
    const [scriptUrl, setScriptUrl] = useState<string | null>(null);
    const [marts, setMarts] = useState<IMartMap[]>([]);

    useEffect(() => {
        // 현재 위치 가져오기
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                ({ coords: { latitude: lat, longitude: lng } }) => {
                    setLocation({ lat, lng });
                },
                (error) => {
                    setError(error.message);
                }
            );
        } else {
            setError("Geolocation is not supported by your browser.");
        }
    }, []);

    useEffect(() => {
        // 카카오 지도 스크립트 URL 가져오기
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
    }, [scriptUrl]);

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

    useEffect(() => {
        if (scriptUrl) {
            const script = document.createElement("script");
            script.src = scriptUrl;
            script.async = true;
            document.head.appendChild(script);

            script.onload = () => {
                const kakao = (window as any).kakao;
                kakao.maps.load(() => {
                    const container = document.getElementById("map");
                    const options = {
                        center: new kakao.maps.LatLng(location.lat || 37.5665, location.lng || 126.978),
                        level: 6,
                    };

                    const map = new kakao.maps.Map(container, options);

                    if (location.lat && location.lng) {
                        const markerPosition = new kakao.maps.LatLng(location.lat, location.lng);
                        const marker = new kakao.maps.Marker({
                            position: markerPosition,
                        });
                        marker.setMap(map);
                    }

                    marts.forEach((mart) => {
                        const martPosition = new kakao.maps.LatLng(mart.lat, mart.lng);

                        const customOverlay = new kakao.maps.CustomOverlay({
                            position: martPosition,
                            content: `<div style="
                                width: 20px; 
                                height: 20px; 
                                background-color: yellow; 
                                border-radius: 50%; 
                                border: 2px solid #FFD700;">
                            </div>`,
                            yAnchor: 0.5,
                            xAnchor: 0.5,
                        });

                        customOverlay.setMap(map);
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
                <div className="w-full max-w-2xl">
                    <div id="map" className="w-full h-96 border border-gray-300 shadow-md rounded-lg"></div>
                </div>
            ) : (
                <p className="text-gray-500">Loading location...</p>
            )}
            <MartList />
        </div>
    );
}

export default KakaoMap;
