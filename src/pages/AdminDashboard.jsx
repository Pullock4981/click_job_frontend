import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import api from '../services/api';
import { API_ENDPOINTS } from '../config/api';
import { FaUsers, FaBriefcase, FaMoneyBillWave, FaChartLine, FaTrash, FaBan, FaCheck, FaTimes } from 'react-icons/fa';

const AdminDashboard = () => {
    const [stats, setStats] = useState(null);
    const [users, setUsers] = useState([]);
    const [jobs, setJobs] = useState([]);
    const [withdrawals, setWithdrawals] = useState([]);
    const [activeTab, setActiveTab] = useState('stats');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, [activeTab]);

    const fetchData = async () => {
        setLoading(true);
        try {
            if (activeTab === 'stats') {
                const res = await api.get(API_ENDPOINTS.ADMIN_STATS);
                setStats(res.data);
            } else if (activeTab === 'users') {
                const res = await api.get(API_ENDPOINTS.ADMIN_USERS);
                setUsers(res.data);
            } else if (activeTab === 'jobs') {
                const res = await api.get(API_ENDPOINTS.ADMIN_JOBS);
                setJobs(res.data);
            } else if (activeTab === 'withdrawals') {
                const res = await api.get(API_ENDPOINTS.ADMIN_WITHDRAWALS);
                setWithdrawals(res.data);
            }
        } catch (error) {
            console.error('Error fetching admin data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAction = async (endpoint, method = 'put') => {
        try {
            await api[method](endpoint);
            fetchData(); // Refresh current tab
        } catch (error) {
            alert('Action failed: ' + (error.message || 'Unknown error'));
        }
    };

    const renderStats = () => (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-base-100 p-6 rounded-2xl shadow-xl border border-primary/10">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-500/10 rounded-xl text-blue-500">
                        <FaUsers size={24} />
                    </div>
                    <div>
                        <p className="text-sm opacity-60">Total Users</p>
                        <h3 className="text-2xl font-bold">{stats?.totalUsers || 0}</h3>
                    </div>
                </div>
            </div>
            <div className="bg-base-100 p-6 rounded-2xl shadow-xl border border-primary/10">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-green-500/10 rounded-xl text-green-500">
                        <FaBriefcase size={24} />
                    </div>
                    <div>
                        <p className="text-sm opacity-60">Active Jobs</p>
                        <h3 className="text-2xl font-bold">{stats?.activeJobs || 0}</h3>
                    </div>
                </div>
            </div>
            <div className="bg-base-100 p-6 rounded-2xl shadow-xl border border-primary/10">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-yellow-500/10 rounded-xl text-yellow-500">
                        <FaMoneyBillWave size={24} />
                    </div>
                    <div>
                        <p className="text-sm opacity-60">Pending Payouts</p>
                        <h3 className="text-2xl font-bold">{stats?.pendingWithdrawals || 0}</h3>
                    </div>
                </div>
            </div>
            <div className="bg-base-100 p-6 rounded-2xl shadow-xl border border-primary/10">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-purple-500/10 rounded-xl text-purple-500">
                        <FaChartLine size={24} />
                    </div>
                    <div>
                        <p className="text-sm opacity-60">Total Revenue</p>
                        <h3 className="text-2xl font-bold">${stats?.totalRevenue || 0}</h3>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderUsers = () => (
        <div className="overflow-x-auto bg-base-100 rounded-2xl shadow-xl border border-primary/10">
            <table className="table w-full">
                <thead>
                    <tr className="bg-base-200">
                        <th>User</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Balance</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user._id} className="hover:bg-base-200/50">
                            <td>
                                <div className="flex items-center gap-3">
                                    <div className="avatar placeholder">
                                        <div className="bg-neutral text-neutral-content rounded-full w-8">
                                            <span>{user.name?.[0]}</span>
                                        </div>
                                    </div>
                                    <span className="font-bold">{user.name}</span>
                                </div>
                            </td>
                            <td className="text-sm">{user.email}</td>
                            <td><span className={`badge ${user.role === 'admin' ? 'badge-primary' : 'badge-ghost'}`}>{user.role}</span></td>
                            <td className="font-bold text-success">${user.balance?.toFixed(3)}</td>
                            <td>
                                <span className={`badge ${user.isBanned ? 'badge-error' : 'badge-success'} badge-sm`}>
                                    {user.isBanned ? 'Banned' : 'Active'}
                                </span>
                            </td>
                            <td>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleAction(`${API_ENDPOINTS.ADMIN_USERS}/${user._id}/warning`, 'post')}
                                        className="btn btn-warning btn-xs" title="Warning"
                                    >
                                        <FaBan />
                                    </button>
                                    <button
                                        onClick={() => handleAction(`${API_ENDPOINTS.ADMIN_USERS}/${user._id}`, 'delete')}
                                        className="btn btn-error btn-xs" title="Delete"
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    return (
        <Layout>
            <div className="min-h-screen bg-base-200 p-4 md:p-8">
                <div className="container mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                        <h1 className="text-3xl font-black text-primary">Admin Control Panel</h1>
                        <div className="tabs tabs-boxed bg-base-100 p-1">
                            <button
                                onClick={() => setActiveTab('stats')}
                                className={`tab ${activeTab === 'stats' ? 'tab-active' : ''}`}
                            >Stats</button>
                            <button
                                onClick={() => setActiveTab('users')}
                                className={`tab ${activeTab === 'users' ? 'tab-active' : ''}`}
                            >Users</button>
                            <button
                                onClick={() => setActiveTab('jobs')}
                                className={`tab ${activeTab === 'jobs' ? 'tab-active' : ''}`}
                            >Jobs</button>
                            <button
                                onClick={() => setActiveTab('withdrawals')}
                                className={`tab ${activeTab === 'withdrawals' ? 'tab-active' : ''}`}
                            >Withdrawals</button>
                        </div>
                    </div>

                    {loading ? (
                        <div className="flex justify-center p-20">
                            <span className="loading loading-spinner loading-lg text-primary"></span>
                        </div>
                    ) : (
                        <>
                            {activeTab === 'stats' && renderStats()}
                            {activeTab === 'users' && renderUsers()}
                            {activeTab !== 'stats' && activeTab !== 'users' && (
                                <div className="bg-base-100 p-20 rounded-2xl text-center opacity-50 border-2 border-dashed border-base-300">
                                    <h2 className="text-xl font-bold">{activeTab.toUpperCase()} Management coming soon...</h2>
                                    <p>The backend routes exist, UI for this section will be finalized in the next step.</p>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default AdminDashboard;
