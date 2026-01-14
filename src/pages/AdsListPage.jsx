import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/layout/AdminLayout';
import { FaEdit, FaTrash, FaCheck, FaTimes } from 'react-icons/fa';
import api from '../services/api';
import { API_ENDPOINTS } from '../config/api';

const AdsListPage = () => {
    const [ads, setAds] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAds();
    }, []);

    const fetchAds = async () => {
        try {
            setLoading(true);
            const res = await api.get('/advertisements/all');
            setAds(res.data?.data?.advertisements || []);
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
                await api.delete(`${API_ENDPOINTS.ADVERTISEMENTS}/${id}`);
                fetchAds();
            } catch (err) {
                console.error(err);
            }
        }
    };

    const handleStatusUpdate = async (id, status) => {
        try {
            await api.put(`${API_ENDPOINTS.ADVERTISEMENTS}/${id}`, { status });
            fetchAds();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <AdminLayout>
            <div className="p-4 md:p-6 bg-[#F4F6F9] min-h-screen">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-xl font-normal text-gray-800">Ads List</h1>
                    <div className="text-xs text-blue-500">Home / All Ads List</div>
                </div>

                <div className="bg-white rounded shadow-md overflow-hidden">
                    <div className="bg-[#28a745] text-white p-3 font-bold text-sm">All Ads List</div>
                    <div className="p-4">
                        <div className="mb-4 flex flex-wrap justify-between items-center gap-4 text-xs text-gray-500">
                            <div className="flex items-center gap-1">Show <select className="border rounded p-1"><option>100</option></select> entries</div>
                            <div className="flex items-center gap-1">Search: <input type="text" className="border rounded p-1" /></div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="bg-white border-b border-gray-200 text-left text-xs font-bold text-gray-700">
                                        <th className="p-3 border">#</th>
                                        <th className="p-3 border">User</th>
                                        <th className="p-3 border">Banner</th>
                                        <th className="p-3 border">Title</th>
                                        <th className="p-3 border">Link</th>
                                        <th className="p-3 border">Post Date</th>
                                        <th className="p-3 border">Exp Date</th>
                                        <th className="p-3 border">Duration</th>
                                        <th className="p-3 border">Cost</th>
                                        <th className="p-3 border">Status</th>
                                        <th className="p-3 border text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="text-xs text-gray-600">
                                    {loading ? (
                                        <tr><td colSpan="11" className="p-10 text-center">Loading...</td></tr>
                                    ) : ads?.length > 0 ? (
                                        ads.map((ad, idx) => (
                                            <tr key={ad._id} className="hover:bg-gray-50">
                                                <td className="p-3 border">{idx + 1}</td>
                                                <td className="p-3 border font-bold">{ad.createdBy?.name || 'N/A'}</td>
                                                <td className="p-3 border">
                                                    <img src={ad.image} alt="" className="w-12 h-6 object-cover rounded border" />
                                                </td>
                                                <td className="p-3 border font-medium">{ad.title}</td>
                                                <td className="p-3 border max-w-[150px] truncate underline text-blue-500">{ad.link}</td>
                                                <td className="p-3 border">{new Date(ad.startDate).toLocaleDateString()}</td>
                                                <td className="p-3 border">{ad.endDate ? new Date(ad.endDate).toLocaleDateString() : 'Lifetime'}</td>
                                                <td className="p-3 border">{ad.duration} Days</td>
                                                <td className="p-3 border">{ad.cost} $</td>
                                                <td className="p-3 border text-center">
                                                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${ad.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                        {ad.status}
                                                    </span>
                                                </td>
                                                <td className="p-3 border text-center">
                                                    <div className="flex justify-center gap-1">
                                                        <button onClick={() => handleDelete(ad._id)} className="bg-[#dc3545] text-white p-1.5 rounded" title="Delete"><FaTrash size={10} /></button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr><td colSpan="11" className="p-10 text-center">No data available in table</td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default AdsListPage;
