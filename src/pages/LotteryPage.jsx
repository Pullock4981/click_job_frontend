import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/layout/AdminLayout';
import { FaTrash, FaPlus, FaSave } from 'react-icons/fa';
import api from '../services/api';
import { API_ENDPOINTS } from '../config/api';

const LotteryPage = () => {
    const [lotteries, setLotteries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({ name: '', price: 0, winner: 0, startTime: '', endTime: '', banner: '' });
    const [selectedFile, setSelectedFile] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        fetchLotteries();
    }, []);

    const fetchLotteries = async () => {
        try {
            setLoading(true);
            const res = await api.get(API_ENDPOINTS.LOTTERY);
            setLotteries(res.data?.data || []);
        } catch (err) {
            console.error(err);
            setLotteries([]);
        } finally {
            setLoading(false);
        }
    };

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const uploadImage = async () => {
        if (!selectedFile) return '';
        try {
            const data = new FormData();
            data.append('file', selectedFile);
            const res = await api.post('/upload/single', data);
            return res.data.data.url;
        } catch (err) {
            return '';
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setSubmitting(true);
            const bannerUrl = await uploadImage();
            await api.post(API_ENDPOINTS.LOTTERY, { ...formData, banner: bannerUrl });
            setFormData({ name: '', price: 0, winner: 0, startTime: '', endTime: '', banner: '' });
            setSelectedFile(null);
            fetchLotteries();
        } catch (err) {
            console.error(err);
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Delete this lottery?')) {
            try {
                await api.delete(`${API_ENDPOINTS.LOTTERY}/${id}`);
                fetchLotteries();
            } catch (err) {
                console.error(err);
            }
        }
    };

    return (
        <AdminLayout>
            <div className="p-4 md:p-6 bg-[#F4F6F9] min-h-screen">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-xl font-normal text-gray-800">Lottery</h1>
                    <div className="text-xs text-blue-500">Home / All Lottery</div>
                </div>

                {/* New Lottery Form */}
                <div className="bg-white rounded shadow-md overflow-hidden mb-6">
                    <div className="bg-[#007bff] text-white p-3 font-bold text-sm">New Lottery</div>
                    <form onSubmit={handleSubmit} className="p-6 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold mb-1">Name</label>
                                <input type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full border rounded p-2 text-sm" placeholder="Name" required />
                            </div>
                            <div>
                                <label className="block text-xs font-bold mb-1">Price($)</label>
                                <input type="number" step="0.01" value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} className="w-full border rounded p-2 text-sm" required />
                            </div>
                            <div>
                                <label className="block text-xs font-bold mb-1">Winner</label>
                                <input type="number" value={formData.winner} onChange={e => setFormData({ ...formData, winner: e.target.value })} className="w-full border rounded p-2 text-sm" required />
                            </div>
                            <div>
                                <label className="block text-xs font-bold mb-1">Start Time</label>
                                <input type="datetime-local" value={formData.startTime} onChange={e => setFormData({ ...formData, startTime: e.target.value })} className="w-full border rounded p-2 text-sm" required />
                            </div>
                            <div>
                                <label className="block text-xs font-bold mb-1">End Time</label>
                                <input type="datetime-local" value={formData.endTime} onChange={e => setFormData({ ...formData, endTime: e.target.value })} className="w-full border rounded p-2 text-sm" required />
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-bold mb-1">Banner</label>
                            <input type="file" onChange={handleFileChange} className="w-full text-xs" />
                        </div>
                        <button type="submit" disabled={submitting} className="bg-[#007bff] text-white px-6 py-2 rounded text-xs font-bold shadow-md hover:bg-blue-600 transition-colors">
                            {submitting ? 'Saving...' : 'Save'}
                        </button>
                    </form>
                </div>

                {/* All Lottery List */}
                <div className="bg-white rounded shadow-md overflow-hidden">
                    <div className="bg-[#28a745] text-white p-3 font-bold text-sm">All Lottery</div>
                    <div className="p-4">
                        <div className="mb-4 flex justify-between items-center text-xs text-gray-500">
                            <div className="flex items-center gap-1">Show <select className="border rounded p-1"><option>10</option></select> entries</div>
                            <div className="flex items-center gap-1">Search: <input type="text" className="border rounded p-1" /></div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="bg-white border-b border-gray-200 text-left text-xs font-bold text-gray-700">
                                        <th className="p-3 border">#</th>
                                        <th className="p-3 border">Banner</th>
                                        <th className="p-3 border">Title</th>
                                        <th className="p-3 border text-center">Price ($)</th>
                                        <th className="p-3 border text-center">Winner</th>
                                        <th className="p-3 border">Start Time</th>
                                        <th className="p-3 border">End Time</th>
                                        <th className="p-3 border text-center">Ticket Sold</th>
                                        <th className="p-3 border text-center">Status</th>
                                        <th className="p-3 border text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="text-xs text-gray-600">
                                    {loading ? (
                                        <tr><td colSpan="10" className="p-10 text-center">Loading...</td></tr>
                                    ) : lotteries?.length > 0 ? (
                                        lotteries.map((l, idx) => (
                                            <tr key={l._id} className="hover:bg-gray-50 text-[11px]">
                                                <td className="p-3 border">{idx + 1}</td>
                                                <td className="p-3 border">
                                                    {l.banner ? <img src={l.banner} alt="" className="w-12 h-6 object-cover rounded border" /> : <div className="w-12 h-6 bg-gray-100 border rounded"></div>}
                                                </td>
                                                <td className="p-3 border font-bold">{l.name}</td>
                                                <td className="p-3 border text-center font-bold text-blue-600">{l.price}</td>
                                                <td className="p-3 border text-center">{l.winner}</td>
                                                <td className="p-3 border whitespace-nowrap">{new Date(l.startTime).toLocaleString()}</td>
                                                <td className="p-3 border whitespace-nowrap">{new Date(l.endTime).toLocaleString()}</td>
                                                <td className="p-3 border text-center font-bold">{l.ticketSold}</td>
                                                <td className="p-3 border text-center">
                                                    <span className="capitalize">{l.status}</span>
                                                </td>
                                                <td className="p-3 border text-center">
                                                    <button onClick={() => handleDelete(l._id)} className="bg-[#dc3545] text-white p-1.5 rounded"><FaTrash size={10} /></button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr><td colSpan="10" className="p-10 text-center">No data available in table</td></tr>
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

export default LotteryPage;
