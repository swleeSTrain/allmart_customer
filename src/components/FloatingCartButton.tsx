import { useNavigate } from "react-router-dom";
import {useCustomerCookie} from "../hooks/useCustomerCookie.ts";
import {useCustomerStore} from "../stores/customerStore.ts";

const FloatingCartButton = () => {
    const navigate = useNavigate();
    const { martID: cookieMartID } = useCustomerCookie().getCustomerCookies();
    const martID = useCustomerStore((state) => state.martID) || cookieMartID;

    return (
        <button
            aria-label="장바구니"
            onClick={() => navigate(`${martID}/product/cart`)}
            className="fixed bottom-28 right-6 bg-orange-500 hover:bg-orange-600 text-white rounded-full shadow-lg p-3 focus:outline-none transform transition-transform hover:scale-110 z-50"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.26a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.37 7.5h13.26a1.125 1.125 0 011.121 1.007z"
                />
            </svg>
        </button>
    );
};

export default FloatingCartButton;
