import BasicLayout from "../../layouts/BasicLayout.tsx";
import OrderVoiceComponent from "../../components/order/OrderVoiceWindow.tsx";

function OrderVoicePage() {
    return (
        <BasicLayout><OrderVoiceComponent message={""} onClose={function(): void {
            throw new Error("Function not implemented.");
        } } /></BasicLayout>
    );
}

export default OrderVoicePage;