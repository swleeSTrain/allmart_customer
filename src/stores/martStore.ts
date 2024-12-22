import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface MartState {
    martID: number | null;
    martLogo: string | null;
    setMartIDAndLogo: (martID: number, martLogo: string) => void;
    clearMartInfo: () => void;
}

export const useMartStore = create<MartState>()(
    devtools((set) => ({
        martID: null,
        martLogo: null,

        // martID와 martLogo를 함께 설정
        setMartIDAndLogo: (martID: number, martLogo: string) => {
            set({ martID, martLogo });
        },

        // 상태 초기화
        clearMartInfo: () => {
            set({ martID: null, martLogo: null });
        },
    }))
);
