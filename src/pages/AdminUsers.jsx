import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/layout/AdminLayout';
import { FaEdit, FaTrash, FaCheckCircle, FaTimesCircle, FaSearch, FaUserEdit, FaPowerOff } from 'react-icons/fa';
import api from '../services/api';
import { API_ENDPOINTS } from '../config/api';
import { toast } from 'react-hot-toast';

const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const response = await api.get(API_ENDPOINTS.ADMIN_USERS);
            const userData = Array.isArray(response.data?.users) ? response.data.users : (Array.isArray(response.data) ? response.data : []);

            const formattedUsers = userData.map(user => ({
                id: user._id,
                numericId: user.numericId || 'N/A',
                name: user.name || 'N/A',
                email: user.email || 'N/A',
                verificationStatus: user.isVerified ? 'Verified' : 'Not Verified',
                jobPosted: {
                    bio: user.bio || '',
                    jobOver: user.completedJobs || 0,
                    jobPaused: 0
                },
                jobApproveRatio: '0%',
                completeTask: user.completedJobs || 0,
                lastTask: null,
                taskSatisfiedRatio: '0%',
                depositBalance: user.depositBalance || 0,
                earningBalance: user.earningBalance || 0,
                status: user.status || 'active'
            }));

            setUsers(formattedUsers);
            setFilteredUsers(formattedUsers);
        } catch (error) {
            console.error('Error fetching users:', error);
            toast.error('Failed to fetch users');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const results = users.filter(user =>
            (user.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
            (user.email?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
            (user.numericId?.toString() || '').includes(searchTerm)
        );
        setFilteredUsers(results);
    }, [searchTerm, users]);

    const handleSearchCheck = (e) => {
        setSearchTerm(e.target.value);
    };

    const [selectedUser, setSelectedUser] = useState(null);
    const [modalType, setModalType] = useState(null);
    const [tempData, setTempData] = useState({});

    const openVerificationModal = (user) => {
        setSelectedUser(user);
        setTempData({ isVerified: user.verificationStatus === 'Verified' });
        setModalType('verification');
    };

    const openStatusModal = (user) => {
        setSelectedUser(user);
        setTempData({ status: user.status });
        setModalType('status');
    };

    const openBalanceModal = (user) => {
        setSelectedUser(user);
        setTempData({
            depositBalance: user.depositBalance,
            earningBalance: user.earningBalance
        });
        setModalType('balance');
    };

    const closeModal = () => {
        setModalType(null);
        setSelectedUser(null);
        setTempData({});
    };

    const handleUpdateVerification = async () => {
        try {
            const res = await api.put(`${API_ENDPOINTS.ADMIN_USERS}/${selectedUser.id}`, { isVerified: tempData.isVerified });
            if (res.success) {
                toast.success('Verification status updated');
                fetchUsers();
                closeModal();
            }
        } catch (error) {
            toast.error(error.message || 'Update failed');
        }
    };

    const handleUpdateStatus = async () => {
        try {
            const res = await api.put(`${API_ENDPOINTS.ADMIN_USERS}/${selectedUser.id}`, { status: tempData.status.toLowerCase() });
            if (res.success) {
                toast.success('User status updated');
                fetchUsers();
                closeModal();
            }
        } catch (error) {
            toast.error(error.message || 'Update failed');
        }
    };

    const handleUpdateBalance = async (type) => {
        try {
            const payload = {};
            if (type === 'deposit') payload.depositBalance = parseFloat(tempData.depositBalance);
            if (type === 'earning') payload.earningBalance = parseFloat(tempData.earningBalance);

            const res = await api.put(`${API_ENDPOINTS.ADMIN_USERS}/${selectedUser.id}`, payload);
            if (res.success) {
                toast.success('Balance updated');
                fetchUsers();
                closeModal();
            }
        } catch (error) {
            toast.error(error.message || 'Update failed');
        }
    };

    const handleDeleteUser = async (userId) => {
        if (window.confirm("Are you sure you want to delete this user? This action cannot be undone.")) {
            try {
                const res = await api.delete(`${API_ENDPOINTS.ADMIN_USERS}/${userId}`);
                if (res.success) {
                    toast.success('User deleted');
                    fetchUsers();
                }
            } catch (error) {
                toast.error(error.message || 'Delete failed');
            }
        }
    };

    return (
        <AdminLayout>
            <div className="p-4 md:p-6 bg-[#F4F6F9] min-h-screen">
                <div className="bg-[#28a745] text-white p-4 rounded-t-md shadow-sm">
                    <h1 className="text-xl font-normal">All Users</h1>
                </div>

                <div className="bg-white rounded-b-md shadow-md p-6">
                    <div className="flex justify-end mb-6">
                        <div className="flex w-full md:w-1/3">
                            <input
                                type="text"
                                placeholder="Name or Email or ID"
                                className="w-full px-4 py-2 border border-r-0 border-gray-300 rounded-l focus:outline-none focus:ring-1 focus:ring-blue-500"
                                value={searchTerm}
                                onChange={handleSearchCheck}
                            />
                            <button className="bg-[#007bff] text-white px-6 py-2 rounded-r font-medium hover:bg-blue-600 transition-colors">
                                Search
                            </button>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-white border-b border-gray-200 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                                    <th className="p-3 border border-gray-200">ID</th>
                                    <th className="p-3 border border-gray-200">Name</th>
                                    <th className="p-3 border border-gray-200">Email</th>
                                    <th className="p-3 border border-gray-200">Verification Status</th>
                                    <th className="p-3 border border-gray-200">Job Posted</th>
                                    <th className="p-3 border border-gray-200">Deposit Balance</th>
                                    <th className="p-3 border border-gray-200">Earning Balance</th>
                                    <th className="p-3 border border-gray-200">Status</th>
                                    <th className="p-3 border border-gray-200">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {loading ? (
                                    <tr>
                                        <td colSpan="9" className="text-center py-10">
                                            <span className="loading loading-spinner loading-lg text-primary"></span>
                                        </td>
                                    </tr>
                                ) : filteredUsers.length > 0 ? (
                                    filteredUsers.map((user) => (
                                        <tr key={user.id} className="hover:bg-gray-50 text-[13px] text-gray-600">
                                            <td className="p-3 border border-gray-200 font-medium align-top">{user.numericId}</td>
                                            <td className="p-3 font-medium text-gray-800 align-top">{user.name}</td>
                                            <td className="p-3 border border-gray-200 align-top">{user.email}</td>

                                            <td className="p-3 border border-gray-200 align-top">
                                                <div className="flex flex-col items-start gap-1">
                                                    <span className={`flex items-center gap-1 font-bold ${user.verificationStatus === 'Verified' ? 'text-[#28a745]' : 'text-[#dc3545]'}`}>
                                                        {user.verificationStatus === 'Verified' ? <FaCheckCircle /> : <FaTimesCircle />}
                                                        {user.verificationStatus}
                                                    </span>
                                                    <button
                                                        onClick={() => openVerificationModal(user)}
                                                        className="bg-[#28a745] text-white p-1.5 rounded hover:bg-green-600 transition-colors"
                                                        title="Edit Verification"
                                                    >
                                                        <FaEdit size={12} />
                                                    </button>
                                                </div>
                                            </td>

                                            <td className="p-3 border border-gray-200 align-top">
                                                <div className="flex flex-col gap-1 text-[11px] font-medium min-w-[80px]">
                                                    <span className="text-gray-500">Job Over</span>
                                                    <span>{user.jobPosted.jobOver}</span>
                                                </div>
                                            </td>

                                            <td className="p-3 border border-gray-200 align-top">
                                                <div className="flex flex-col gap-1 min-w-[100px]">
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-gray-700 font-medium">{Number(user.depositBalance).toFixed(4)}</span>
                                                        <button onClick={() => openBalanceModal(user)} className="text-[#28a745] hover:text-green-700" title="Update Balance">
                                                            <FaEdit size={12} />
                                                        </button>
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="p-3 border border-gray-200 align-top">
                                                <div className="flex flex-col gap-1 min-w-[100px]">
                                                    <span className="text-gray-700 font-medium">{Number(user.earningBalance).toFixed(4)}</span>
                                                </div>
                                            </td>

                                            <td className="p-3 border border-gray-200 align-top">
                                                <div className="flex flex-col items-start gap-1">
                                                    <span className={`px-2 py-0.5 rounded text-[11px] font-bold text-white capitalize ${user.status === 'active' ? 'bg-[#28a745]' : 'bg-[#ffc107]'}`}>
                                                        {user.status}
                                                    </span>
                                                    <button
                                                        onClick={() => openStatusModal(user)}
                                                        className="bg-[#28a745] text-white p-1.5 rounded hover:bg-green-600 transition-colors mt-1"
                                                        title="Edit Status"
                                                    >
                                                        <FaEdit size={12} />
                                                    </button>
                                                </div>
                                            </td>

                                            <td className="p-3 border border-gray-200 align-top">
                                                <div className="flex gap-1.5">
                                                    <button
                                                        onClick={() => handleDeleteUser(user.id)}
                                                        className="bg-[#dc3545] text-white w-8 h-8 flex items-center justify-center rounded-[4px] hover:bg-red-700 transition-colors shadow-sm"
                                                        title="Delete"
                                                    >
                                                        <FaTrash size={13} />
                                                    </button>
                                                    <button
                                                        onClick={() => openBalanceModal(user)}
                                                        className="bg-[#28a745] text-white w-8 h-8 flex items-center justify-center rounded-[4px] hover:bg-green-700 transition-colors shadow-sm"
                                                        title="Edit"
                                                    >
                                                        <FaEdit size={14} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="9" className="text-center py-6 text-gray-500">
                                            No users found matching "{searchTerm}"
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {modalType && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-[2px]">
                    <div className="bg-white rounded-lg shadow-2xl w-full max-w-[500px] mx-4 overflow-hidden">
                        {modalType === 'verification' && (
                            <>
                                <div className="px-6 py-4 border-b flex justify-between items-center">
                                    <h3 className="text-[17px] font-normal text-gray-800">Update User Verification</h3>
                                    <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 font-bold text-xl">&times;</button>
                                </div>
                                <div className="p-6">
                                    <label className="block text-[13px] font-bold text-gray-700 mb-2.5">Status</label>
                                    <select
                                        className="w-full border border-gray-300 rounded-[3px] px-3 py-2 text-[13px] text-gray-600 focus:outline-none focus:border-blue-500"
                                        value={tempData.isVerified}
                                        onChange={(e) => setTempData({ ...tempData, isVerified: e.target.value === 'true' })}
                                    >
                                        <option value="false">Not Verified</option>
                                        <option value="true">Verified</option>
                                    </select>
                                </div>
                                <div className="px-6 py-4 bg-white border-t border-gray-100 flex justify-end gap-2 rounded-b-lg">
                                    <button onClick={closeModal} className="px-4 py-1.5 bg-[#6c757d] text-white rounded-[3px] font-normal text-[13px]">Close</button>
                                    <button onClick={handleUpdateVerification} className="px-4 py-1.5 bg-[#007bff] text-white rounded-[3px] font-normal text-[13px]">Update</button>
                                </div>
                            </>
                        )}

                        {modalType === 'status' && (
                            <>
                                <div className="px-6 py-4 border-b flex justify-between items-center">
                                    <h3 className="text-[17px] font-normal text-gray-800">Update User Activity</h3>
                                    <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 font-bold text-xl">&times;</button>
                                </div>
                                <div className="p-6">
                                    <label className="block text-[13px] font-bold text-gray-700 mb-2.5">Status</label>
                                    <select
                                        className="w-full border border-gray-300 rounded-[3px] px-3 py-2 text-[13px] text-gray-600 focus:outline-none focus:border-blue-500"
                                        value={tempData.status}
                                        onChange={(e) => setTempData({ ...tempData, status: e.target.value })}
                                    >
                                        <option value="active">Active</option>
                                        <option value="inactive">Inactive</option>
                                        <option value="suspended">Suspended</option>
                                    </select>
                                </div>
                                <div className="px-6 py-4 bg-white border-t border-gray-100 flex justify-end gap-2 rounded-b-lg">
                                    <button onClick={closeModal} className="px-4 py-1.5 bg-[#6c757d] text-white rounded-[3px] font-normal text-[13px]">Close</button>
                                    <button onClick={handleUpdateStatus} className="px-4 py-1.5 bg-[#007bff] text-white rounded-[3px] font-normal text-[13px]">Update</button>
                                </div>
                            </>
                        )}

                        {modalType === 'balance' && (
                            <>
                                <div className="px-6 py-4 border-b flex justify-between items-center">
                                    <h3 className="text-[17px] font-normal text-[#333]">Update Balance</h3>
                                    <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 font-bold text-xl">&times;</button>
                                </div>
                                <div className="p-6 space-y-5">
                                    <div>
                                        <label className="block text-[13px] font-bold text-[#333] mb-2">Deposit Balance</label>
                                        <input
                                            type="number"
                                            className="w-full border border-gray-300 rounded-[3px] px-3 py-2 text-[13px] focus:outline-none focus:border-blue-500"
                                            value={tempData.depositBalance}
                                            onChange={(e) => setTempData({ ...tempData, depositBalance: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[13px] font-bold text-[#333] mb-2">Earning Balance</label>
                                        <input
                                            type="number"
                                            className="w-full border border-gray-300 rounded-[3px] px-3 py-2 text-[13px] focus:outline-none focus:border-blue-500"
                                            value={tempData.earningBalance}
                                            onChange={(e) => setTempData({ ...tempData, earningBalance: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className="px-6 py-4 bg-white border-t border-gray-100 flex justify-end gap-2 rounded-b-lg">
                                    <button onClick={closeModal} className="px-3 py-1.5 bg-[#6c757d] text-white rounded-[3px] font-medium text-[13px]">Close</button>
                                    <button onClick={() => handleUpdateBalance('deposit')} className="px-3 py-1.5 bg-[#007bff] text-white rounded-[3px] font-medium text-[13px]">Update Deposit</button>
                                    <button onClick={() => handleUpdateBalance('earning')} className="px-3 py-1.5 bg-[#007bff] text-white rounded-[3px] font-medium text-[13px]">Update Earning</button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </AdminLayout>
    );
};

export default AdminUsers;
