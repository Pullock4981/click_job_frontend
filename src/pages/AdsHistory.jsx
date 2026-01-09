import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import api from '../services/api';
import { API_ENDPOINTS } from '../config/api';
import { format } from 'date-fns';

const AdsHistory = () => {
    const [ads, setAds] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAds = async () => {
            setLoading(true);
            try {
                const res = await api.get(API_ENDPOINTS.MY_ADVERTISEMENTS);
                if (res.success) {
                    setAds(res.data.advertisements);
                }
            } catch (error) {
                console.error('Error fetching ads history:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAds();
    }, []);

    return (
        <Layout showFooter={true}>
            <div className="min-h-screen bg-base-100 -m-2 xs:-m-3 md:-m-8">

                {/* Header Section */}
                <div className="bg-primary h-48 md:h-56 w-full"></div>

                {/* Content Area */}
                <div className="max-w-4xl mx-auto px-4 -mt-32 md:-mt-40 pb-20">
                    <div className="bg-base-200 rounded-lg shadow-sm overflow-hidden border border-base-content/5">
                        {/* Title Bar */}
                        <div className="p-6 border-b border-base-content/5">
                            <h2 className="text-primary font-bold text-lg">Advertisement</h2>
                        </div>

                        {/* Table Area */}
                        <div className="overflow-x-auto">
                            {loading ? (
                                <div className="flex items-center justify-center p-12">
                                    <span className="loading loading-spinner text-primary"></span>
                                </div>
                            ) : ads.length > 0 ? (
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-base-300 text-[10px] font-black text-base-content/40 uppercase tracking-widest border-b border-base-content/5">

                                            <th className="px-6 py-4">Campaign ID</th>
                                            <th className="px-6 py-4">Title</th>
                                            <th className="px-6 py-4">Target</th>
                                            <th className="px-6 py-4">Duration & Cost</th>
                                            <th className="px-6 py-4">Status</th>
                                            <th className="px-6 py-4">Ending</th>
                                            <th className="px-6 py-4">Date</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100 dark:divide-base-content/5">
                                        {ads.map((ad) => (
                                            <tr key={ad._id} className="text-[13px] text-gray-600 dark:text-gray-300 hover:bg-gray-50/80 dark:hover:bg-base-200/30 transition-colors">
                                                <td className="px-6 py-5 font-bold">#{ad._id.slice(-6)}</td>
                                                <td className="px-6 py-5 font-bold text-gray-800 dark:text-gray-100">{ad.title}</td>
                                                <td className="px-6 py-5 truncate max-w-[150px]">{ad.link}</td>
                                                <td className="px-6 py-5">
                                                    <span className="font-bold">{ad.durationDays || 'N/A'} Days</span>
                                                    <span className="block text-[11px] text-gray-400">${ad.price || 0}</span>
                                                </td>
                                                <td className="px-6 py-5">
                                                    <span className={`px-2 py-1 rounded text-[10px] font-black uppercase tracking-wider ${ad.status === 'active'
                                                        ? 'bg-green-100 text-green-600'
                                                        : 'bg-yellow-100 text-yellow-600'
                                                        }`}>
                                                        {ad.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-5">
                                                    {ad.endDate ? format(new Date(ad.endDate), 'yyyy-MM-dd') : 'Permanent'}
                                                </td>
                                                <td className="px-6 py-5">
                                                    {format(new Date(ad.createdAt), 'yyyy-MM-dd')}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <div className="flex items-center justify-center py-24">
                                    <p className="text-gray-400 dark:text-gray-500 font-bold text-base md:text-lg opacity-40 uppercase tracking-widest">
                                        You Have No Ads
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Footer inside content area */}
                    <div className="mt-12 flex flex-col md:flex-row justify-between items-center text-[11px] text-gray-400 dark:text-gray-500 font-bold uppercase tracking-widest gap-4">
                        <p>© 2026 CLICK JOB</p>
                        <div className="flex flex-wrap justify-center gap-6">
                            <button className="hover:text-primary transition-colors">About Us</button>
                            <button className="hover:text-primary transition-colors">Privacy Policy</button>
                            <button className="hover:text-primary transition-colors">FAQ</button>
                            <button className="hover:text-primary transition-colors">Terms of Use</button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default AdsHistory;
