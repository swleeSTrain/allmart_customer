import QnaDetailComponent from "../../components/qna/QnaDetailComponent";
import {useCustomerStore} from "../../stores/customerStore.ts";
import BasicLayout from "../../layouts/BasicLayout.tsx";
import GeneralLayout from "../../layouts/GeneralLayout.tsx";

function QnaDetailPage() {
    const { loginType } = useCustomerStore(); // Zustand 상태로 로그인 타입 가져오기
    const Layout = loginType === "phone" ? BasicLayout : GeneralLayout;
    return(
        <Layout>
            <QnaDetailComponent />
        </Layout>
);
}

export default QnaDetailPage;
