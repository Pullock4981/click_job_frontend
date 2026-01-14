import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/layout/AdminLayout';
import { FaTrash } from 'react-icons/fa';
import api from '../services/api';
import { API_ENDPOINTS } from '../config/api';
import { toast } from 'react-hot-toast';

const CustomScriptPage = () => {
    const [scripts, setScripts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({ type: 'Head', script: '' });
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        fetchScripts();
    }, []);

    const fetchScripts = async () => {
        try {
            setLoading(true);
            const res = await api.get(API_ENDPOINTS.CUSTOM_SCRIPTS);
            setScripts(res.data?.data || []);
        } catch (err) { console.error(err); } finally { setLoading(false); }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setSubmitting(true);
            await api.post(API_ENDPOINTS.CUSTOM_SCRIPTS, formData);
            setFormData({ type: 'Head', script: '' });
            toast.success('Script added successfully');
            fetchScripts();
        } catch (err) { console.error(err); toast.error('Failed to add script'); } finally { setSubmitting(false); }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Delete this script?')) {
            try {
                await api.delete(`${API_ENDPOINTS.CUSTOM_SCRIPTS}/${id}`);
                fetchScripts();
            } catch (err) { console.error(err); }
        }
    };

    return (
        <AdminLayout>
            <div className="p-4 md:p-6 bg-[#F4F6F9] min-h-screen">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-xl font-normal text-gray-800">Custom Script</h1>
                    <div className="text-xs text-blue-500">Home / All Custom Script</div>
                </div>

                <div className="bg-white rounded shadow-md overflow-hidden mb-8 border border-gray-100">
                    <div className="bg-[#28a745] text-white p-3 font-bold text-sm">New Script</div>
                    <form onSubmit={handleSubmit} className="p-4 space-y-4">
                        <div>
                            <label className="block text-xs font-bold mb-1">Type</label>
                            <select
                                value={formData.type}
                                onChange={e => setFormData({ ...formData, type: e.target.value })}
                                className="w-full border rounded p-2 text-sm focus:outline-none"
                            >
                                <option value="Head">Head</option>
                                <option value="Footer">Footer</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-bold mb-1">Script</label>
                            <textarea
                                rows="6"
                                placeholder="..."
                                value={formData.script}
                                onChange={e => setFormData({ ...formData, script: e.target.value })}
                                className="w-full border rounded p-2 text-sm font-mono focus:outline-none"
                                required
                            />
                        </div>
                        <div className="text-center">
                            <button type="submit" disabled={submitting} className="bg-[#007bff] text-white px-8 py-2 rounded text-xs font-bold shadow-md uppercase transition-all hover:bg-blue-600">
                                {submitting ? 'Submitting...' : 'Submit'}
                            </button>
                        </div>
                    </form>
                </div>

                <div className="bg-white rounded shadow-md overflow-hidden border border-gray-100">
                    <div className="bg-[#28a745] text-white p-3 font-bold text-sm">All Custom Script</div>
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
                                        <th className="p-3 border">Type</th>
                                        <th className="p-3 border">Script</th>
                                        <th className="p-3 border w-24 text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="text-[11px] text-gray-600">
                                    {loading ? (
                                        <tr><td colSpan="4" className="p-10 text-center uppercase">Loading...</td></tr>
                                    ) : scripts?.length > 0 ? (
                                        scripts.map((s, idx) => (
                                            <tr key={s._id} className="hover:bg-gray-50 border-b align-top">
                                                <td className="p-3 border text-center">{idx + 1}</td>
                                                <td className="p-3 border font-normal">{s.type}</td>
                                                <td className="p-3 border font-normal font-mono break-all max-w-lg">{s.script.substring(0, 100)}{s.script.length > 100 ? '...' : ''}</td>
                                                <td className="p-3 border text-center">
                                                    <button onClick={() => handleDelete(s._id)} className="bg-[#dc3545] text-white p-2 rounded hover:bg-red-600 shadow-sm"><FaTrash size={12} /></button>
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
        </AdminLayout>
    );
};

export default CustomScriptPage;
