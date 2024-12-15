import BasicLayout from "../../layouts/BasicLayout.tsx";
import OrderVoiceComponent from "../../components/order/OrderVoiceWindow.tsx";
import {useCustomerStore} from "../../stores/customerStore.ts";
import GeneralLayout from "../../layouts/GeneralLayout.tsx";

function OrderVoicePage() {
    const { loginType } = useCustomerStore(); // Zustand 상태로 로그인 타입 가져오기
    const Layout = loginType === "phone" ? BasicLayout : GeneralLayout;
    return (
        <Layout><OrderVoiceComponent message={""} onClose={function(): void {
            throw new Error("Function not implemented.");
        } } /></Layout>
    );
}

export default OrderVoicePage;