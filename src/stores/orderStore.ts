import { create } from "zustand";
import { fetchOrders } from "../api/OrderAPI.ts";
import { OrderList } from "../types/order";

interface OrderState {
    orders: OrderList[];
    loading: boolean;
    fetchAllOrders: () => Promise<void>;
}

export const useOrderStore = create<OrderState>((set) => ({
    orders: [],
    loading: false,
    fetchAllOrders: async () => {
        set({ loading: true });
        try {
            const orders = await fetchOrders();
            set({ orders });
        } catch (error) {
            console.error("Failed to fetch orders:", error);
            set({ orders: [] }); // 요청 실패 시 빈 배열로 설정
        } finally {
            set({ loading: false });
        }
    },
}));