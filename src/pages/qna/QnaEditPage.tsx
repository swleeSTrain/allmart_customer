import QnaEditComponent from "../../components/qna/QnaEditComponent.tsx";
import {useCustomerStore} from "../../stores/customerStore.ts";
import BasicLayout from "../../layouts/BasicLayout.tsx";
import GeneralLayout from "../../layouts/GeneralLayout.tsx";


function QnaEditPage() {
    const { loginType } = useCustomerStore(); // Zustand 상태로 로그인 타입 가져오기
    const Layout = loginType === "phone" ? BasicLayout : GeneralLayout;
    return (
        <Layout>
            <QnaEditComponent/>
        </Layout>
    );
}

export default QnaEditPage;