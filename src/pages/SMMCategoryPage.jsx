import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/layout/AdminLayout';
import { FaEdit, FaTrash, FaSave } from 'react-icons/fa';
import api from '../services/api';
import { API_ENDPOINTS } from '../config/api';

const SMMCategoryPage = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({ name: '', status: 'active' });
    const [selectedFile, setSelectedFile] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            setLoading(true);
            const res = await api.get(API_ENDPOINTS.SMM_CATEGORIES);
            setCategories(res.data?.data || []);
        } catch (err) {
            console.error(err);
            setCategories([]);
        } finally {
            setLoading(false);
        }
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
            await api.post(API_ENDPOINTS.SMM_CATEGORIES, { ...formData, icon: iconUrl });
            setFormData({ name: '', status: 'active' });
            setSelectedFile(null);
            fetchCategories();
        } catch (err) { console.error(err); } finally { setSubmitting(false); }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Delete this category?')) {
            try {
                await api.delete(`${API_ENDPOINTS.SMM_CATEGORIES}/${id}`);
                fetchCategories();
            } catch (err) { console.error(err); }
        }
    };

    return (
        <AdminLayout>
            <div className="p-4 md:p-6 bg-[#F4F6F9] min-h-screen">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-xl font-normal text-gray-800">Category</h1>
                    <div className="text-xs text-blue-500">Home / All Category</div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    <div className="lg:col-span-8">
                        <div className="bg-white rounded shadow-md overflow-hidden">
                            <div className="bg-[#28a745] text-white p-3 font-bold text-sm">All Category</div>
                            <div className="p-4">
                                <div className="mb-4 flex flex-wrap justify-between items-center gap-4 text-xs text-gray-500">
                                    <div className="flex items-center gap-1">Show <select className="border rounded p-1"><option>10</option></select> entries</div>
                                    <div className="flex items-center gap-1">Search: <input type="text" className="border rounded p-1" /></div>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full border-collapse">
                                        <thead>
                                            <tr className="bg-white border-b border-gray-200 text-left text-xs font-bold text-gray-700">
                                                <th className="p-3 border">#</th>
                                                <th className="p-3 border">Icon</th>
                                                <th className="p-3 border">Name</th>
                                                <th className="p-3 border text-center">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-[11px] text-gray-600">
                                            {loading ? (
                                                <tr><td colSpan="4" className="p-10 text-center uppercase">Loading...</td></tr>
                                            ) : categories?.length > 0 ? (
                                                categories.map((c, idx) => (
                                                    <tr key={c._id} className="hover:bg-gray-50 uppercase border-b">
                                                        <td className="p-3 border">{idx + 1}</td>
                                                        <td className="p-3 border text-center">
                                                            {c.icon ? <img src={c.icon} alt="" className="w-10 h-10 object-contain mx-auto border" /> : 'ICON'}
                                                        </td>
                                                        <td className="p-3 border font-bold text-gray-700">{c.name}</td>
                                                        <td className="p-3 border text-center">
                                                            <div className="flex justify-center gap-1">
                                                                <button className="bg-[#28a745] text-white p-1.5 rounded"><FaEdit size={12} /></button>
                                                                <button onClick={() => handleDelete(c._id)} className="bg-[#dc3545] text-white p-1.5 rounded"><FaTrash size={12} /></button>
                                                            </div>
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
                            <div className="bg-[#007bff] text-white p-3 font-bold text-sm">New Category</div>
                            <form onSubmit={handleSubmit} className="p-4 space-y-4">
                                <div>
                                    <label className="block text-xs font-bold mb-1">Name</label>
                                    <input type="text" placeholder="Category Name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full border rounded p-2 text-sm" required />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold mb-1">Icon</label>
                                    <div className="flex border rounded overflow-hidden">
                                        <input type="file" onChange={handleFileChange} className="text-[10px] w-full p-1" />
                                    </div>
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

export default SMMCategoryPage;
