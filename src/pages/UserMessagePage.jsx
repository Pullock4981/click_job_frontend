import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/layout/AdminLayout';
import { FaTrash, FaPaperPlane } from 'react-icons/fa';
import api from '../services/api';
import { API_ENDPOINTS } from '../config/api';
import { toast } from 'react-hot-toast';

const UserMessagePage = () => {
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({ user: '', message: '' });
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [msgRes, userRes] = await Promise.all([
                api.get(API_ENDPOINTS.ADMIN_MESSAGES),
                api.get('/admin/users?limit=1000') // Basic user fetch for dropdown
            ]);
            setMessages(msgRes.data?.data || []);
            setUsers(userRes.data?.users || []);
        } catch (err) { console.error(err); } finally { setLoading(false); }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.user || !formData.message) return toast.error('Please fill all fields');
        try {
            setSubmitting(true);
            await api.post(API_ENDPOINTS.ADMIN_MESSAGES, formData);
            setFormData({ user: '', message: '' });
            toast.success('Message sent successfully');
            fetchData();
        } catch (err) { console.error(err); toast.error('Failed to send message'); } finally { setSubmitting(false); }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Delete this message log?')) {
            try {
                await api.delete(`${API_ENDPOINTS.ADMIN_MESSAGES}/${id}`);
                fetchData();
            } catch (err) { console.error(err); }
        }
    };

    return (
        <AdminLayout>
            <div className="p-4 md:p-6 bg-[#F4F6F9] min-h-screen">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-xl font-normal text-gray-800">Message</h1>
                    <div className="text-xs text-blue-500">Home / All Message</div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    <div className="lg:col-span-8">
                        <div className="bg-white rounded shadow-md overflow-hidden h-full">
                            <div className="bg-[#28a745] text-white p-3 font-bold text-sm">All Message</div>
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
                                                <th className="p-3 border">To User</th>
                                                <th className="p-3 border">Message</th>
                                                <th className="p-3 border">Date</th>
                                                <th className="p-3 border w-12 text-center">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-[11px] text-gray-600">
                                            {loading ? (
                                                <tr><td colSpan="5" className="p-10 text-center uppercase">Loading...</td></tr>
                                            ) : messages?.length > 0 ? (
                                                messages.map((m, idx) => (
                                                    <tr key={m._id} className="hover:bg-gray-50 border-b align-top">
                                                        <td className="p-3 border text-center">{idx + 1}</td>
                                                        <td className="p-3 border font-normal">
                                                            <div className="font-bold text-red-600">{m.user?.name || 'N/A'}</div>
                                                        </td>
                                                        <td className="p-3 border font-normal max-w-xs">
                                                            <div className="font-bold text-gray-800 uppercase mb-1">BALANCE_UPDATED</div>
                                                            <div className="text-gray-500">{m.message}</div>
                                                        </td>
                                                        <td className="p-3 border font-normal whitespace-nowrap">{new Date(m.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</td>
                                                        <td className="p-3 border text-center">
                                                            <button onClick={() => handleDelete(m._id)} className="bg-[#dc3545] text-white p-2 rounded hover:bg-red-600 shadow-sm"><FaTrash size={12} /></button>
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
                            <div className="bg-[#007bff] text-white p-3 font-bold text-sm">New Message</div>
                            <form onSubmit={handleSubmit} className="p-4 space-y-4">
                                <div>
                                    <label className="block text-xs font-bold mb-1">User *</label>
                                    <select
                                        value={formData.user}
                                        onChange={e => setFormData({ ...formData, user: e.target.value })}
                                        className="w-full border rounded p-2 text-sm focus:outline-none"
                                        required
                                    >
                                        <option value="">Select One</option>
                                        {users.map(u => (
                                            <option key={u._id} value={u._id}>{u.name} ({u.email})</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold mb-1">Message *</label>
                                    <textarea
                                        placeholder="Message"
                                        rows="4"
                                        value={formData.message}
                                        onChange={e => setFormData({ ...formData, message: e.target.value })}
                                        className="w-full border rounded p-2 text-sm focus:outline-none"
                                        required
                                    />
                                </div>
                                <button type="submit" disabled={submitting} className="bg-[#007bff] text-white px-6 py-2 rounded text-xs font-bold shadow-md uppercase">
                                    {submitting ? 'Sending...' : 'Send'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default UserMessagePage;
