// src/types/mart.ts

export interface IMart {
    martID: number;
    martName: string;        // 마트 이름
    phoneNumber: string;     // 전화번호
    address: string;         // 주소
    thumbnailImage: string;  // 썸네일 이미지 URL
}

export interface IMartMap {
    martID: number;
    martName: string;
    lat: number;
    lng: number;
}