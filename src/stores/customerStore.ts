import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface CustomerState {
    accessToken: string | null;
    refreshToken: string | null;
    name: string | null;
    customerID: number | null;
    martID: number | null;
    loginType: "phone" | "email" | null; // 로그인 타입 추가
    setTokens: (accessToken: string, refreshToken: string) => void;
    setName: (name: string) => void;
    setMartID: (martID: number) => void;
    setCustomerInfo: (name: string, customerID: number, martID: number, loginType: "phone" | "email") => void;
    logout: () => void;
}

// zustand 상태를 localStorage에 저장하고 복원
export const useCustomerStore = create<CustomerState>()(
    devtools(
        persist(
            (set) => ({
                accessToken: null,
                refreshToken: null,
                name: null,
                customerID: null,
                martID: null,
                loginType: null, // 초기값 추가

                // 로그인 시 zustand에 상태 설정
                setTokens: (accessToken, refreshToken) => {
                    set({ accessToken, refreshToken });
                },
                setCustomerInfo: (name, customerID, martID, loginType) => {
                    set({ name, customerID, martID, loginType });
                },
                setName: (name) => {
                    set({ name });
                },
                setMartID: (martID) => {
                    set({ martID });
                },
                logout: () => {
                    set({
                        accessToken: null,
                        refreshToken: null,
                        name: null,
                        customerID: null,
                        martID: null,
                        loginType: null,
                    });
                },
            }),
            {
                name: "customer-store", // localStorage 키 이름
                getStorage: () => localStorage, // 기본 localStorage 사용
            }
        )
    )
);
