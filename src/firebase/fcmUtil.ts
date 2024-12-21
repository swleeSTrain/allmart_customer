import { getToken } from "firebase/messaging";
import { messaging } from "./settingFCM";

import axios from 'axios';

interface DeviceRegistrationRequest {
    userId: number;
    martId: number;
    fcmToken: string;
}

const API_BASE_URL = 'http://localhost:8082/api';
const requestNotificationPermission = async () => {
    try {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
            console.log('알림 권한이 허용되었습니다.');
            return true;
        } else {
            console.log('알림 권한이 거부되었습니다.');
            return false;
        }
    } catch (error) {
        console.error('알림 권한 요청 중 오류 발생:', error);
        return false;
    }
};
export const registerServiceWorker = () => {
    navigator.serviceWorker
        .register("firebase-messaging-sw.js")
        .then((registration) => {
            console.log("FCM Service Worker 등록 성공:", registration);
        })
        .catch((error) => {
            console.log("FCM Service Worker 등록 실패:", error);
        });
};

export const getFCMToken = async (): Promise<string> => {
    const permissionGranted = await requestNotificationPermission();
    if (!permissionGranted) {
        throw new Error('알림 권한이 필요합니다.');
    }
    try {
        const token = await getToken(messaging, {
            vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
        });
        console.log("FCM 토큰:", token);
        return token;
    } catch (error) {
        console.error("FCM 토큰 획득 실패:", error);
        throw error;
    }
};

export const updateFCMToken = async (registrationData: DeviceRegistrationRequest): Promise<string> => {
    try {
        const response = await axios.post(
            `${API_BASE_URL}/devices/register`,
            registrationData,
            {
                headers: { "Content-Type": "application/json" }
            }
        );

        if (response.status !== 200) {
            throw new Error('FCM 토큰 등록에 실패했습니다.');
        }

        return response.data;
    } catch (error: any) {
        console.error("FCM 토큰 등록 중 오류 발생:", error.response || error.message);
        throw new Error("FCM 토큰 등록 요청이 실패했습니다");
    }
};

export const handleFCMTokenUpdate = async (userId: number, martId: number) => {
    try {
        await Notification.requestPermission();
        registerServiceWorker();
        const fcmToken = await getFCMToken();
        const registrationData: DeviceRegistrationRequest = {
            userId,
            martId,
            fcmToken
        };
        const result = await updateFCMToken(registrationData);
        console.log("FCM 토큰 업데이트 결과:", result);
    } catch (error) {
        console.error("FCM 토큰 업데이트 처리 실패:", error);
    }
};
