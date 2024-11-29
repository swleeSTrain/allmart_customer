import React from "react";
import "normalize.css";
import "../../styles/global.css";

const ItemListComponent = () => {
    return (
        <div className="bg-gray-100 min-h-screen p-4 flex justify-center items-center">
            <div className="bg-white w-full max-w-4xl rounded-md shadow-md p-6 overflow-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div className="text-xl font-semibold flex items-center space-x-2">
                        <span className="bg-black text-white p-2 rounded-full">☰</span>
                        <span>Search</span>
                    </div>
                    <div>
                        <input
                            type="text"
                            placeholder="Search"
                            className="border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring focus:ring-gray-200 w-full"
                        />
                    </div>
                </div>

                {/* Filters */}
                <div className="mb-6">
                    <div className="flex space-x-2 justify-center">
                        <button className="px-6 py-2 text-sm rounded-md bg-black text-white">
                            New
                        </button>
                        <button className="px-6 py-2 text-sm rounded-md border border-gray-300">
                            Price ascending
                        </button>
                        <button className="px-6 py-2 text-sm rounded-md border border-gray-300">
                            Price descending
                        </button>
                    </div>
                </div>

                {/* Items */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {[...Array(8)].map((_, index) => (
                        <div
                            key={index}
                            className="border border-gray-200 rounded-md p-4 flex flex-col items-center"
                        >
                            <div className="bg-gray-300 w-24 h-24 flex-shrink-0 rounded-md"></div>
                            <div className="mt-4 text-center">
                                <span className="text-gray-700 font-medium block">Item {index + 1}</span>
                                <span className="text-gray-500 font-bold">$0</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ItemListComponent;
