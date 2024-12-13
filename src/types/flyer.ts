import {IMart} from "./mart.ts";

export interface Flyer {
    flyerID: number; // Long -> number
    title: string; // String -> string
    content: string; // String -> string
    audioURL: Set<string>; // Set<String> -> Set<string>
    attachImages: FlyerImage[]; // List<FlyerImage> -> FlyerImage[]
    producedVideo?: ProducedVideo; // ProducedVideo (nullable) -> ProducedVideo | undefined
    mart: IMart; // Mart -> Mart
}

// FlyerImage 타입 정의
export interface FlyerImage {
    filename: string;
    order: number;
}

// ProducedVideo 타입 정의
export interface ProducedVideo {
    videoURL: string; // 비디오 URL (추가적인 필드가 있다면 추가 가능)
    flyer?: Flyer; // Flyer (nullable) -> Flyer | undefined
}


