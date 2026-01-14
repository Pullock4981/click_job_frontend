import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/layout/AdminLayout';
import { FaSearch, FaUser } from 'react-icons/fa';
import api from '../services/api';
import { API_ENDPOINTS } from '../config/api';

const PremiumUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const res = await api.get(API_ENDPOINTS.PREMIUM_USERS);
            setUsers(res.data?.data || []);
        } catch (err) {
            console.error(err);
            setUsers([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AdminLayout>
            <div className="p-4 md:p-6 bg-[#F4F6F9] min-h-screen">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-xl font-normal text-gray-800">User</h1>
                    <div className="text-xs text-blue-500">Home / All Users</div>
                </div>

                <div className="bg-white rounded shadow-md overflow-hidden">
                    <div className="bg-[#28a745] text-white p-3 font-bold text-sm">All Users</div>
                    <div className="p-4">
                        <div className="mb-6 flex gap-2">
                            <input
                                type="text"
                                placeholder="Name or Phone or Email"
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                                className="flex-1 border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                            <button className="bg-[#007bff] text-white px-6 py-2 rounded text-sm font-bold flex items-center gap-2">
                                <FaSearch /> Search
                            </button>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="bg-white border-b border-gray-200 text-left text-xs font-bold text-gray-700">
                                        <th className="p-3 border">ID</th>
                                        <th className="p-3 border">Name</th>
                                        <th className="p-3 border">Email</th>
                                        <th className="p-3 border">Verification Status</th>
                                        <th className="p-3 border">Job Posted</th>
                                        <th className="p-3 border">Job Approve Ratio</th>
                                        <th className="p-3 border">Complete Task</th>
                                        <th className="p-3 border">Task Satisfied Ratio</th>
                                        <th className="p-3 border text-center">Deposit Balance</th>
                                        <th className="p-3 border text-center">Earning Balance</th>
                                        <th className="p-3 border text-center">Status</th>
                                        <th className="p-3 border text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="text-[11px] text-gray-600">
                                    {loading ? (
                                        <tr><td colSpan="12" className="p-10 text-center">Loading...</td></tr>
                                    ) : users?.length > 0 ? (
                                        users.map((sub, idx) => (
                                            <tr key={sub._id} className="hover:bg-gray-50 uppercase">
                                                <td className="p-3 border">{idx + 1}</td>
                                                <td className="p-3 border font-bold text-blue-600">{sub.user?.name}</td>
                                                <td className="p-3 border lowercase">{sub.user?.email}</td>
                                                <td className="p-3 border text-center">
                                                    <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded font-bold">Verified</span>
                                                </td>
                                                <td className="p-3 border text-center">0</td>
                                                <td className="p-3 border text-center">100%</td>
                                                <td className="p-3 border text-center">0</td>
                                                <td className="p-3 border text-center">100%</td>
                                                <td className="p-3 border text-center font-bold text-green-600">${sub.user?.balance?.deposit?.toFixed(2) || '0.00'}</td>
                                                <td className="p-3 border text-center font-bold text-blue-600">${sub.user?.balance?.earning?.toFixed(2) || '0.00'}</td>
                                                <td className="p-3 border text-center">
                                                    <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded font-bold">Active</span>
                                                </td>
                                                <td className="p-3 border text-center">
                                                    <button className="bg-[#17a2b8] text-white p-1.5 rounded" title="View Details"><FaUser size={10} /></button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr><td colSpan="12" className="p-10 text-center uppercase">No data available in table</td></tr>
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

export default PremiumUsers;
