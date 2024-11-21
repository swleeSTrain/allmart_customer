
import React, { useState, useEffect } from "react";

const PostcodeSearch: React.FC = () => {
    const [isScriptLoaded, setIsScriptLoaded] = useState(false);
    const [postcode, setPostcode] = useState("");
    const [roadAddress, setRoadAddress] = useState("");
    const [detailAddress, setDetailAddress] = useState("");
    const [guide, setGuide] = useState("");

    useEffect(() => {
        if (!document.getElementById("daum-postcode-script")) {
            const script = document.createElement("script");
            script.id = "daum-postcode-script";
            script.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
            script.async = true;
            script.onload = () => setIsScriptLoaded(true); // 스크립트 로드 완료 후 상태 업데이트
            document.body.appendChild(script);
        } else {
            setIsScriptLoaded(true);
        }
    }, []);

    const handleDaumPostcode = () => {
        if (!isScriptLoaded || !window.daum || !window.daum.Postcode) {
            alert("Daum Postcode API가 아직 로드되지 않았습니다.");
            return;
        }

        new window.daum.Postcode({
            oncomplete: (data: any) => {
                setPostcode(data.zonecode);
                setRoadAddress(data.roadAddress);
                setDetailAddress(""); // 상세주소 초기화

                if (data.autoRoadAddress) {
                    setGuide(`(예상 도로명 주소 : ${data.autoRoadAddress})`);
                } else if (data.autoJibunAddress) {
                    setGuide(`(예상 지번 주소 : ${data.autoJibunAddress})`);
                } else {
                    setGuide("");
                }
            },
        }).open();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // 입력값 검증
        if (!postcode || !roadAddress || !detailAddress) {
            alert("모든 필드를 입력해주세요.");
            return;
        }

        const addressData = {
            postcode,
            roadAddress,
            detailAddress,
        };

        try {
            const response = await fetch("/api/addresses", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(addressData),
            });

            if (response.ok) {
                const data = await response.json();
                console.log("등록된 주소:", data);
                alert("주소가 등록되었습니다!");
            } else {
                alert("주소 등록에 실패했습니다.");
            }
        } catch (error) {
            console.error("주소 등록 중 에러 발생:", error);
            alert("주소 등록 중 에러가 발생했습니다.");
        }
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
            <h2 className="text-2xl font-bold mb-4 text-center">주소 검색</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">우편번호</label>
                    <div className="flex gap-2 items-center">
                        <input
                            type="text"
                            placeholder="우편번호"
                            value={postcode}
                            readOnly
                            className="flex-grow px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
                        />
                        <button
                            type="button"
                            onClick={handleDaumPostcode}
                            className="px-4 py-2 bg-blue-500 text-white font-medium rounded-lg text-sm hover:bg-blue-600"
                        >
                            찾기
                        </button>
                    </div>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">도로명 주소</label>
                    <input
                        type="text"
                        placeholder="도로명 주소"
                        value={roadAddress}
                        readOnly
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">상세 주소</label>
                    <input
                        type="text"
                        placeholder="상세 주소"
                        value={detailAddress}
                        onChange={(e) => setDetailAddress(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
                    />
                </div>
                <div className="text-sm text-gray-500 mb-4">{guide}</div>
                <div className="text-center">
                    <button
                        type="submit"
                        className="px-6 py-2 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600"
                    >
                        등록
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PostcodeSearch;
