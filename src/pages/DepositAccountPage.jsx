import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/layout/AdminLayout';
import { FaEdit, FaTrash, FaPlus, FaSave } from 'react-icons/fa';
import api from '../services/api';
import { API_ENDPOINTS } from '../config/api';

const DepositAccountPage = () => {
    const [methods, setMethods] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({ name: '', account: '', guideline: '', status: 'active' });
    const [selectedFile, setSelectedFile] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        fetchMethods();
    }, []);

    const fetchMethods = async () => {
        try {
            setLoading(true);
            const res = await api.get(API_ENDPOINTS.DEPOSIT_METHODS);
            setMethods(res.data?.data || []);
        } catch (err) {
            console.error(err);
            setMethods([]);
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
            const iconUrl = await uploadImage();
            await api.post(API_ENDPOINTS.DEPOSIT_METHODS, { ...formData, icon: iconUrl });
            setFormData({ name: '', account: '', guideline: '', status: 'active' });
            setSelectedFile(null);
            fetchMethods();
        } catch (err) {
            console.error(err);
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Delete this method?')) {
            try {
                await api.delete(`${API_ENDPOINTS.DEPOSIT_METHODS}/${id}`);
                fetchMethods();
            } catch (err) {
                console.error(err);
            }
        }
    };

    return (
        <AdminLayout>
            <div className="p-4 md:p-6 bg-[#F4F6F9] min-h-screen">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-xl font-normal text-gray-800">Deposit Account</h1>
                    <div className="text-xs text-blue-500">Home / All Deposit Account</div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Left Table */}
                    <div className="lg:col-span-8">
                        <div className="bg-white rounded shadow-md overflow-hidden">
                            <div className="bg-[#28a745] text-white p-3 font-bold text-sm">All Deposit Account</div>
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
                                                <th className="p-3 border">Account</th>
                                                <th className="p-3 border">Guideline</th>
                                                <th className="p-3 border">Status</th>
                                                <th className="p-3 border text-center">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-[11px] text-gray-600">
                                            {loading ? (
                                                <tr><td colSpan="7" className="p-10 text-center">Loading...</td></tr>
                                            ) : methods?.length > 0 ? (
                                                methods.map((m, idx) => (
                                                    <tr key={m._id} className="hover:bg-gray-50">
                                                        <td className="p-3 border">{idx + 1}</td>
                                                        <td className="p-3 border">
                                                            {m.icon ? <img src={m.icon} alt="" className="w-8 h-8 object-contain border" /> : <div className="w-8 h-8 bg-gray-100"></div>}
                                                        </td>
                                                        <td className="p-3 border font-bold">{m.name}</td>
                                                        <td className="p-3 border">{m.account}</td>
                                                        <td className="p-3 border max-w-[200px] truncate">{m.guideline}</td>
                                                        <td className="p-3 border text-center">
                                                            <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${m.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                                {m.status}
                                                            </span>
                                                        </td>
                                                        <td className="p-3 border text-center">
                                                            <div className="flex justify-center gap-1">
                                                                <button className="bg-[#28a745] text-white p-1.5 rounded" title="Edit"><FaEdit size={10} /></button>
                                                                <button onClick={() => handleDelete(m._id)} className="bg-[#dc3545] text-white p-1.5 rounded" title="Delete"><FaTrash size={10} /></button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr><td colSpan="7" className="p-10 text-center uppercase">No data available in table</td></tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Form */}
                    <div className="lg:col-span-4">
                        <div className="bg-white rounded shadow-md overflow-hidden">
                            <div className="bg-[#007bff] text-white p-3 font-bold text-sm">New Account</div>
                            <form onSubmit={handleSubmit} className="p-4 space-y-4">
                                <div>
                                    <label className="block text-xs font-bold mb-1">Name</label>
                                    <input type="text" placeholder="Name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full border rounded p-2 text-sm" required />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold mb-1">Account No</label>
                                    <input type="text" placeholder="Account No" value={formData.account} onChange={e => setFormData({ ...formData, account: e.target.value })} className="w-full border rounded p-2 text-sm" required />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold mb-1">Guideline</label>
                                    <textarea placeholder="Guideline" value={formData.guideline} onChange={e => setFormData({ ...formData, guideline: e.target.value })} className="w-full border rounded p-2 text-sm h-32" required></textarea>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold mb-1">Icon</label>
                                    <input type="file" onChange={handleFileChange} className="text-[10px]" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold mb-1">Status</label>
                                    <select value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })} className="w-full border rounded p-2 text-sm">
                                        <option value="active">Active</option>
                                        <option value="inactive">Inactive</option>
                                    </select>
                                </div>
                                <button type="submit" disabled={submitting} className="bg-[#007bff] text-white px-4 py-2 rounded text-xs font-bold flex items-center justify-center w-full gap-1 shadow-md">
                                    <FaSave /> {submitting ? 'Saving...' : 'Save'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default DepositAccountPage;
