import { useState, useEffect } from "react";
import BasicLayout from "../layouts/BasicLayout";
import GeneralLayout from "../layouts/GeneralLayout"; // 일반 사용자 레이아웃
import CategoryListComponent from "../components/CategoryListComponent.tsx";

import {  useParams } from "react-router-dom";
import { useCustomerStore } from "../stores/customerStore";

import BannerSlider from "../components/banner/BannerSlider.tsx";


interface BeforeInstallPromptEvent extends Event {
    prompt: () => Promise<void>;
    userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

function MainPage() {
    const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
    const { martID } = useParams<{ martID: string }>();
    const { loginType } = useCustomerStore(); // 로그인 타입 가져오기

    // PWA 설치 이벤트 핸들러
    useEffect(() => {
        const handleBeforeInstallPrompt = (event: Event) => {
            event.preventDefault();
            setInstallPrompt(event as BeforeInstallPromptEvent);
        };

        window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

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

    // 레이아웃 선택 함수
    const getLayout = () => (loginType === "phone" ? BasicLayout : GeneralLayout);

    const Layout = getLayout();

    return (
        <Layout>
            <section className="container mx-auto px-4 py-6 mt-6">
                {/* 배너 영역 */}
                <BannerSlider/>

                {/* 메인 콘텐츠 */}
                <div className="mt-6">
                    {/*<h1 className="text-2xl font-bold mb-4">메인 Mart {martID}</h1>*/}


                    {/* 설치 버튼 또는 카테고리 목록 */}
                    <div className="mt-6">
                        {installPrompt ? (
                            <button
                                id="install"
                                onClick={handleInstallClick}
                                className="px-6 py-3 bg-blue-500 text-white font-bold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
                            >
                                Install App
                            </button>
                        ) : (
                            <CategoryListComponent />
                        )}
                    </div>
                </div>
            </section>
        </Layout>
    );
}

export default MainPage;
