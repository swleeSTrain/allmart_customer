import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface CustomerState {
    accessToken: string | null;
    refreshToken: string | null;
    name: string | null;
    customerID: number | null;
    martID: number | null;
    setTokens: (accessToken: string, refreshToken: string) => void;
    setName: (name: string) => void;
    setCustomerInfo: (name: string, customerID: number, martID: number) => void;
    logout: () => void;
}

// zustand는 여기 로직 내에서 쿠키 처리가 안됨 따로 해줘야 함
export const useCustomerStore = create<CustomerState>()(
    devtools((set) => ({
        accessToken: null,
        refreshToken: null,
        name: null,
        customerID: null,
        martID: null,

        // 로그인 시 zustand에 밀어넣기
        setTokens: (accessToken, refreshToken) => {
            set({ accessToken, refreshToken });
        },
        setCustomerInfo: (name, customerID, martID) => {
            set({ name, customerID, martID });
        },
        // 얘는 사이드바에 이름 뜨게 하려고 설정
        setName: (name) => {
            set({ name })
        },

        logout: () => {
            set({
                accessToken: null,
                refreshToken: null,
                name: null,
                customerID: null,
                martID: null,
            });
        },
    }))
);
