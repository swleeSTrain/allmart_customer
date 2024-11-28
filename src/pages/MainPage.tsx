import { useState, useEffect } from "react";
import BasicLayout from "../layouts/BasicLayout";

interface BeforeInstallPromptEvent extends Event {
    prompt: () => Promise<void>;
    userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

function MainPage() {
    const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);

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

    return (
        <BasicLayout>
            <h1>메인 페이지</h1>
            {installPrompt && (
                <button id="install" onClick={handleInstallClick}>
                    Install App
                </button>
            )}
        </BasicLayout>
    );
}

export default MainPage;
