import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/layout/AdminLayout';
import { FaEdit, FaTrash, FaCheck, FaTimes } from 'react-icons/fa';
import api from '../services/api';
import { API_ENDPOINTS } from '../config/api';

const SMMRequestPage = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchRequests();
    }, []);

    const fetchRequests = async () => {
        try {
            setLoading(true);
            const res = await api.get(API_ENDPOINTS.SMM_REQUESTS);
            setRequests(res.data?.data || []);
        } catch (err) { console.error(err); } finally { setLoading(false); }
    };

    const handleStatusUpdate = async (id, status) => {
        const reason = status === 'cancelled' || status === 'refunded' ? window.prompt('Enter reason:') : null;
        try {
            await api.put(`${API_ENDPOINTS.SMM_REQUESTS}/${id}/status`, { status, reason });
            fetchRequests();
        } catch (err) { console.error(err); }
    };

    return (
        <AdminLayout>
            <div className="p-4 md:p-6 bg-[#F4F6F9] min-h-screen">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-xl font-normal text-gray-800">SMM Request List</h1>
                    <div className="text-xs text-blue-500">Home / All SMM Request List</div>
                </div>

                <div className="bg-white rounded shadow-md overflow-hidden">
                    <div className="bg-[#28a745] text-white p-3 font-bold text-sm">All SMM Request List</div>
                    <div className="p-4">
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="bg-white border-b border-gray-200 text-left text-xs font-bold text-gray-700 uppercase">
                                        <th className="p-3 border">ID</th>
                                        <th className="p-3 border">Date Time</th>
                                        <th className="p-3 border">Link</th>
                                        <th className="p-3 border">Charge</th>
                                        <th className="p-3 border">Quantity</th>
                                        <th className="p-3 border">Service</th>
                                        <th className="p-3 border">Reason</th>
                                        <th className="p-3 border text-center">Status</th>
                                        <th className="p-3 border text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="text-[11px] text-gray-600">
                                    {loading ? (
                                        <tr><td colSpan="9" className="p-10 text-center uppercase">Loading...</td></tr>
                                    ) : requests?.length > 0 ? (
                                        requests.map((req, idx) => (
                                            <tr key={req._id} className="hover:bg-gray-50 border-b">
                                                <td className="p-3 border">{idx + 1}</td>
                                                <td className="p-3 border whitespace-nowrap">{new Date(req.createdAt).toLocaleString()}</td>
                                                <td className="p-3 border max-w-[150px] truncate text-blue-600 font-bold"><a href={req.link} target="_blank" rel="noreferrer">{req.link}</a></td>
                                                <td className="p-3 border font-bold text-gray-800">${req.charge?.toFixed(2)}</td>
                                                <td className="p-3 border font-bold text-gray-700">{req.quantity}</td>
                                                <td className="p-3 border font-medium text-blue-700">{req.service?.title}</td>
                                                <td className="p-3 border italic text-red-500">{req.reason || 'N/A'}</td>
                                                <td className="p-3 border text-center">
                                                    <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${req.status === 'completed' ? 'bg-green-100 text-green-700' :
                                                            req.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                                                        }`}>
                                                        {req.status}
                                                    </span>
                                                </td>
                                                <td className="p-3 border text-center">
                                                    <div className="flex justify-center gap-1">
                                                        {req.status === 'pending' && (
                                                            <>
                                                                <button onClick={() => handleStatusUpdate(req._id, 'completed')} className="bg-[#28a745] text-white p-1.5 rounded"><FaCheck size={10} /></button>
                                                                <button onClick={() => handleStatusUpdate(req._id, 'cancelled')} className="bg-[#dc3545] text-white p-1.5 rounded"><FaTimes size={10} /></button>
                                                            </>
                                                        )}
                                                        <button className="bg-[#dc3545] text-white p-1.5 rounded"><FaTrash size={10} /></button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr><td colSpan="9" className="p-10 text-center uppercase font-bold text-gray-400">No data available in table</td></tr>
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

export default SMMRequestPage;
