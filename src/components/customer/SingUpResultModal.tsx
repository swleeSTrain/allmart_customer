import {handleFetchTokens} from "../../api/CustomerAPI.ts";

interface ResultModalProps {
    // msg:string,
    callback:() => void,
}

function QrResultModal({ callback}: ResultModalProps) {
    handleFetchTokens();

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
            <div className="bg-blue-600 p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-semibold mb-4"> 회원가입을 축하합니다</h2>
                {/*<p className="mb-6">{msg}</p>*/}

                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    onClick={() => callback()}
                >
                    확인
                </button>

            </div>
        </div>
    );
}

export default QrResultModal;