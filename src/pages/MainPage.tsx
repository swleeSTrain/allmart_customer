import { useState, useEffect } from "react";
import BasicLayout from "../layouts/BasicLayout";
import GeneralLayout from "../layouts/GeneralLayout"; // 일반 사용자 레이아웃
import CategoryListComponent from "../components/CategoryListComponent.tsx";
import { Link, useParams } from "react-router-dom";
import { useCustomerStore } from "../stores/customerStore";

interface BeforeInstallPromptEvent extends Event {
    prompt: () => Promise<void>;
    userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

function MainPage() {
    const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
    const { martID } = useParams<{ martID: string }>();
    const { loginType } = useCustomerStore(); // 로그인 타입 가져오기

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
                if (choiceResult.outcome === 'accepted') {
                    console.log('사용자가 앱 설치를 동의했습니다.');
                } else {
                    console.log('사용자가 앱 설치를 거부했습니다.');
                }
                setInstallPrompt(null);
            });
        }
    };

    // 로그인 타입에 따라 레이아웃 선택
    const Layout = loginType === "phone" ? BasicLayout : GeneralLayout;

    return (
        <Layout>
            <h1>메인 Mart {martID}</h1>
            <ul>
                {[1, 2, 3, 4, 5].map((martID) => (
                    <li key={martID}>
                        <Link to={`/${martID}`}>Mart {martID}</Link>
                    </li>
                ))}
            </ul>
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
        </Layout>
    );
}

export default MainPage;
