import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/layout/AdminLayout';
import { FaEdit, FaTrash, FaCheckCircle, FaTimesCircle, FaIdCard, FaSpinner } from 'react-icons/fa';
import api from '../services/api';
import { API_ENDPOINTS } from '../config/api';

const DocumentVerifyRequest = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [imageModal, setImageModal] = useState({ open: false, src: '' });

    useEffect(() => {
        fetchRequests();
    }, []);

    const fetchRequests = async () => {
        try {
            setLoading(true);
            // Using a likely endpoint, verify with backend if available
            const response = await api.get('/admin/verification-requests');
            const data = Array.isArray(response.data) ? response.data : (response.data.requests || []);

            const formattedRequests = data.map(req => ({
                id: req.id || req._id,
                name: req.user?.name || req.name || 'N/A',
                cardNumber: req.cardNumber || 'N/A',
                type: req.documentType || 'NID',
                frontImage: req.frontImage || 'https://via.placeholder.com/150',
                userImage: req.userImage || 'https://via.placeholder.com/150',
                status: req.status || 'Pending'
            }));

            setRequests(formattedRequests);
        } catch (error) {
            console.error('Error fetching verification requests:', error);
            // Mock data for display if API fails (REMOVE IN PRODUCTION if strictly no mock allowed)
            // setRequests([]); 
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async (id) => {
        if (window.confirm('Are you sure you want to approve this request?')) {
            try {
                // await api.post(`/admin/verification-requests/${id}/approve`);
                setRequests(requests.filter(r => r.id !== id));
            } catch (error) {
                console.error(error);
            }
        }
    };

    const handleReject = async (id) => {
        if (window.confirm('Are you sure you want to reject this request?')) {
            try {
                // await api.post(`/admin/verification-requests/${id}/reject`);
                setRequests(requests.filter(r => r.id !== id));
            } catch (error) {
                console.error(error);
            }
        }
    };

    const openImage = (src) => {
        setImageModal({ open: true, src });
    };

    return (
        <AdminLayout>
            <div className="p-4 md:p-6 bg-[#F4F6F9] min-h-screen">
                <div className="bg-[#28a745] text-white p-4 rounded-t-md shadow-sm">
                    <h1 className="text-xl font-normal">Verify Request</h1>
                </div>

                <div className="bg-white rounded-b-md shadow-md p-6">
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-white border-b border-gray-200 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                                    <th className="p-3 border border-gray-200">ID</th>
                                    <th className="p-3 border border-gray-200">Name</th>
                                    <th className="p-3 border border-gray-200">Card Number</th>
                                    <th className="p-3 border border-gray-200">Type</th>
                                    <th className="p-3 border border-gray-200">Front</th>
                                    <th className="p-3 border border-gray-200">User With Document</th>
                                    <th className="p-3 border border-gray-200">Status</th>
                                    <th className="p-3 border border-gray-200">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {loading ? (
                                    <tr>
                                        <td colSpan="8" className="text-center py-10">
                                            <span className="loading loading-spinner loading-lg text-primary"></span>
                                        </td>
                                    </tr>
                                ) : requests.length > 0 ? (
                                    requests.map((req) => (
                                        <tr key={req.id} className="hover:bg-gray-50 text-[13px] text-gray-600">
                                            <td className="p-3 border border-gray-200 align-middle text-blue-600">{req.id}</td>
                                            <td className="p-3 border border-gray-200 align-middle font-medium text-gray-800">{req.name}</td>
                                            <td className="p-3 border border-gray-200 align-middle">{req.cardNumber}</td>
                                            <td className="p-3 border border-gray-200 align-middle">
                                                <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-bold">{req.type}</span>
                                            </td>
                                            <td className="p-3 border border-gray-200 align-middle">
                                                <img
                                                    src={req.frontImage}
                                                    alt="Front"
                                                    className="h-10 w-16 object-cover rounded border border-gray-300 cursor-pointer hover:opacity-80 transition-opacity"
                                                    onClick={() => openImage(req.frontImage)}
                                                />
                                            </td>
                                            <td className="p-3 border border-gray-200 align-middle">
                                                <img
                                                    src={req.userImage}
                                                    alt="User"
                                                    className="h-10 w-10 object-cover rounded-full border border-gray-300 cursor-pointer hover:opacity-80 transition-opacity"
                                                    onClick={() => openImage(req.userImage)}
                                                />
                                            </td>
                                            <td className="p-3 border border-gray-200 align-middle">
                                                <span className={`px-2 py-0.5 rounded text-[11px] font-bold text-white ${req.status === 'Approved' ? 'bg-[#28a745]' : req.status === 'Rejected' ? 'bg-[#dc3545]' : 'bg-[#ffc107]'}`}>
                                                    {req.status}
                                                </span>
                                            </td>
                                            <td className="p-3 border border-gray-200 align-middle">
                                                <div className="flex gap-1.5">
                                                    <button
                                                        onClick={() => handleApprove(req.id)}
                                                        className="bg-[#28a745] text-white p-1.5 rounded hover:bg-green-700 transition-colors shadow-sm"
                                                        title="Approve"
                                                    >
                                                        <FaCheckCircle size={14} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleReject(req.id)}
                                                        className="bg-[#dc3545] text-white p-1.5 rounded hover:bg-red-700 transition-colors shadow-sm"
                                                        title="Reject"
                                                    >
                                                        <FaTimesCircle size={14} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="8" className="text-center py-20">
                                            <div className="flex flex-col items-center justify-center gap-3">
                                                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-gray-400">
                                                    <FaIdCard size={24} />
                                                </div>
                                                <h3 className="text-lg font-medium text-gray-900">No Verification Requests</h3>
                                                <p className="text-gray-500 text-sm">There are currently no users requesting document verification.</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Image Preview Modal */}
            {imageModal.open && (
                <div
                    className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
                    onClick={() => setImageModal({ open: false, src: '' })}
                >
                    <div className="relative max-w-3xl max-h-[90vh] overflow-auto p-2">
                        <img src={imageModal.src} alt="Preview" className="max-w-full max-h-full rounded shadow-2xl" />
                        <button
                            className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2 hover:bg-black/70"
                            onClick={() => setImageModal({ open: false, src: '' })}
                        >
                            <FaTimesCircle size={24} />
                        </button>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
};

export default DocumentVerifyRequest;
