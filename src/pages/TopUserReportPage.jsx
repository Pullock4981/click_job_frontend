import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/layout/AdminLayout';
import { FaTrash, FaSave } from 'react-icons/fa';
import api from '../services/api';
import { API_ENDPOINTS } from '../config/api';

const TopUserReportPage = ({ type, title, reportEndpoint, columnLabel, columnValueKey, formatValue }) => {
    const [data, setData] = useState([]);
    const [headlines, setHeadlines] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({ title: '', link: '#' });
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        fetchData();
    }, [type]);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [reportRes, headlineRes] = await Promise.all([
                api.get(`${API_ENDPOINTS.TOP_REPORTS}/${reportEndpoint}`),
                api.get(`${API_ENDPOINTS.HEADLINES}?type=${type}`)
            ]);
            setData(reportRes.data?.data || []);
            setHeadlines(headlineRes.data?.data || []);
        } catch (err) { console.error(err); } finally { setLoading(false); }
    };

    const handleHeadlineSubmit = async (e) => {
        e.preventDefault();
        try {
            setSubmitting(true);
            await api.post(API_ENDPOINTS.HEADLINES, { ...formData, type });
            setFormData({ title: '', link: '#' });
            fetchData();
        } catch (err) { console.error(err); } finally { setSubmitting(false); }
    };

    const handleHeadlineDelete = async (id) => {
        if (window.confirm('Delete this headline?')) {
            try {
                await api.delete(`${API_ENDPOINTS.HEADLINES}/${id}`);
                fetchData();
            } catch (err) { console.error(err); }
        }
    };

    return (
        <AdminLayout>
            <div className="p-4 md:p-6 bg-[#F4F6F9] min-h-screen">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-xl font-normal text-gray-800">{title}</h1>
                    <div className="text-xs text-blue-500">Home / All Headline</div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
                    <div className="lg:col-span-8">
                        <div className="bg-white rounded shadow-md overflow-hidden">
                            <div className="bg-[#28a745] text-white p-3 font-bold text-sm">All Headline</div>
                            <div className="p-4">
                                <div className="mb-4 flex flex-wrap justify-between items-center gap-4 text-xs text-gray-500 font-normal">
                                    <div className="flex items-center gap-1">Show <select className="border rounded p-1"><option>10</option></select> entries</div>
                                    <div className="flex items-center gap-1">Search: <input type="text" className="border rounded p-1" /></div>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full border-collapse">
                                        <thead>
                                            <tr className="bg-white border-b border-gray-200 text-left text-[11px] font-bold text-gray-800 uppercase">
                                                <th className="p-3 border text-center w-12">#</th>
                                                <th className="p-3 border">Title</th>
                                                <th className="p-3 border text-center w-24">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-[11px] text-gray-600">
                                            {headlines?.length > 0 ? headlines.map((h, idx) => (
                                                <tr key={h._id} className="hover:bg-gray-50 border-b">
                                                    <td className="p-3 border text-center">{idx + 1}</td>
                                                    <td className="p-3 border">{h.title}</td>
                                                    <td className="p-3 border text-center">
                                                        <button onClick={() => handleHeadlineDelete(h._id)} className="bg-[#dc3545] text-white p-1.5 rounded"><FaTrash size={12} /></button>
                                                    </td>
                                                </tr>
                                            )) : (
                                                <tr><td colSpan="3" className="p-4 text-center text-gray-400">No data available in table</td></tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-4">
                        <div className="bg-white rounded shadow-md overflow-hidden">
                            <div className="bg-[#007bff] text-white p-3 font-bold text-sm">New headline</div>
                            <form onSubmit={handleHeadlineSubmit} className="p-4 space-y-4">
                                <div>
                                    <label className="block text-xs font-bold mb-1 uppercase">Title</label>
                                    <textarea placeholder="Title" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} className="w-full border rounded p-2 text-sm h-32" required></textarea>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold mb-1 uppercase">Link</label>
                                    <input type="text" placeholder="#" value={formData.link} onChange={e => setFormData({ ...formData, link: e.target.value })} className="w-full border rounded p-2 text-sm" />
                                </div>
                                <button type="submit" disabled={submitting} className="bg-[#007bff] text-white px-4 py-2 rounded text-xs font-bold w-full shadow-md">
                                    {submitting ? 'Saving...' : 'Save'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded shadow-md overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-200 text-left text-[11px] font-bold text-gray-800 uppercase">
                                    <th className="p-4 border">Rank</th>
                                    <th className="p-4 border">ID</th>
                                    <th className="p-4 border">USER NAME</th>
                                    <th className="p-4 border">{columnLabel}</th>
                                </tr>
                            </thead>
                            <tbody className="text-[11px] text-gray-600">
                                {loading ? (
                                    <tr><td colSpan="4" className="p-10 text-center uppercase">Loading...</td></tr>
                                ) : data?.length > 0 ? (
                                    data.map((item, idx) => (
                                        <tr key={item._id} className="hover:bg-gray-50 border-b font-medium">
                                            <td className="p-4 border">{idx + 1}</td>
                                            <td className="p-4 border uppercase">{item._id.substring(0, 8)}</td>
                                            <td className="p-4 border font-bold text-gray-700 capitalize">{item.name}</td>
                                            <td className="p-4 border font-bold text-gray-800">
                                                {formatValue ? formatValue(item[columnValueKey]) : item[columnValueKey]}
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
        </AdminLayout>
    );
};

export default TopUserReportPage;
