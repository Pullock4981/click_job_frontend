import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/layout/AdminLayout';
import { FaEdit, FaTrash, FaSave } from 'react-icons/fa';
import api from '../services/api';
import { API_ENDPOINTS } from '../config/api';

const SMMServicePage = () => {
    const [services, setServices] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({ category: '', title: '', chargePer1000: 0, notice: '', status: 'active' });
    const [selectedFile, setSelectedFile] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [servRes, catRes] = await Promise.all([
                api.get(API_ENDPOINTS.SMM_SERVICES),
                api.get(API_ENDPOINTS.SMM_CATEGORIES)
            ]);
            setServices(servRes.data?.data || []);
            setCategories(catRes.data?.data || []);
        } catch (err) { console.error(err); } finally { setLoading(false); }
    };

    const handleFileChange = (e) => setSelectedFile(e.target.files[0]);

    const uploadImage = async () => {
        if (!selectedFile) return '';
        try {
            const data = new FormData();
            data.append('file', selectedFile);
            const res = await api.post('/upload/single', data);
            return res.data.data.url;
        } catch (err) { return ''; }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setSubmitting(true);
            const iconUrl = await uploadImage();
            await api.post(API_ENDPOINTS.SMM_SERVICES, { ...formData, icon: iconUrl });
            setFormData({ category: '', title: '', chargePer1000: 0, notice: '', status: 'active' });
            setSelectedFile(null);
            fetchData();
        } catch (err) { console.error(err); } finally { setSubmitting(false); }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Delete this service?')) {
            try {
                await api.delete(`${API_ENDPOINTS.SMM_SERVICES}/${id}`);
                fetchData();
            } catch (err) { console.error(err); }
        }
    };

    return (
        <AdminLayout>
            <div className="p-4 md:p-6 bg-[#F4F6F9] min-h-screen">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-xl font-normal text-gray-800">Service</h1>
                    <div className="text-xs text-blue-500">Home / All Service</div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    <div className="lg:col-span-8">
                        <div className="bg-white rounded shadow-md overflow-hidden">
                            <div className="bg-[#28a745] text-white p-3 font-bold text-sm">All Service</div>
                            <div className="p-4">
                                <div className="mb-4 flex flex-wrap justify-between items-center gap-4 text-xs text-gray-500 font-normal">
                                    <div className="flex items-center gap-1">Show <select className="border rounded p-1"><option>10</option></select> entries</div>
                                    <div className="flex items-center gap-1">Search: <input type="text" className="border rounded p-1" /></div>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full border-collapse">
                                        <thead>
                                            <tr className="bg-white border-b border-gray-200 text-left text-xs font-bold text-gray-700">
                                                <th className="p-3 border">#</th>
                                                <th className="p-3 border">Title</th>
                                                <th className="p-3 border">Icon</th>
                                                <th className="p-3 border">Category</th>
                                                <th className="p-3 border text-center">Cost</th>
                                                <th className="p-3 border text-center">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-[11px] text-gray-600">
                                            {loading ? (
                                                <tr><td colSpan="6" className="p-10 text-center uppercase">Loading...</td></tr>
                                            ) : services?.length > 0 ? (
                                                services.map((s, idx) => (
                                                    <tr key={s._id} className="hover:bg-gray-50 uppercase border-b">
                                                        <td className="p-3 border">{idx + 1}</td>
                                                        <td className="p-3 border font-bold text-gray-700">{s.title}</td>
                                                        <td className="p-3 border text-center">
                                                            {s.icon ? <img src={s.icon} alt="" className="w-8 h-8 object-contain mx-auto border" /> : 'ICON'}
                                                        </td>
                                                        <td className="p-3 border font-normal">{s.category?.name || 'N/A'}</td>
                                                        <td className="p-3 border text-center font-bold text-blue-600">${s.chargePer1000}/1000 Work</td>
                                                        <td className="p-3 border text-center">
                                                            <div className="flex justify-center gap-1">
                                                                <button className="bg-[#28a745] text-white p-1.5 rounded"><FaEdit size={12} /></button>
                                                                <button onClick={() => handleDelete(s._id)} className="bg-[#dc3545] text-white p-1.5 rounded"><FaTrash size={12} /></button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr><td colSpan="6" className="p-10 text-center uppercase font-bold text-gray-400">No data available in table</td></tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-4">
                        <div className="bg-white rounded shadow-md overflow-hidden">
                            <div className="bg-[#007bff] text-white p-3 font-bold text-sm">New Service</div>
                            <form onSubmit={handleSubmit} className="p-4 space-y-4">
                                <div>
                                    <label className="block text-xs font-bold mb-1">Category</label>
                                    <select value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} className="w-full border rounded p-2 text-sm" required>
                                        <option value="">Select One</option>
                                        {categories.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold mb-1">Title</label>
                                    <input type="text" placeholder="Title" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} className="w-full border rounded p-2 text-sm" required />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold mb-1">Charge Per 1000 Work</label>
                                    <input type="number" step="0.01" value={formData.chargePer1000} onChange={e => setFormData({ ...formData, chargePer1000: e.target.value })} className="w-full border rounded p-2 text-sm" required />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold mb-1">Notice</label>
                                    <textarea placeholder="Notice" value={formData.notice} onChange={e => setFormData({ ...formData, notice: e.target.value })} className="w-full border rounded p-2 text-sm h-24"></textarea>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold mb-1">Icon</label>
                                    <input type="file" onChange={handleFileChange} className="text-[10px] w-full p-1 border rounded" />
                                </div>
                                <button type="submit" disabled={submitting} className="bg-[#007bff] text-white px-4 py-2 rounded text-xs font-bold w-full shadow-md uppercase">
                                    {submitting ? 'Saving...' : 'Save'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default SMMServicePage;
