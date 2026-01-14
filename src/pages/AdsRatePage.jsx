import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/layout/AdminLayout';
import { FaTrash, FaPlus, FaChevronRight } from 'react-icons/fa';
import api from '../services/api';
import { API_ENDPOINTS } from '../config/api';

const AdsRatePage = () => {
    const [rates, setRates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({ duration: 0, cost: 0 });
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        fetchRates();
    }, []);

    const fetchRates = async () => {
        try {
            setLoading(true);
            const res = await api.get(API_ENDPOINTS.ADS_RATES);
            setRates(res.data?.data || []);
        } catch (err) {
            console.error(err);
            setRates([]);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setSubmitting(true);
            await api.post(API_ENDPOINTS.ADS_RATES, formData);
            setFormData({ duration: 0, cost: 0 });
            fetchRates();
        } catch (err) {
            console.error(err);
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Delete this rate?')) {
            try {
                await api.delete(`${API_ENDPOINTS.ADS_RATES}/${id}`);
                fetchRates();
            } catch (err) {
                console.error(err);
            }
        }
    };

    return (
        <AdminLayout>
            <div className="p-4 md:p-6 bg-[#F4F6F9] min-h-screen">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-xl font-normal text-gray-800">Ads Rate</h1>
                    <div className="text-xs text-blue-500">Home / All Rates</div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Left Form */}
                    <div className="lg:col-span-4">
                        <div className="bg-white rounded shadow-md overflow-hidden">
                            <div className="bg-[#007bff] text-white p-3 font-bold text-sm">New Rate</div>
                            <form onSubmit={handleSubmit} className="p-4 space-y-4">
                                <div>
                                    <label className="block text-xs font-bold mb-1">Duration (Days)</label>
                                    <input type="number" value={formData.duration} onChange={e => setFormData({ ...formData, duration: e.target.value })} className="w-full border rounded p-2 text-sm" required />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold mb-1">Cost</label>
                                    <input type="number" step="0.01" value={formData.cost} onChange={e => setFormData({ ...formData, cost: e.target.value })} className="w-full border rounded p-2 text-sm" required />
                                </div>
                                <button type="submit" disabled={submitting} className="bg-[#28a745] text-white px-4 py-2 rounded text-xs font-bold flex items-center gap-1">
                                    <FaPlus /> {submitting ? 'Submitting...' : 'Submit'}
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Right Table */}
                    <div className="lg:col-span-8">
                        <div className="bg-white rounded shadow-md overflow-hidden">
                            <div className="bg-[#28a745] text-white p-3 font-bold text-sm">All Rates</div>
                            <div className="p-4">
                                <div className="mb-4 flex justify-between items-center text-xs text-gray-500">
                                    <div className="flex items-center gap-1">Show <select className="border rounded p-1"><option>10</option></select> entries</div>
                                    <div className="flex items-center gap-1">Search: <input type="text" className="border rounded p-1" /></div>
                                </div>

                                <div className="overflow-x-auto">
                                    <table className="w-full border-collapse">
                                        <thead>
                                            <tr className="bg-white border-b border-gray-200 text-left text-xs font-bold text-gray-700">
                                                <th className="p-3 border">Duration</th>
                                                <th className="p-3 border">Cost</th>
                                                <th className="p-3 border text-center">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-xs text-gray-600">
                                            {loading ? (
                                                <tr><td colSpan="3" className="p-10 text-center">Loading...</td></tr>
                                            ) : rates?.length > 0 ? (
                                                rates.map((r) => (
                                                    <tr key={r._id} className="hover:bg-gray-50">
                                                        <td className="p-3 border">{r.duration} days</td>
                                                        <td className="p-3 border">{r.cost} $</td>
                                                        <td className="p-3 border text-center">
                                                            <div className="flex justify-center gap-1">
                                                                <button onClick={() => handleDelete(r._id)} className="bg-[#dc3545] text-white p-1.5 rounded"><FaTrash size={10} /></button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr><td colSpan="3" className="p-10 text-center">No data available in table</td></tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="mt-4 flex justify-between items-center text-xs text-gray-500">
                                    <div>Showing {rates.length} entries</div>
                                    <div className="flex gap-1">
                                        <button className="px-2 py-1 border rounded bg-gray-50">Previous</button>
                                        <button className="px-3 py-1 bg-[#007bff] text-white rounded">1</button>
                                        <button className="px-2 py-1 border rounded bg-gray-50">Next</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default AdsRatePage;
