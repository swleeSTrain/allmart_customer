import { loadTossPayments } from "@tosspayments/payment-sdk";
import { useCustomerStore } from "../../stores/customerStore";
import { useCustomerCookie } from "../../hooks/useCustomerCookie";
import { getReadOrder } from "../../api/OrderAPI";
import { v4 as uuidv4 } from "uuid";
import {sendOrderFcm} from "../../api/FcmAPI.ts"; // uuid import

const TossPayComponent: React.FC = () => {
    const [amount, setAmount] = useState<number>(0);
    const [orderId, setOrderId] = useState<string>(""); // orderId를 string으로 변경
    const [orderName, setOrderName] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const customerName = useCustomerStore((state) => state.name);
    const { getCustomerCookies } = useCustomerCookie();
    const setName = useCustomerStore((state) => state.setName);

    useEffect(() => {
        if (!customerName) {
            const { name } = getCustomerCookies();
            if (name) {
                setName(name);
            }
        }
    }, [customerName, getCustomerCookies]);

    useEffect(() => {
        const fetchOrderData = async () => {
            try {
                const order = await getReadOrder();
                setAmount(order.totalAmount);

                // uuid를 사용해 고유한 주문 ID 생성
                const generatedOrderId = uuidv4().replace(/-/g, "").slice(0, 36); // 6~36자 제한에 맞게 처리
                setOrderId(generatedOrderId);

                if (customerName) {
                    setOrderName(`${customerName}-${generatedOrderId}`); // 고객 이름과 결합
                    await sendOrderFcm(customerName, generatedOrderId); // FCM 전송
                } else {
                    console.error("고객 이름이 없습니다. 상태를 확인하세요.");
                }
            } catch (error) {
                console.error("주문 데이터를 불러오는 중 오류 발생:", error);
            }
        };

        fetchOrderData();
    }, [customerName]);


    const handlePayment = async () => {
        try {
            const tossPayments = await loadTossPayments("test_ck_ma60RZblrqR6ROZp0Bze8wzYWBn1");

            await tossPayments.requestPayment("카드", {
                amount,
                orderId,
                orderName,
                customerName,
                successUrl: `${window.location.origin}/toss/success`,
                failUrl: `${window.location.origin}/toss/fail`,
            });

            onSuccess && onSuccess();
        } catch (error) {
            console.error("결제 요청 중 오류 발생:", error);
            onError && onError(error);
        }
    };

    useEffect(() => {
        handlePayment();
    }, []);

    return null; // UI 없음
};

export default TossPayComponent;
