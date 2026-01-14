import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/layout/AdminLayout';
import { FaTrash, FaSave } from 'react-icons/fa';
import api from '../services/api';
import { API_ENDPOINTS } from '../config/api';

const ReferralDistributionPage = () => {
    const [settings, setSettings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({ generation: '', percentage: '' });
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            setLoading(true);
            const res = await api.get(API_ENDPOINTS.REFERRAL_SETTINGS);
            setSettings(res.data?.data || []);
        } catch (err) { console.error(err); } finally { setLoading(false); }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setSubmitting(true);
            await api.post(API_ENDPOINTS.REFERRAL_SETTINGS, formData);
            setFormData({ generation: '', percentage: '' });
            fetchSettings();
        } catch (err) { console.error(err); } finally { setSubmitting(false); }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Delete this setting?')) {
            try {
                await api.delete(`${API_ENDPOINTS.REFERRAL_SETTINGS}/${id}`);
                fetchSettings();
            } catch (err) { console.error(err); }
        }
    };

    return (
        <AdminLayout>
            <div className="p-4 md:p-6 bg-[#F4F6F9] min-h-screen">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-xl font-normal text-gray-800">Referred Distibution</h1>
                    <div className="text-xs text-blue-500">Home / All Category</div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    <div className="lg:col-span-8">
                        <div className="bg-white rounded shadow-md overflow-hidden">
                            <div className="bg-[#28a745] text-white p-3 font-bold text-sm">Referred Distibution</div>
                            <div className="p-4">
                                <div className="mb-4 flex flex-wrap justify-between items-center gap-4 text-xs text-gray-500">
                                    <div className="flex items-center gap-1">Show <select className="border rounded p-1"><option>10</option></select> entries</div>
                                    <div className="flex items-center gap-1">Search: <input type="text" className="border rounded p-1" /></div>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full border-collapse">
                                        <thead>
                                            <tr className="bg-white border-b border-gray-200 text-left text-xs font-bold text-gray-700">
                                                <th className="p-3 border w-12 text-center">#</th>
                                                <th className="p-3 border">Generation</th>
                                                <th className="p-3 border">Persentis %</th>
                                                <th className="p-3 border w-24 text-center">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-[11px] text-gray-600">
                                            {loading ? (
                                                <tr><td colSpan="4" className="p-10 text-center uppercase">Loading...</td></tr>
                                            ) : settings?.length > 0 ? (
                                                settings.map((s, idx) => (
                                                    <tr key={s._id} className="hover:bg-gray-50 border-b">
                                                        <td className="p-3 border text-center">{idx + 1}</td>
                                                        <td className="p-3 border font-normal">{s.generation}</td>
                                                        <td className="p-3 border font-normal">{s.percentage}%</td>
                                                        <td className="p-3 border text-center">
                                                            <button onClick={() => handleDelete(s._id)} className="bg-[#dc3545] text-white p-1.5 rounded hover:bg-red-600 shadow-sm">Delete</button>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr><td colSpan="4" className="p-10 text-center uppercase font-bold text-gray-400">No data available in table</td></tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-4">
                        <div className="bg-white rounded shadow-md overflow-hidden">
                            <div className="bg-[#007bff] text-white p-3 font-bold text-sm">Referred Distribution Add</div>
                            <form onSubmit={handleSubmit} className="p-4 space-y-4">
                                <div className="grid grid-cols-1 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold mb-1">Generation</label>
                                        <select
                                            value={formData.generation}
                                            onChange={e => setFormData({ ...formData, generation: e.target.value })}
                                            className="w-full border rounded p-2 text-sm"
                                            required
                                        >
                                            <option value="">Select Generation</option>
                                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                                                <option key={n} value={n}>{n}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold mb-1">Commsision (%)</label>
                                        <input
                                            type="number"
                                            placeholder="Percentage"
                                            value={formData.percentage}
                                            onChange={e => setFormData({ ...formData, percentage: e.target.value })}
                                            className="w-full border rounded p-2 text-sm"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button type="submit" disabled={submitting} className="bg-[#007bff] text-white px-6 py-2 rounded text-xs font-bold shadow-md uppercase">
                                        {submitting ? 'Saving...' : 'Save'}
                                    </button>
                                    <button type="button" onClick={() => setFormData({ generation: '', percentage: '' })} className="bg-[#6c757d] text-white px-6 py-2 rounded text-xs font-bold shadow-md uppercase">
                                        Reset
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default ReferralDistributionPage;
