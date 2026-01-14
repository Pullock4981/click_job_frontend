import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/layout/AdminLayout';
import { FaTrash } from 'react-icons/fa';
import api from '../services/api';
import { API_ENDPOINTS } from '../config/api';

const ClickEarnAdsPage = () => {
    const [ads, setAds] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAds();
    }, []);

    const fetchAds = async () => {
        try {
            setLoading(true);
            const res = await api.get(API_ENDPOINTS.CLICK_EARN_ADS);
            setAds(res.data?.data || []);
        } catch (err) {
            console.error(err);
            setAds([]);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Delete this ad?')) {
            try {
                await api.delete(`${API_ENDPOINTS.CLICK_EARN_ADS}/${id}`);
                fetchAds();
            } catch (err) {
                console.error(err);
            }
        }
    };

    return (
        <AdminLayout>
            <div className="p-4 md:p-6 bg-[#F4F6F9] min-h-screen">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-xl font-normal text-gray-800">Click Earn Ads List</h1>
                    <div className="text-xs text-blue-500">Home / All Click Earn Ads List</div>
                </div>

                <div className="bg-white rounded shadow-md overflow-hidden">
                    <div className="bg-[#28a745] text-white p-3 font-bold text-sm">All Click Earn Ads List</div>
                    <div className="p-4">
                        <div className="mb-4 flex justify-between items-center text-xs text-gray-500">
                            <div className="flex items-center gap-1">Show <select className="border rounded p-1"><option>10</option></select> entries</div>
                            <div className="flex items-center gap-1">Search: <input type="text" className="border rounded p-1" /></div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="bg-white border-b border-gray-200 text-left text-xs font-bold text-gray-700">
                                        <th className="p-3 border">User</th>
                                        <th className="p-3 border">Title</th>
                                        <th className="p-3 border">Slug</th>
                                        <th className="p-3 border">Waiting Time</th>
                                        <th className="p-3 border">Earning</th>
                                        <th className="p-3 border text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="text-xs text-gray-600">
                                    {loading ? (
                                        <tr><td colSpan="6" className="p-10 text-center">Loading...</td></tr>
                                    ) : ads?.length > 0 ? (
                                        ads.map((ad) => (
                                            <tr key={ad._id} className="hover:bg-gray-50">
                                                <td className="p-3 border">{ad.user?.name || 'N/A'}</td>
                                                <td className="p-3 border underline text-gray-800 font-medium">{ad.title}</td>
                                                <td className="p-3 border text-gray-500 italic">{ad.slug}</td>
                                                <td className="p-3 border">{ad.waitingTime}</td>
                                                <td className="p-3 border">${ad.earning.toFixed(4)}</td>
                                                <td className="p-3 border text-center">
                                                    <div className="flex justify-center">
                                                        <button onClick={() => handleDelete(ad._id)} className="bg-[#dc3545] text-white p-1.5 rounded"><FaTrash size={10} /></button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr><td colSpan="6" className="p-10 text-center">No data available in table</td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        <div className="mt-4 flex justify-between items-center text-xs text-gray-500">
                            <div>Showing {ads.length} entries</div>
                            <div className="flex gap-1">
                                <button className="px-2 py-1 border rounded bg-gray-50">Previous</button>
                                <button className="px-3 py-1 bg-[#007bff] text-white rounded">1</button>
                                <button className="px-2 py-1 border rounded bg-gray-50">Next</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default ClickEarnAdsPage;
