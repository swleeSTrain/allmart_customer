import {useState, useEffect, useMemo} from "react";
import GeneralLayout from "../layouts/GeneralLayout";
import CategoryListComponent from "../components/CategoryListComponent.tsx";
import {useCustomerStore} from "../stores/customerStore";
import BannerSlider from "../components/banner/BannerSlider.tsx";
import {handleFCMTokenUpdate} from "../firebase/fcmUtil.ts";
import { useLocation } from "react-router-dom";
import {useCustomerCookie} from "../hooks/useCustomerCookie.ts";
import BasicLayout from "../layouts/BasicLayout.tsx";

interface BeforeInstallPromptEvent extends Event {
    prompt: () => Promise<void>;
    userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}
function MainPage() {
    const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
    const [isIOS, setIsIOS] = useState(false);
    const [showPrompt, setShowPrompt] = useState(true);

    const {loginType, name, martID, customerID, setCustomerInfo } = useCustomerStore(); // Zustand에서 상태 관리 함수 가져오기
    const { getCustomerCookies } = useCustomerCookie(); // 쿠키에서 고객 정보 가져오기

    // 쿠키랑 상태가 연동이 안되어있어서 여기를 통해 동기화 시켜주는 것
    // `getCustomerCookies` 결과 캐싱
    const customerData = useMemo(() => getCustomerCookies(), [getCustomerCookies]);

    // 쿠키 기반으로 상태 초기화
    useEffect(() => {
        if (
            customerData.name !== name ||
            customerData.martID !== martID ||
            customerData.customerID !== customerID
        ) {
            setCustomerInfo(customerData.name, customerData.customerID, customerData.martID); // 변수 이름 수정
        }
    }, [name, martID, customerID, customerData, setCustomerInfo]);
    console.log("customerID"+ customerID+"martID"+martID);

    if (customerID != null && martID != null) {
        handleFCMTokenUpdate(customerID, martID).then(r => console.log(r));
    }

    const location = useLocation();

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

    const getLayout = () => {
        // MartCard에서 넘어온 경우 GeneralLayout 사용
        if (location.state?.useGeneralLayout) {
            return GeneralLayout;
        }

        // 기본 loginType에 따라 레이아웃 결정
        return loginType === "phone" ? BasicLayout : GeneralLayout;
    };

    const Layout = getLayout();

    return (
        <Layout>
            <div className={`min-h-screen ${(showPrompt && (installPrompt || isIOS)) ? 'pb-24' : ''}`}>
                <section className="container mx-auto px-4 py-6 mt-6">
                    <BannerSlider />
                    <div className="mt-6">
                        <CategoryListComponent />
                    </div>
                </section>
            </div>
            {showPrompt && (installPrompt || isIOS) && (
                <div
                    className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-blue-500 to-purple-600 p-6 z-50 rounded-t-2xl shadow-lg">
                    <div className="max-w-md mx-auto relative">
                        <button
                            onClick={handleCloseClick}
                            className="absolute top-0 right-0 text-white hover:text-gray-200 focus:outline-none"
                            aria-label="닫기"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                                 stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                      d="M6 18L18 6M6 6l12 12"/>
                            </svg>
                        </button>
                        <h2 className="text-2xl font-bold text-white mb-4 text-center">
                            앱 설치
                        </h2>
                        {isIOS ? (
                            <div className="bg-white rounded-lg p-4 shadow-inner">
                                <p className="text-gray-800 font-semibold mb-2">iOS에서 설치하기:</p>
                                <ol className="list-decimal list-outside text-gray-700 ml-4">
                                    <li className="mb-1">
            <span className="inline-flex items-center whitespace-nowrap">
                Safari 브라우저의 공유
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24"
                     height="24" fill="none" stroke="currentColor" stroke-width="2"
                     stroke-linecap="round" stroke-linejoin="round"
                     className="inline-block ml-1 mr-1">
                    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
                    <polyline points="16 6 12 2 8 6"/>
                    <line x1="12" y1="2" x2="12" y2="15"/>
                </svg>
                버튼을 탭하세요.
            </span>
                                    </li>
                                    <li>
            <span className="inline-flex items-center whitespace-nowrap">
                '홈 화면에 추가'
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24"
                     height="24" fill="none" stroke="currentColor" stroke-width="2"
                     stroke-linecap="round" stroke-linejoin="round"
                     className="inline-block ml-1 mr-1">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                    <line x1="12" y1="8" x2="12" y2="16"/>
                    <line x1="8" y1="12" x2="16" y2="12"/>
                </svg>
                를 선택하세요.
            </span>
                                    </li>
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
