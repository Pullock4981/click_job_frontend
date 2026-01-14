import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/layout/AdminLayout';
import { FaCheck, FaTimes, FaTrash } from 'react-icons/fa';
import api from '../services/api';
import { API_ENDPOINTS } from '../config/api';

const WithdrawListPage = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchRequests();
    }, []);

    const fetchRequests = async () => {
        try {
            setLoading(true);
            const res = await api.get(API_ENDPOINTS.WITHDRAW_LIST);
            setRequests(res.data?.data || []);
        } catch (err) {
            console.error(err);
            setRequests([]);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (id, status) => {
        if (window.confirm(`Are you sure to ${status} this request?`)) {
            try {
                await api.put(`${API_ENDPOINTS.TRANSACTION_STATUS}/${id}/status`, { status });
                fetchRequests();
            } catch (err) {
                console.error(err);
            }
        }
    };

    return (
        <AdminLayout>
            <div className="p-4 md:p-6 bg-[#F4F6F9] min-h-screen">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-xl font-normal text-gray-800">Withdraw Request</h1>
                    <div className="text-xs text-blue-500 lowercase">Home / All Withdraw Request</div>
                </div>

                <div className="bg-white rounded shadow-md overflow-hidden">
                    <div className="bg-[#28a745] text-white p-3 font-bold text-sm">All Withdraw Request</div>
                    <div className="p-4 text-[11px] text-gray-600">
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="bg-white border-b border-gray-200 text-left text-xs font-bold text-gray-700">
                                        <th className="p-3 border">#</th>
                                        <th className="p-3 border">User</th>
                                        <th className="p-3 border">Amount</th>
                                        <th className="p-3 border">Charge</th>
                                        <th className="p-3 border">Type</th>
                                        <th className="p-3 border">Account</th>
                                        <th className="p-3 border">Admin Fee</th>
                                        <th className="p-3 border">Date Time</th>
                                        <th className="p-3 border text-center">Status</th>
                                        <th className="p-3 border text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {loading ? (
                                        <tr><td colSpan="10" className="p-10 text-center font-bold">Loading...</td></tr>
                                    ) : requests?.length > 0 ? (
                                        requests.map((req, idx) => (
                                            <tr key={req._id} className="hover:bg-gray-50 border-b">
                                                <td className="p-3 border">{idx + 1}</td>
                                                <td className="p-3 border">
                                                    <div className="font-bold text-blue-600 uppercase">{req.user?.name}</div>
                                                    <div className="text-[9px] text-gray-400">{req.user?._id?.substring(0, 8)}</div>
                                                </td>
                                                <td className="p-3 border font-bold">{req.amount.toFixed(2)}</td>
                                                <td className="p-3 border">{req.metadata?.charge?.toFixed(2) || '0.00'} $</td>
                                                <td className="p-3 border uppercase">{req.metadata?.method || 'N/A'}</td>
                                                <td className="p-3 border font-bold text-gray-700">{req.metadata?.account || 'N/A'}</td>
                                                <td className="p-3 border text-center">10%</td>
                                                <td className="p-3 border whitespace-nowrap">{new Date(req.createdAt).toLocaleString()}</td>
                                                <td className="p-3 border text-center">
                                                    <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${req.status === 'completed' ? 'bg-green-100 text-green-700' :
                                                            req.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                                                        }`}>
                                                        {req.status === 'completed' ? 'Paid' : req.status}
                                                    </span>
                                                </td>
                                                <td className="p-3 border text-center">
                                                    <div className="flex justify-center gap-1">
                                                        {req.status === 'pending' && (
                                                            <>
                                                                <button onClick={() => handleStatusUpdate(req._id, 'completed')} className="bg-[#28a745] text-white p-1.5 rounded" title="Approve"><FaCheck size={10} /></button>
                                                                <button onClick={() => handleStatusUpdate(req._id, 'failed')} className="bg-[#dc3545] text-white p-1.5 rounded" title="Reject"><FaTimes size={10} /></button>
                                                            </>
                                                        )}
                                                        <button className="bg-[#dc3545] text-white p-1.5 rounded" title="Delete"><FaTrash size={10} /></button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr><td colSpan="10" className="p-10 text-center uppercase font-bold text-gray-400">No withdrawal requests found</td></tr>
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

export default WithdrawListPage;
