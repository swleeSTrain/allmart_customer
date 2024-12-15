import { create } from "zustand";

const useMediaStore = create((set) => ({
    selectedMedia: null,
    setSelectedMedia: (media) => set({ selectedMedia: media }),
}));

export default useMediaStore;
