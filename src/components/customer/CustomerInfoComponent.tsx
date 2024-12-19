import { useEffect, useMemo } from "react";
import { useCustomerStore } from "../../stores/customerStore.ts"; // Zustand store
import { useCustomerCookie } from "../../hooks/useCustomerCookie"; // 쿠키 관련 훅

function CustomerInfoComponent() {
    const { name, martID, customerID, setCustomerInfo } = useCustomerStore(); // Zustand에서 상태 관리 함수 가져오기
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
            setCustomerInfo(customerData.name, customerData.customerID, customerData.martID, undefined, customerData.email); // 변수 이름 수정
        }
    }, [name, martID, customerID, customerData, setCustomerInfo]);

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
