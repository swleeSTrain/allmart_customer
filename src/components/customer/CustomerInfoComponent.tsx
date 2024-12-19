import { useEffect } from "react";
import { useCustomerStore } from "../../stores/customerStore.ts"; // Zustand store

function CustomerInfoComponent() {
    const { name, martID, customerID, setCustomerInfo } = useCustomerStore();

    // Zustand의 상태를 확인하여 필요한 경우 초기화 로직
    useEffect(() => {
        // 쿠키에 저장된 값은 `persist`를 통해 자동으로 Zustand에 반영됩니다.
        if (!name || !martID || !customerID) {
            const savedState = JSON.parse(localStorage.getItem("customer") || "{}");
            if (savedState.name && savedState.martID && savedState.customerID) {
                setCustomerInfo(savedState.name, savedState.customerID, savedState.martID, "phone"); // 로그인 타입은 필요에 맞게 지정
            }
        }
    }, [name, martID, customerID, setCustomerInfo]);

    return (
        <div>
            <h2>회원 정보</h2>
            <div>
                <p><strong>이름:</strong> {name}</p>
                <p><strong>마트 아이디:</strong> {martID}</p>
                <p><strong>고객 아이디:</strong> {customerID}</p>
            </div>
        </div>
    );
}

export default CustomerInfoComponent;
