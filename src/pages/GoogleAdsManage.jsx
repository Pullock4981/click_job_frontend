import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/layout/AdminLayout';
import { FaTrash, FaEdit, FaPlus, FaSave, FaTimes } from 'react-icons/fa';
import api from '../services/api';
import { API_ENDPOINTS } from '../config/api';

const GoogleAdsManage = () => {
    const [ads, setAds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingAd, setEditingAd] = useState(null);
    const [formData, setFormData] = useState({ position: '', code: '', status: 'active' });

    useEffect(() => {
        fetchAds();
    }, []);

    const fetchAds = async () => {
        try {
            setLoading(true);
            const response = await api.get(API_ENDPOINTS.GOOGLE_ADS);
            setAds(response.data.data || []);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenModal = (ad = null) => {
        if (ad) {
            setEditingAd(ad);
            setFormData({ position: ad.position, code: ad.code, status: ad.status });
        } else {
            setEditingAd(null);
            setFormData({ position: '', code: '', status: 'active' });
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingAd(null);
        setFormData({ position: '', code: '', status: 'active' });
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            if (editingAd) {
                const response = await api.put(`${API_ENDPOINTS.GOOGLE_ADS}/${editingAd._id}`, formData);
                setAds(ads.map(ad => ad._id === editingAd._id ? response.data.data : ad));
            } else {
                const response = await api.post(API_ENDPOINTS.GOOGLE_ADS, formData);
                setAds([response.data.data, ...ads]);
            }
            handleCloseModal();
        } catch (error) {
            console.error(error);
            alert('Failed to save ad.');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this ad?')) {
            try {
                await api.delete(`${API_ENDPOINTS.GOOGLE_ADS}/${id}`);
                setAds(ads.filter(ad => ad._id !== id));
            } catch (error) {
                console.error(error);
                alert('Failed to delete ad.');
            }
        }
    };

    return (
        <AdminLayout>
            <div className="p-4 md:p-6 bg-[#F4F6F9] min-h-screen">
                <div className="bg-[#28a745] text-white p-4 rounded-t-lg shadow-sm flex justify-between items-center">
                    <h1 className="text-xl font-normal">All Google Ads</h1>
                    <button
                        onClick={() => handleOpenModal()}
                        className="bg-white/20 hover:bg-white/30 text-white px-4 py-1.5 rounded-lg text-sm flex items-center gap-2 transition-all font-bold backdrop-blur-md border border-white/30 shadow-lg"
                    >
                        <FaPlus size={12} /> Add New Ad
                    </button>
                </div>

                <div className="bg-white rounded-b-lg shadow-xl p-6">
                    <div className="mb-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-xs text-gray-500">
                        <div className="flex items-center gap-2">
                            <span>Show</span>
                            <select className="border border-gray-300 rounded px-1.5 py-1 outline-none bg-gray-50">
                                <option>10</option>
                                <option>25</option>
                                <option>50</option>
                            </select>
                            <span>entries</span>
                        </div>
                        <div className="flex items-center gap-2 w-full md:w-auto">
                            <span>Search:</span>
                            <input type="text" className="border border-gray-300 rounded px-3 py-1 outline-none focus:border-[#28a745] transition-colors w-full md:w-48" />
                        </div>
                    </div>

                    <div className="overflow-x-auto rounded-lg border border-gray-100">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-gray-50 text-left text-[14px] font-bold text-gray-700 uppercase tracking-wider">
                                    <th className="p-4 border-b border-gray-200 w-16 text-center">#SL</th>
                                    <th className="p-4 border-b border-gray-200">Position</th>
                                    <th className="p-4 border-b border-gray-200">Code</th>
                                    <th className="p-4 border-b border-gray-200 w-32 text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {loading ? (
                                    <tr>
                                        <td colSpan="4" className="text-center py-16 text-gray-400 italic">
                                            <div className="flex flex-col items-center gap-2">
                                                <div className="w-8 h-8 border-4 border-[#28a745] border-t-transparent rounded-full animate-spin"></div>
                                                Loading Ads...
                                            </div>
                                        </td>
                                    </tr>
                                ) : ads.length > 0 ? (
                                    ads.map((ad, idx) => (
                                        <tr key={ad._id} className="hover:bg-gray-50 transition-colors group">
                                            <td className="p-4 align-middle text-center text-gray-400 font-bold">{idx + 1}</td>
                                            <td className="p-4 align-middle font-bold text-[#2c3e50]">{ad.position}</td>
                                            <td className="p-4 align-middle max-w-md">
                                                <code className="bg-gray-100 p-2 rounded text-[11px] block overflow-x-auto text-[#e83e8c] border border-gray-200">
                                                    {ad.code.substring(0, 100)}{ad.code.length > 100 ? '...' : ''}
                                                </code>
                                            </td>
                                            <td className="p-4 align-middle text-center">
                                                <div className="flex justify-center gap-2">
                                                    <button
                                                        onClick={() => handleOpenModal(ad)}
                                                        className="bg-[#28a745] text-white p-2 rounded-lg hover:bg-green-700 transition-all shadow-md group-hover:scale-110"
                                                        title="Edit"
                                                    >
                                                        <FaEdit size={14} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(ad._id)}
                                                        className="bg-[#dc3545] text-white p-2 rounded-lg hover:bg-red-700 transition-all shadow-md group-hover:scale-110"
                                                        title="Delete"
                                                    >
                                                        <FaTrash size={14} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="text-center py-20 text-gray-500 font-medium">No ads available in table</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Edit/Add Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
                        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in slide-in-from-bottom-8 duration-500">
                            <div className="bg-[#28a745] text-white px-6 py-4 flex justify-between items-center">
                                <h3 className="text-xl font-bold">{editingAd ? 'Edit Ad' : 'Add New Ad'}</h3>
                                <button onClick={handleCloseModal} className="text-white hover:rotate-90 transition-transform bg-white/10 p-2 rounded-full backdrop-blur-md">
                                    <FaTimes />
                                </button>
                            </div>
                            <form onSubmit={handleSave} className="p-6 space-y-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1.5">Position Name</label>
                                    <input
                                        type="text"
                                        value={formData.position}
                                        onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                                        className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-[#28a745] transition-all bg-gray-50"
                                        placeholder="e.g. Header Sidebar"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1.5">Ad Code (HTML/Script)</label>
                                    <textarea
                                        value={formData.code}
                                        onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                                        className="w-full border border-gray-300 rounded-xl px-4 py-2.5 h-40 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-[#28a745] transition-all bg-gray-50 font-mono text-xs"
                                        placeholder="Paste your ad script here..."
                                        required
                                    />
                                </div>
                                <div className="flex justify-end gap-3 pt-4">
                                    <button
                                        type="button"
                                        onClick={handleCloseModal}
                                        className="px-6 py-2.5 border border-gray-300 text-gray-600 rounded-xl hover:bg-gray-100 transition-colors font-bold text-sm"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-8 py-2.5 bg-[#28a745] text-white rounded-xl hover:bg-green-700 transition-all font-bold text-sm shadow-lg shadow-green-500/30 flex items-center gap-2"
                                    >
                                        <FaSave /> {editingAd ? 'Update Ad' : 'Save Ad'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
};

export default GoogleAdsManage;
