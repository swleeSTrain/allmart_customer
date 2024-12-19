import { useState, useEffect } from "react";
import BasicLayout from "../layouts/BasicLayout";
import GeneralLayout from "../layouts/GeneralLayout";
import CategoryListComponent from "../components/CategoryListComponent.tsx";
import { useParams } from "react-router-dom";
import { useCustomerStore } from "../stores/customerStore";
import BannerSlider from "../components/banner/BannerSlider.tsx";

interface BeforeInstallPromptEvent extends Event {
    prompt: () => Promise<void>;
    userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

function MainPage() {
    const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
    const [isIOS, setIsIOS] = useState(false);
    const [showPrompt, setShowPrompt] = useState(true);
    const { martID } = useParams<{ martID: string }>();
    const { loginType } = useCustomerStore();

    useEffect(() => {
        const handleBeforeInstallPrompt = (event: Event) => {
            event.preventDefault();
            setInstallPrompt(event as BeforeInstallPromptEvent);
        };

        const checkIsIOS = () => {
            const userAgent = window.navigator.userAgent.toLowerCase();
            setIsIOS(/iphone|ipad|ipod/.test(userAgent));
        };

        window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
        checkIsIOS();

        return () => {
            window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
        };
    }, []);

    const handleInstallClick = () => {
        if (installPrompt) {
            installPrompt.prompt();
            installPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === "accepted") {
                    console.log("사용자가 앱 설치를 동의했습니다.");
                } else {
                    console.log("사용자가 앱 설치를 거부했습니다.");
                }
                setInstallPrompt(null);
                setShowPrompt(false);
            });
        }
    };

    const handleCloseClick = () => {
        setShowPrompt(false);
    };

    const getLayout = () => (loginType === "phone" ? BasicLayout : GeneralLayout);
    const Layout = getLayout();

    return (
        <Layout>
            <div className={`min-h-screen ${(showPrompt && (installPrompt || isIOS)) ? 'pb-24' : ''}`}>
                <section className="container mx-auto px-4 py-6 mt-6">
                    <BannerSlider/>
                    <div className="mt-6">
                        <CategoryListComponent />
                    </div>
                </section>
            </div>
            {showPrompt && (installPrompt || isIOS) && (
                <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-blue-500 to-purple-600 p-6 z-50 rounded-t-2xl shadow-lg">
                    <div className="max-w-md mx-auto relative">
                        <button
                            onClick={handleCloseClick}
                            className="absolute top-0 right-0 text-white hover:text-gray-200 focus:outline-none"
                            aria-label="닫기"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <h2 className="text-2xl font-bold text-white mb-4 text-center">
                            앱 설치
                        </h2>
                        {isIOS ? (
                            <div className="bg-white rounded-lg p-4 shadow-inner">
                                <p className="text-gray-800 font-semibold mb-2">iOS에서 설치하기:</p>
                                <ol className="list-decimal list-inside text-gray-700">
                                    <li className="mb-1">Safari 브라우저의 공유 버튼을 탭하세요.</li>
                                    <li>'홈 화면에 추가'를 선택하세요.</li>
                                </ol>
                            </div>
                        ) : (
                            <button
                                id="install"
                                onClick={handleInstallClick}
                                className="w-full px-6 py-4 bg-white text-blue-600 font-bold rounded-lg shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 text-lg"
                            >
                                앱 설치하기
                            </button>
                        )}
                        <p className="text-xs text-white text-center mt-4 opacity-75">
                            설치하면 더 빠르고 편리하게 이용할 수 있습니다.
                        </p>
                    </div>
                </div>
            )}
        </Layout>
    );
}

export default MainPage;
