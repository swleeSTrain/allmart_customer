
function LoadingPage() {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
            <div className="flex flex-col items-center space-y-4">
                {/* 스피너 */}
                <div className="w-12 h-12 border-4 border-t-4 border-gray-200 rounded-full animate-spin border-t-blue-500"></div>
                {/* 텍스트 */}
                <p className="text-white text-lg font-semibold">로딩 중...</p>
            </div>
        </div>
    );
}

export default LoadingPage;