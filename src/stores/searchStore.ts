import { create } from 'zustand';
import { devtools, persist, PersistStorage } from 'zustand/middleware';
import { Cookies } from 'react-cookie';

const cookies = new Cookies();

interface SearchState {
    recentSearches: string[];
    addSearch: (keyword: string) => void;
    clearSearches: () => void;
}

export const useSearchStore = create<SearchState>()(
    persist(
        devtools(
            (set) => ({
                recentSearches: [],
                addSearch: (keyword) =>
                    set((state) => {
                        const updatedSearches = [keyword, ...state.recentSearches.filter((word) => word !== keyword)];
                        return { recentSearches: updatedSearches.slice(0, 5) }; // 최대 5개 유지
                    }),
                clearSearches: () => set(() => ({ recentSearches: [] })),
            })
        ),
        {
            name: 'recentSearches',
            // @ts-ignore
            getStorage: (): PersistStorage<SearchState> => ({
                getItem: (name) => {
                    const savedSearches = cookies.get(name);
                    try {
                        return savedSearches ? JSON.parse(savedSearches) : null;
                    } catch (error) {
                        console.error('쿠키 데이터 파싱 오류:', error);
                        cookies.remove(name);
                        return { recentSearches: [] };
                    }
                },
                setItem: (name, value) => cookies.set(name, JSON.stringify(value), { path: '/', maxAge: 3600 }),
                removeItem: (name) => cookies.remove(name, { path: '/' }),
            }),
        }
    )
);
