import BasicLayout from "../../layouts/BasicLayout.tsx";

interface ResultModalProps {
    msg: string;
    callback: () => void;
}

function LoginCheckPage({ msg, callback }: ResultModalProps) {
    return (
        <BasicLayout>
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-white z-50">
            <div className="bg-whtie p-8 rounded-lg shadow-lg w-96 border-gray border-2" >
                <h2 className="text-xl font-semibold mb-4 text-balck-600">알림</h2>
                <p className="mb-6 text-blue-500">{msg}</p>

                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    onClick={callback} // 모달 닫기 콜백 호출
                >
                    확인
                </button>
            </div>
        </div>
        </BasicLayout>
    );
}

export default LoginCheckPage;
