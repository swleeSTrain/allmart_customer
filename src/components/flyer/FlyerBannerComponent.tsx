import React, { useEffect, useState } from "react";
import axios from "axios";

const BannerComponent = () => {
    const [banners, setBanners] = useState([]);

    // Fetch banners from the API
    const fetchBanners = async () => {
        try {
            const response = await axios.get("https://allmartservice.shop/api/v1/banners/getAll");
            setBanners(response.data.slice(0, 2)); // 처음 2개 배너만 표시
        } catch (error) {
            console.error("Error fetching banners:", error);
        }
    };

    useEffect(() => {
        fetchBanners();
    }, []);

    const handleMediaClick = (youtubeUrl) => {
        if (youtubeUrl) {
            window.open(youtubeUrl, "_blank"); // Open YouTube URL in a new tab
        } else {
            alert("YouTube URL is not provided.");
        }
    };

    const getImageUrl = (imagePath) => {
        return imagePath.startsWith("http") ? imagePath : `https://allmartservice.shop/files/image/${imagePath}`;
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center">
            <h1 className="text-3xl font-bold mb-6">Banner List</h1>

            {banners.length === 0 ? (
                <p className="text-lg text-gray-500">Loading banners...</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {banners.map((banner) => (
                        <div
                            key={banner.id}
                            className="cursor-pointer hover:shadow-lg transition-transform transform hover:scale-105"
                            onClick={() => handleMediaClick(banner.link)}
                        >
                            <img
                                src={getImageUrl(banner.image)}
                                alt={banner.title}
                                className="rounded-lg shadow-md w-full h-48 object-cover"
                            />
                            <p className="text-center mt-2 text-gray-700 font-semibold">{banner.title}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default BannerComponent;
