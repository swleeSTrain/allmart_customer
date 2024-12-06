import React from 'react';
interface InstallPopupProps {
    isOpen: boolean;
    onClose: () => void;
    onInstall: () => void;
}
const InstallPopupComponents: React.FC<InstallPopupProps> = ({ isOpen, onClose, onInstall }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-xl">
                <h2 className="text-xl font-bold mb-4">앱 설치</h2>
                <p className="mb-4">이 앱을 홈 화면에 설치하시겠습니까?</p>
                <div className="flex justify-end">
                    <button
                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded mr-2"
                        onClick={onClose}
                    >
                        나중에
                    </button>
                    <button
                        className="px-4 py-2 bg-blue-500 text-white rounded"
                        onClick={onInstall}
                    >
                        설치
                    </button>
                </div>
            </div>
        </div>
    );
};

export default InstallPopupComponents;