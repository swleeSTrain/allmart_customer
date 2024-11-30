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

export const useCustomerStore = create<CustomerState>()(
    devtools((set) => ({
        accessToken: null,
        refreshToken: null,
        name: null,
        customerID: null,
        martID: null,

        setTokens: (accessToken, refreshToken) => {
            set({ accessToken, refreshToken });
        },
        setName: (name) => {
            set({ name })
        },
        setCustomerInfo: (name, customerID, martID) => {
            set({ name, customerID, martID });
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
