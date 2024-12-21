import { create } from "zustand";
import { devtools, persist, PersistStorage } from "zustand/middleware";
import { Cookies } from "react-cookie";

const cookies = new Cookies();

interface CustomerState {
    accessToken: string | null;
    refreshToken: string | null;
    name: string | null;
    customerID: number | null;
    martID: number | null;
    loginType: "phone" | "email" | null;
    email: string | null;
    setTokens: (accessToken: string, refreshToken: string) => void;
    setCustomerInfo: (name: string, customerID: number, martID: number, loginType: "phone" | "email"| null, email: string | null) => void;
    logout: () => void;
}

export const useCustomerStore = create<CustomerState>()(
    persist(
        devtools((set) => ({
            accessToken: null,
            refreshToken: null,
            name: null,
            customerID: null,
            martID: null,
            loginType: null,
            email:null,

            setTokens: (accessToken, refreshToken) => {
                set({ accessToken, refreshToken });
            },
            setCustomerInfo: (name, customerID, martID,  loginType, email) => {
                set({ name, customerID, martID, loginType, email });
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
        })),
        {
            name: "customer", // 쿠키 이름

            // @ts-ignore
            getStorage: (): PersistStorage<CustomerState> => ({
                getItem: (name) => {
                    const storedData = cookies.get(name);
                    try {
                        return storedData ? JSON.parse(storedData) : null;
                    } catch (error) {
                        console.error("쿠키 데이터 파싱 오류:", error);
                        cookies.remove(name);
                        return null;
                    }
                },
                setItem: (name, value) => {
                    cookies.set(name, JSON.stringify(value), { path: "/", maxAge: 604800 }); // 7일 유지
                },
                removeItem: (name) => {
                    cookies.remove(name, { path: "/" });
                },
            }),
        }
    )
);
