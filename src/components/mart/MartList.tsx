import React, { useEffect, useState } from 'react';
import { IMart } from '../../types/mart';
import { getMartList } from '../../api/MartAPI';
import MartCard from './MartCard';
import SkeletonLoader from './SkeletonLoader';

const MartList: React.FC = () => {
    const [martList, setMartList] = useState<IMart[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMarts = async () => {
            try {
                const data = await getMartList();
                setMartList(data);
            } catch (error: any) {
                setError('Failed to load mart list. Please try again later.');
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchMarts();
    }, []);

    if (loading) {
        return (
            <div className="space-y-4 p-4">
                {Array.from({ length: 6 }).map((_, idx) => (
                    <SkeletonLoader key={idx} />
                ))}
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-lg font-semibold text-red-600">{error}</div>
            </div>
        );
    }

    if (martList.length === 0) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-lg font-semibold">No marts available</div>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4">
            <div className="space-y-4">
                {martList.map((mart) => (
                    <MartCard key={mart.martID} mart={mart} />
                ))}
            </div>
        </div>
    );
};

export default MartList;
