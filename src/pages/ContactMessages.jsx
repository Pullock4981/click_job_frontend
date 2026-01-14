import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/layout/AdminLayout';
import { FaTrash, FaEnvelopeOpen } from 'react-icons/fa';
import api from '../services/api';
import { API_ENDPOINTS } from '../config/api';

const ContactMessages = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            setLoading(true);
            const response = await api.get(API_ENDPOINTS.CONTACT_MESSAGES);
            setMessages(response.data.data || []);
            setError(null);
        } catch (error) {
            console.error(error);
            setError('Failed to fetch messages.');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this message?')) {
            try {
                await api.delete(`${API_ENDPOINTS.CONTACT_MESSAGES}/${id}`);
                setMessages(messages.filter(msg => msg._id !== id));
            } catch (error) {
                console.error(error);
                alert('Failed to delete message');
            }
        }
    };

    return (
        <AdminLayout>
            <div className="p-4 md:p-6 bg-[#F4F6F9] min-h-screen">
                <div className="bg-[#28a745] text-white p-4 rounded-t-md shadow-sm">
                    <h1 className="text-xl font-normal">Contact Message</h1>
                </div>

                <div className="bg-white rounded-b-md shadow-md p-6">
                    <div className="mb-4 flex justify-between items-center text-xs text-gray-500">
                        <div className="flex items-center gap-2">
                            <span>Show</span>
                            <select className="border border-gray-300 rounded px-1 py-0.5 outline-none">
                                <option>10</option>
                                <option>25</option>
                                <option>50</option>
                            </select>
                            <span>entries</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span>Search:</span>
                            <input type="text" className="border border-gray-300 rounded px-2 py-0.5 outline-none" />
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-white border-b border-gray-200 text-left text-[13px] font-bold text-gray-700 uppercase tracking-wider">
                                    <th className="p-3 border border-gray-200 w-16">#SL</th>
                                    <th className="p-3 border border-gray-200">Name</th>
                                    <th className="p-3 border border-gray-200">Email</th>
                                    <th className="p-3 border border-gray-200">Phone</th>
                                    <th className="p-3 border border-gray-200">Message</th>
                                    <th className="p-3 border border-gray-200 w-20 text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {loading ? (
                                    <tr>
                                        <td colSpan="6" className="text-center py-10 text-gray-400">Loading...</td>
                                    </tr>
                                ) : messages.length > 0 ? (
                                    messages.map((msg, idx) => (
                                        <tr key={msg._id} className="hover:bg-gray-50 text-[13px] text-gray-600 transition-colors">
                                            <td className="p-3 border border-gray-200 align-middle font-bold">{idx + 1}</td>
                                            <td className="p-3 border border-gray-200 align-middle font-medium text-gray-800">{msg.name}</td>
                                            <td className="p-3 border border-gray-200 align-middle text-blue-600 underline decoration-blue-600/30">{msg.email}</td>
                                            <td className="p-3 border border-gray-200 align-middle">{msg.phone || 'N/A'}</td>
                                            <td className="p-3 border border-gray-200 align-middle">
                                                <div className="max-w-xs truncate" title={msg.message}>{msg.message}</div>
                                            </td>
                                            <td className="p-3 border border-gray-200 align-middle text-center">
                                                <div className="flex justify-center gap-1.5">
                                                    <button
                                                        onClick={() => handleDelete(msg._id)}
                                                        className="bg-[#dc3545] text-white p-1.5 rounded hover:bg-red-700 transition-colors shadow-sm"
                                                        title="Delete"
                                                    >
                                                        <FaTrash size={12} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="text-center py-10 text-gray-500 font-medium">No data available in table</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-4 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
                        <div>Showing {messages.length > 0 ? 1 : 0} to {messages.length} of {messages.length} entries</div>
                        <div className="flex items-center">
                            <button className="px-3 py-1 border border-gray-300 rounded-l cursor-not-allowed bg-gray-50">Previous</button>
                            <button className="px-3 py-1 border-y border-r border-gray-300 bg-[#5daae3] text-white">1</button>
                            <button className="px-3 py-1 border-y border-r border-gray-300 rounded-r cursor-not-allowed bg-gray-50">Next</button>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default ContactMessages;
