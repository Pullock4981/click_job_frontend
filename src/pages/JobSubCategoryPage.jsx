import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/layout/AdminLayout';
import { FaTrash, FaEdit } from 'react-icons/fa';
import api from '../services/api';
import { API_ENDPOINTS } from '../config/api';

const JobSubCategoryPage = () => {
    const [subCategories, setSubCategories] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({ category: '', name: '', minCost: 0 });
    const [editingId, setEditingId] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [subRes, catRes] = await Promise.all([
                api.get(API_ENDPOINTS.JOB_SUB_CATEGORIES),
                api.get(API_ENDPOINTS.JOB_CATEGORIES)
            ]);
            setSubCategories(subRes.data?.data || []);
            setCategories(catRes.data?.data || []);
        } catch (err) { console.error(err); } finally { setLoading(false); }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setSubmitting(true);
            if (editingId) {
                await api.put(`${API_ENDPOINTS.JOB_SUB_CATEGORIES}/${editingId}`, formData);
            } else {
                await api.post(API_ENDPOINTS.JOB_SUB_CATEGORIES, formData);
            }
            setFormData({ category: '', name: '', minCost: 0 });
            setEditingId(null);
            fetchData();
        } catch (err) { console.error(err); } finally { setSubmitting(false); }
    };

    const handleEdit = (sub) => {
        setFormData({ category: sub.category._id, name: sub.name, minCost: sub.minCost });
        setEditingId(sub._id);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Delete this sub category?')) {
            try {
                await api.delete(`${API_ENDPOINTS.JOB_SUB_CATEGORIES}/${id}`);
                fetchData();
            } catch (err) { console.error(err); }
        }
    };

    return (
        <AdminLayout>
            <div className="p-4 md:p-6 bg-[#F4F6F9] min-h-screen">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-xl font-normal text-gray-800">Sub Category</h1>
                    <div className="text-xs text-blue-500">Home / All Sub Category</div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    <div className="lg:col-span-8">
                        <div className="bg-white rounded shadow-md overflow-hidden">
                            <div className="bg-[#28a745] text-white p-3 font-bold text-sm">All Sub Category</div>
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
                                                <th className="p-3 border">Name</th>
                                                <th className="p-3 border">Main Category</th>
                                                <th className="p-3 border">Cost</th>
                                                <th className="p-3 border w-24 text-center">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-[11px] text-gray-600">
                                            {loading ? (
                                                <tr><td colSpan="5" className="p-10 text-center uppercase">Loading...</td></tr>
                                            ) : subCategories?.length > 0 ? (
                                                subCategories.map((s, idx) => (
                                                    <tr key={s._id} className="hover:bg-gray-50 border-b">
                                                        <td className="p-3 border text-center">{idx + 1}</td>
                                                        <td className="p-3 border font-normal">{s.name}</td>
                                                        <td className="p-3 border font-normal">{s.category?.name}</td>
                                                        <td className="p-3 border font-normal">{s.minCost}</td>
                                                        <td className="p-3 border text-center">
                                                            <div className="flex justify-center gap-2">
                                                                <button onClick={() => handleEdit(s)} className="bg-[#28a745] text-white p-1.5 rounded hover:bg-green-600"><FaEdit size={12} /></button>
                                                                <button onClick={() => handleDelete(s._id)} className="bg-[#dc3545] text-white p-1.5 rounded hover:bg-red-600"><FaTrash size={12} /></button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr><td colSpan="5" className="p-10 text-center uppercase font-bold text-gray-400">No data available in table</td></tr>
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
                                    <label className="block text-xs font-bold mb-1">Main Category</label>
                                    <select
                                        value={formData.category}
                                        onChange={e => setFormData({ ...formData, category: e.target.value })}
                                        className="w-full border rounded p-2 text-sm"
                                        required
                                    >
                                        <option value="">Select one</option>
                                        {categories.map(c => (
                                            <option key={c._id} value={c._id}>{c.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold mb-1">Name</label>
                                    <input
                                        type="text"
                                        placeholder="Category Name"
                                        value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full border rounded p-2 text-sm"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold mb-1">Minimum Job Cost</label>
                                    <input
                                        type="number"
                                        step="0.001"
                                        placeholder="0"
                                        value={formData.minCost}
                                        onChange={e => setFormData({ ...formData, minCost: e.target.value })}
                                        className="w-full border rounded p-2 text-sm"
                                        required
                                    />
                                </div>
                                <button type="submit" disabled={submitting} className="bg-[#007bff] text-white px-6 py-2 rounded text-xs font-bold shadow-md uppercase">
                                    {submitting ? 'Saving...' : editingId ? 'Update' : 'Save'}
                                </button>
                                {editingId && (
                                    <button type="button" onClick={() => { setEditingId(null); setFormData({ category: '', name: '', minCost: 0 }); }} className="ml-2 bg-gray-500 text-white px-4 py-2 rounded text-xs font-bold shadow-md uppercase">Cancel</button>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default JobSubCategoryPage;
