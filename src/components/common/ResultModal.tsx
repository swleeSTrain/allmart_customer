
interface ResultModalProps {
    msg:string,
    callback:() => void,
}

function QrResultModal({img, msg, callback}: ResultModalProps) {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
            <div className="bg-blue-600 p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-semibold mb-4"> QR 본인인증</h2>
                <img className="mb-6" src={img} alt="qr 이미지를 찾지 못했습니다. 다시시도해주세요"></img>
                <p className="mb-6">{msg}</p>

                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    onClick={() => callback()}
                >
                    닫기
                </button>

            </div>
        </div>
    );
}

export default QrResultModal;