import React from 'react';
import YouTube from 'react-youtube';

// VideoPlayer 컴포넌트
const VideoPlayer: React.FC<{ videoId: string }> = ({ videoId }) => {
    const opts = {
        playerVars: {
            autoplay: 1,        // 자동 재생
            modestbranding: 1,  // 간소화된 UI
            controls: 1,        // 컨트롤 표시
        },
    };

    const handleVideoPlay = () => {
        console.log('Video is playing!');
    };

    const handleVideoPause = () => {
        console.log('Video is paused!');
    };

    return (
        <div className="relative w-full max-w-[420px] mx-auto overflow-hidden rounded-xl shadow-lg">
            <div className="relative h-0 pb-[170%]"> {/* 좌우 공백 줄이기 위해 9:16보다 약간 높게 설정 */}
                <YouTube
                    videoId={videoId} // 유튜브 영상 ID 전달
                    opts={opts}       // 옵션 전달
                    onPlay={handleVideoPlay}   // 재생 이벤트 핸들링
                    onPause={handleVideoPause} // 일시 정지 이벤트 핸들링
                    className="absolute inset-0 w-full h-full object-cover" // CSS 적용
                    iframeClassName="absolute inset-0 w-full h-full object-cover" // iframe 스타일
                />
            </div>
        </div>
    );
};

// FlyerReadComponent 컴포넌트
function FlyerReadComponent() {
    const sampleVideoId = "QZlDY2nz25g"; // 쇼츠 영상 ID
    const videoUrl = `https://www.youtube.com/shorts/${sampleVideoId}`; // 유튜브 쇼츠 URL

    return (
        <div className="flex flex-col items-center justify-start min-h-screen bg-white px-4 pt-2"> {/* 위에서 2px 떨어짐 */}
            <h1 className="text-2xl font-bold text-gray-700 mb-4">전단지</h1>
            <a
                href={videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-500 underline mb-4"
            >
                {videoUrl}
            </a>
            <VideoPlayer videoId={sampleVideoId} />
        </div>
    );
}

export default FlyerReadComponent;
