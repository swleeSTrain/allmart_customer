import React from 'react';

const SkeletonLoader: React.FC = () => {
    return (
        <div className="animate-pulse bg-white rounded-xl shadow-lg p-4">
            <div className="w-24 h-24 bg-gray-200 rounded-full mb-4 mx-auto"></div>
            <div className="h-4 bg-gray-200 rounded-md mb-2 mx-auto w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded-md mb-1 mx-auto w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded-md mx-auto w-1/3"></div>
        </div>
    );
};

export default SkeletonLoader;
