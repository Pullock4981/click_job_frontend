import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/layout/AdminLayout';
import { FaEdit, FaTrash, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import api from '../services/api';
import { API_ENDPOINTS } from '../config/api';

const VerifiedUsers = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    // Modal state
    const [selectedUser, setSelectedUser] = useState(null);
    const [modalType, setModalType] = useState(null);
    const [tempData, setTempData] = useState({});

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const response = await api.get(API_ENDPOINTS.ADMIN_USERS);
            const userData = Array.isArray(response.data) ? response.data : (response.data.users || []);

            const formattedUsers = userData.map(user => ({
                id: user.id || user._id,
                name: user.name || 'N/A',
                email: user.email || 'N/A',
                password: user.password || '******',
                verificationStatus: user.isVerified ? 'Verified' : 'Not Verified',
                bio: user.jobPosted?.bio || 0, // Using numeric bio as seen in AdminUsers
                jobPosted: (user.jobPosted?.jobOver || 0) + (user.jobPosted?.jobPaused || 0), // Approximation
                jobApproveRatio: user.jobApproveRatio || '0%',
                completeTask: user.totalCompletedTasks || 0,
                taskSatisfiedRatio: user.taskSatisfiedRatio || '0%',
                depositBalance: user.depositBalance || 0.0000,
                earningBalance: user.walletBalance || 0.0000,
                status: user.status || (user.isActive ? 'Active' : 'Inactive')
            }));

            // Filter for Verified Users Only
            const verifiedOnly = formattedUsers.filter(u => u.verificationStatus === 'Verified');
            setUsers(verifiedOnly);
            setFilteredUsers(verifiedOnly);
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const results = users.filter(user =>
            (user.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
            (user.email?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
            (user.id?.toString() || '').includes(searchTerm)
        );
        setFilteredUsers(results);
    }, [searchTerm, users]);

    const handleDeleteUser = async (userId) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            try {
                // await api.delete(`/admin/users/${userId}`);
                setUsers(users.filter(u => u.id !== userId));
            } catch (error) {
                console.error(error);
            }
        }
    };

    // Modal Handlers (Reused)
    const openVerificationModal = (user) => {
        setSelectedUser(user);
        setTempData({ verificationStatus: user.verificationStatus });
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

    const handleUpdateVerification = () => {
        const updatedUsers = users.map(u =>
            u.id === selectedUser.id ? { ...u, verificationStatus: tempData.verificationStatus } : u
        );
        // If unverified, remove from list? Maybe keep for now to avoid confusion or specific requirement.
        // Usually verified page should only show verified.
        // If status changed to Not Verified, we should probably remove it from this view.
        if (tempData.verificationStatus !== 'Verified') {
            setUsers(users.filter(u => u.id !== selectedUser.id));
            setFilteredUsers(filteredUsers.filter(u => u.id !== selectedUser.id));
        } else {
            setUsers(updatedUsers);
        }
        closeModal();
    };

    const handleUpdateStatus = () => {
        const updatedUsers = users.map(u =>
            u.id === selectedUser.id ? { ...u, status: tempData.status } : u
        );
        setUsers(updatedUsers);
        closeModal();
    };

    const handleUpdateBalance = (type) => {
        const updatedUsers = users.map(u =>
            u.id === selectedUser.id ? {
                ...u,
                depositBalance: type === 'deposit' ? parseFloat(tempData.depositBalance) : u.depositBalance,
                earningBalance: type === 'earning' ? parseFloat(tempData.earningBalance) : u.earningBalance
            } : u
        );
        setUsers(updatedUsers);
        closeModal();
    };

    return (
        <AdminLayout>
            <div className="p-4 md:p-6 bg-[#F4F6F9] min-h-screen">
                <div className="bg-[#28a745] text-white p-4 rounded-t-md shadow-sm">
                    <h1 className="text-xl font-normal">Verified Users</h1>
                </div>

                <div className="bg-white rounded-b-md shadow-md p-6">
                    <div className="flex justify-end mb-6">
                        <div className="flex w-full md:w-1/3">
                            <input
                                type="text"
                                placeholder="Name or Phone or Email"
                                className="w-full px-4 py-2 border border-r-0 border-gray-300 rounded-l focus:outline-none focus:ring-1 focus:ring-blue-500"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
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
                                    <th className="p-3 border border-gray-200">Password</th>
                                    <th className="p-3 border border-gray-200">Verification Status</th>
                                    <th className="p-3 border border-gray-200">Bio</th>
                                    <th className="p-3 border border-gray-200">Job Posted</th>
                                    <th className="p-3 border border-gray-200">Job Approve Ratio</th>
                                    <th className="p-3 border border-gray-200">Complete Task</th>
                                    <th className="p-3 border border-gray-200">Task Satisfied Ratio</th>
                                    <th className="p-3 border border-gray-200">Deposit Balance</th>
                                    <th className="p-3 border border-gray-200">Earning Balance</th>
                                    <th className="p-3 border border-gray-200">Status</th>
                                    <th className="p-3 border border-gray-200">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {loading ? (
                                    <tr>
                                        <td colSpan="14" className="text-center py-10">
                                            <span className="loading loading-spinner loading-lg text-primary"></span>
                                        </td>
                                    </tr>
                                ) : filteredUsers.length > 0 ? (
                                    filteredUsers.map((user) => (
                                        <tr key={user.id} className="hover:bg-gray-50 text-[13px] text-gray-600">
                                            <td className="p-3 border border-gray-200 align-middle text-blue-600 cursor-pointer hover:underline">{user.id}</td>
                                            <td className="p-3 border border-gray-200 align-middle font-medium text-gray-800">{user.name}</td>
                                            <td className="p-3 border border-gray-200 align-middle">{user.email}</td>
                                            <td className="p-3 border border-gray-200 align-middle">{user.password}</td>
                                            <td className="p-3 border border-gray-200 align-middle">
                                                <div className="flex items-center gap-2">
                                                    <span className={`flex items-center gap-1 font-bold text-[#28a745]`}>
                                                        <FaCheckCircle /> Verified
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="p-3 border border-gray-200 align-middle">{user.bio}</td>
                                            <td className="p-3 border border-gray-200 align-middle">{user.jobPosted}</td>
                                            <td className="p-3 border border-gray-200 align-middle">{user.jobApproveRatio}</td>
                                            <td className="p-3 border border-gray-200 align-middle">{user.completeTask}</td>
                                            <td className="p-3 border border-gray-200 align-middle">{user.taskSatisfiedRatio}</td>
                                            <td className="p-3 border border-gray-200 align-middle">{Number(user.depositBalance).toFixed(4)}</td>
                                            <td className="p-3 border border-gray-200 align-middle">{Number(user.earningBalance).toFixed(4)}</td>
                                            <td className="p-3 border border-gray-200 align-middle">
                                                <div className="flex items-center gap-2">
                                                    <span className={`px-2 py-0.5 rounded-[2px] text-[11px] font-bold text-white ${user.status === 'Active' ? 'bg-[#28a745]' : 'bg-[#ffc107]'}`}>
                                                        {user.status}
                                                    </span>
                                                    <button onClick={() => openStatusModal(user)} className="bg-[#28a745] text-white p-1 rounded hover:bg-green-600 transition-colors">
                                                        <FaEdit size={12} />
                                                    </button>
                                                </div>
                                            </td>
                                            <td className="p-3 border border-gray-200 align-middle">
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
                                        <td colSpan="14" className="text-center py-20">
                                            <div className="flex flex-col items-center justify-center gap-3">
                                                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-gray-400">
                                                    <FaEdit size={24} />
                                                </div>
                                                <h3 className="text-lg font-medium text-gray-900">No Verified Users Found</h3>
                                                <p className="text-gray-500 text-sm">There are currently no verified users in the system.</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Modals */}
            {modalType && (
                <div className="fixed inset-0 z-50 flex items-center justify-start pt-[10vh] justify-center bg-black/50 backdrop-blur-[2px] animate-in fade-in duration-200">
                    <div className="bg-white rounded-lg shadow-2xl w-full max-w-[500px] mx-4 overflow-hidden animate-in zoom-in-95 duration-200">
                        {/* Status Modal */}
                        {modalType === 'status' && (
                            <>
                                <div className="px-6 py-4 border-b flex justify-between items-center">
                                    <h3 className="text-[17px] font-normal text-gray-800">Update User Activity</h3>
                                    <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 font-bold text-xl">&times;</button>
                                </div>
                                <div className="p-6">
                                    <label className="block text-[13px] font-bold text-gray-700 mb-2.5">Status</label>
                                    <select
                                        className="w-full border border-gray-300 rounded-[3px] px-3 py-2 text-[13px] text-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                        value={tempData.status}
                                        onChange={(e) => setTempData({ ...tempData, status: e.target.value })}
                                    >
                                        <option value="Active">Active</option>
                                        <option value="Inactive">Inactive</option>
                                    </select>
                                </div>
                                <div className="px-6 py-4 bg-white border-t border-gray-100 flex justify-end gap-2 rounded-b-lg">
                                    <button onClick={closeModal} className="px-4 py-1.5 bg-[#6c757d] hover:bg-gray-600 text-white rounded-[3px] font-normal text-[13px] transition-colors">Close</button>
                                    <button onClick={handleUpdateStatus} className="px-4 py-1.5 bg-[#007bff] hover:bg-blue-600 text-white rounded-[3px] font-normal text-[13px] transition-colors">Update</button>
                                </div>
                            </>
                        )}

                        {/* Balance Modal */}
                        {modalType === 'balance' && (
                            <>
                                <div className="px-6 py-4 border-b flex justify-between items-center">
                                    <h3 className="text-[17px] font-normal text-[#333]">Update Balance</h3>
                                    <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 font-bold text-xl">&times;</button>
                                </div>
                                <div className="p-6 space-y-5">
                                    <div>
                                        <label className="block text-[13px] font-bold text-[#333] mb-2">Deposit</label>
                                        <input
                                            type="number"
                                            className="w-full border border-gray-300 rounded-[3px] px-3 py-2 text-[13px] focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                            value={tempData.depositBalance}
                                            onChange={(e) => setTempData({ ...tempData, depositBalance: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[13px] font-bold text-[#333] mb-2">Earning</label>
                                        <input
                                            type="number"
                                            className="w-full border border-gray-300 rounded-[3px] px-3 py-2 text-[13px] focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                            value={tempData.earningBalance}
                                            onChange={(e) => setTempData({ ...tempData, earningBalance: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className="px-6 py-4 bg-white border-t border-gray-100 flex justify-end gap-2 rounded-b-lg">
                                    <button onClick={closeModal} className="px-3 py-1.5 bg-[#6c757d] hover:bg-gray-600 text-white rounded-[3px] font-medium text-[13px] transition-colors shadow-sm">Close</button>
                                    <button onClick={() => handleUpdateBalance('deposit')} className="px-3 py-1.5 bg-[#007bff] hover:bg-blue-600 text-white rounded-[3px] font-medium text-[13px] transition-colors shadow-sm">Update Deposit</button>
                                    <button onClick={() => handleUpdateBalance('earning')} className="px-3 py-1.5 bg-[#007bff] hover:bg-blue-600 text-white rounded-[3px] font-medium text-[13px] transition-colors shadow-sm">Update Earning</button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </AdminLayout>
    );
};

export default VerifiedUsers;
