import { create } from "zustand";
import { devtools, persist, PersistStorage } from "zustand/middleware";
import { Cookies } from "react-cookie";
import { fetchMartInfo } from "../api/CustomerAPI.ts"; // 기존 API 함수
import { getMartRead } from "../api/MartAPI.ts"; // 새로운 API 함수

const cookies = new Cookies();

// Mart 정보를 저장하는 상태 인터페이스
export interface MartState {
    martInfo: Record<string, any> | null; // martInfo 데이터를 저장
    fetchAndStoreMartInfo: (identifier: string, type: "phone" | "email") => Promise<void>; // martInfo를 가져오고 저장하는 함수
    clearMartInfo: () => void; // martInfo 초기화 함수
    fetchMartByID: (martID: number) => Promise<void>; // 새로운 함수: martID로 마트 정보 가져오기
}

export const useMartStore = create<MartState>()(
    persist(
        devtools((set) => ({
            martInfo: null, // 초기값

            // 기존: 휴대폰/이메일로 martInfo 가져오는 함수
            fetchAndStoreMartInfo: async (identifier: string, type: "phone" | "email") => {
                try {
                    const requestData = type === "phone" ? { phoneNumber: identifier } : { email: identifier };
                    const data = await fetchMartInfo(requestData); // API 호출
                    set(() => ({ martInfo: data })); // 상태 업데이트

                    console.log("====================");
                    console.log(data); // 받아온 데이터를 출력
                } catch (error) {
                    console.error("Failed to fetch mart info:", error);
                }
            },

            // 새로운: martID로 마트 정보 가져오기
            fetchMartByID: async (martID: number) => {
                try {
                    const response = await getMartRead(martID); // API 호출

                    console.log("====================");
                    console.log(response); // 받아온 데이터를 출력
                    // @ts-ignore
                    const logoURL = response.attachLogo?.[0] || ""; // attachLogo에서 첫 번째 URL 가져오기
                    set(() => ({ martInfo: { ...response, logoURL } })); // 상태 업데이트
                    console.log("Fetched Mart Info by ID:", response);
                } catch (error) {
                    console.error(`Failed to fetch mart info for ID ${martID}:`, error);
                }
            },

            // 상태 초기화 함수
            clearMartInfo: () => set(() => ({ martInfo: null })),
        })),
        {
            name: "mart", // 쿠키 이름 설정

            // @ts-ignore
            getStorage: (): PersistStorage<MartState> => ({
                getItem: (name) => {
                    const savedMartInfo = cookies.get(name);
                    try {
                        return savedMartInfo ? JSON.parse(savedMartInfo) : null;
                    } catch (error) {
                        console.error("쿠키 데이터 파싱 오류:", error);
                        cookies.remove(name);
                        return { martInfo: null };
                    }
                },
                setItem: (name, value) => cookies.set(name, JSON.stringify(value), { path: "/", maxAge: 3600 }),
                removeItem: (name) => cookies.remove(name, { path: "/" }),
            }),
        }
    )
);
