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
            });
        }
    };

    const getLayout = () => (loginType === "phone" ? BasicLayout : GeneralLayout);
    const Layout = getLayout();

    return (
        <Layout>
            <div className={`min-h-screen ${(installPrompt || isIOS) ? 'pb-24' : ''}`}>
                <section className="container mx-auto px-4 py-6 mt-6">
                    <BannerSlider/>
                    <div className="mt-6">
                        <CategoryListComponent />
                    </div>
                </section>
            </div>
            {(installPrompt || isIOS) && (
                <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg p-4 z-50">
                    <p className="text-center mb-2">{martID}번 마트 앱을 설치하시겠습니까?</p>
                    {isIOS ? (
                        <div className="text-sm text-center">
                            <p>iOS에서 설치하려면:</p>
                            <p>1. Safari 브라우저의 공유 버튼을 탭하세요.</p>
                            <p>2. '홈 화면에 추가'를 선택하세요.</p>
                        </div>
                    ) : (
                        <button
                            id="install"
                            onClick={handleInstallClick}
                            className="w-full px-6 py-3 bg-blue-500 text-white font-bold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
                        >
                            Install App
                        </button>
                    )}
                </div>
            )}
        </Layout>
    );
}

export default MainPage;
