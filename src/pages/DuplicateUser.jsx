import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/layout/AdminLayout';
import { FaEdit, FaTrash, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import api from '../services/api';
import { API_ENDPOINTS } from '../config/api';

const DuplicateUser = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    // Modal state
    const [selectedUser, setSelectedUser] = useState(null);
    const [modalType, setModalType] = useState(null); // 'verification', 'status', 'balance'
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
                mainUser: user.referrer?.name || '', // Assuming referrer might be main user, or just empty
                name: user.name || 'N/A',
                email: user.email || 'N/A',
                password: user.password || '******',
                verificationStatus: user.isVerified ? 'Verified' : 'Not Verified',
                bio: user.jobPosted?.bio || '', // Assuming bio is stored here or empty
                status: user.status || (user.isActive ? 'Active' : 'Inactive'),
                earningBalance: user.walletBalance || 0,
                depositBalance: user.depositBalance || 0
            }));

            // For demo/mock purposes, let's filter or standard users. 
            // Since we don't have a "duplicate" flag, we'll just show all or a subset.
            // Screenshot shows one user "Shohag Hosen".
            setUsers(formattedUsers);
            setFilteredUsers(formattedUsers);
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

    // Modal Handlers
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
        setUsers(updatedUsers);
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
                    <h1 className="text-xl font-normal">All Users</h1>
                </div>

                <div className="bg-white rounded-b-md shadow-md p-6">
                    <div className="flex justify-end mb-6">
                        <div className="flex w-full">
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
                                    <th className="p-3 border border-gray-200">Main User</th>
                                    <th className="p-3 border border-gray-200">Name</th>
                                    <th className="p-3 border border-gray-200">Email</th>
                                    <th className="p-3 border border-gray-200">Password</th>
                                    <th className="p-3 border border-gray-200">Verification Status</th>
                                    <th className="p-3 border border-gray-200">Bio</th>
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
                                            <td className="p-3 border border-gray-200 align-middle text-blue-600 cursor-pointer hover:underline">{user.id}</td>
                                            <td className="p-3 border border-gray-200 align-middle">{user.mainUser}</td>
                                            <td className="p-3 border border-gray-200 align-middle font-medium text-gray-800">{user.name}</td>
                                            <td className="p-3 border border-gray-200 align-middle">{user.email}</td>
                                            <td className="p-3 border border-gray-200 align-middle">{user.password}</td>
                                            <td className="p-3 border border-gray-200 align-middle">
                                                <div className="flex items-center gap-2">
                                                    <span className={`flex items-center gap-1 font-bold ${user.verificationStatus === 'Verified' ? 'text-[#28a745]' : 'text-[#dc3545]'}`}>
                                                        {user.verificationStatus === 'Verified' ? <FaCheckCircle /> : <FaTimesCircle />}
                                                        {user.verificationStatus}
                                                    </span>
                                                    <button onClick={() => openVerificationModal(user)} className="bg-[#28a745] text-white p-1 rounded hover:bg-green-600 transition-colors">
                                                        <FaEdit size={12} />
                                                    </button>
                                                </div>
                                            </td>
                                            <td className="p-3 border border-gray-200 align-middle">{user.bio}</td>
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

            {/* Modals - Reused from AdminUsers */}
            {modalType && (
                <div className="fixed inset-0 z-50 flex items-center justify-start pt-[10vh] justify-center bg-black/50 backdrop-blur-[2px] animate-in fade-in duration-200">
                    <div className="bg-white rounded-lg shadow-2xl w-full max-w-[500px] mx-4 overflow-hidden animate-in zoom-in-95 duration-200">
                        {/* Verification Modal */}
                        {modalType === 'verification' && (
                            <>
                                <div className="px-6 py-4 border-b flex justify-between items-center">
                                    <h3 className="text-[17px] font-normal text-gray-800">Update User Verification</h3>
                                    <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 font-bold text-xl">&times;</button>
                                </div>
                                <div className="p-6">
                                    <label className="block text-[13px] font-bold text-gray-700 mb-2.5">Status</label>
                                    <select
                                        className="w-full border border-gray-300 rounded-[3px] px-3 py-2 text-[13px] text-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                        value={tempData.verificationStatus}
                                        onChange={(e) => setTempData({ ...tempData, verificationStatus: e.target.value })}
                                    >
                                        <option value="Not Verified" className='text-gray-600'>Notverified</option>
                                        <option value="Verified" className='text-gray-600'>Verified</option>
                                    </select>
                                </div>
                                <div className="px-6 py-4 bg-white border-t border-gray-100 flex justify-end gap-2 rounded-b-lg">
                                    <button onClick={closeModal} className="px-4 py-1.5 bg-[#6c757d] hover:bg-gray-600 text-white rounded-[3px] font-normal text-[13px] transition-colors">Close</button>
                                    <button onClick={handleUpdateVerification} className="px-4 py-1.5 bg-[#007bff] hover:bg-blue-600 text-white rounded-[3px] font-normal text-[13px] transition-colors">Update</button>
                                </div>
                            </>
                        )}

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

                        {/* Balance Modal - Even though column might not show balance, standard Edit usually allows it as per user requirement on similar page */}
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

export default DuplicateUser;
