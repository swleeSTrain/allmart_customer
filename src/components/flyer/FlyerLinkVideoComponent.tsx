import React from "react";
import { useNavigate } from "react-router-dom";
import useMediaStore from "../../stores/useMediaStore";

const DetailPage = () => {
    const navigate = useNavigate();
    const selectedMedia = useMediaStore((state) => state.selectedMedia);


    console.log("selectedMedia = " , selectedMedia);

    if (!selectedMedia) {
        // 선택된 미디어가 없으면 홈으로 이동
        navigate("/");
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold mb-4">{selectedMedia.title}</h1>

            {/* 이미지 표시 */}
            <img
                src={selectedMedia.imageUrl}
                alt={selectedMedia.title}
                className="rounded-lg shadow-lg max-w-full mb-4"
            />

            {/* 유튜브 영상 표시 */}
            <div className="relative w-full max-w-2xl h-0" style={{ paddingBottom: "56.25%" }}>
                <iframe
                    src={selectedMedia.youtubeUrl}
                    title={`YouTube Video for ${selectedMedia.title}`}
                    frameBorder="0"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                    className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
                ></iframe>
            </div>

            <button
                onClick={() => navigate("/")}
                className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
            >
                홈으로 돌아가기
            </button>
        </div>
    );
};

export default DetailPage;
