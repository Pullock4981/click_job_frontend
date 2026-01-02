import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import api from '../services/api';
import { API_ENDPOINTS } from '../config/api';
import { FaUsers, FaBriefcase, FaMoneyBillWave, FaChartLine, FaTrash, FaBan, FaUserShield } from 'react-icons/fa';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { getSocket } from '../services/socket';

const AdminDashboard = () => {
    const [stats, setStats] = useState(null);
    const [users, setUsers] = useState([]);
    const [jobs, setJobs] = useState([]);
    const [withdrawals, setWithdrawals] = useState([]);
    const [activeTab, setActiveTab] = useState('stats');
    const [loading, setLoading] = useState(true);
    const [isLive, setIsLive] = useState(false);

    useEffect(() => {
        fetchData();

        const socket = getSocket();
        if (socket) {
            setIsLive(true);
            socket.on('admin_stats_update', (newStats) => {
                setStats(newStats);
            });
            socket.on('new_user_registered', fetchData);
            socket.on('new_job_posted', fetchData);
        }

        return () => {
            if (socket) {
                socket.off('admin_stats_update');
                socket.off('new_user_registered');
                socket.off('new_job_posted');
            }
        };
    }, []);

    useEffect(() => {
        fetchData();
    }, [activeTab]);

    const fetchData = async () => {
        if (!stats && activeTab === 'stats') setLoading(true);
        try {
            if (activeTab === 'stats') {
                const res = await api.get(API_ENDPOINTS.ADMIN_STATS);
                setStats(res.data);
            } else if (activeTab === 'users') {
                const res = await api.get(API_ENDPOINTS.ADMIN_USERS);
                setUsers(res.data.users);
            } else if (activeTab === 'jobs') {
                const res = await api.get(API_ENDPOINTS.ADMIN_JOBS);
                setJobs(res.data.jobs);
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

    const handleAction = async (endpoint, method = 'put', data = null, confirmMessage = null) => {
        if (confirmMessage && !window.confirm(confirmMessage)) return;
        try {
            await api[method](endpoint, data);
            fetchData();
        } catch (error) {
            alert('Action failed: ' + (error.response?.data?.message || error.message || 'Unknown error'));
        }
    };

    const renderStats = () => (
        <div className="space-y-6 md:space-y-8 animate-in fade-in duration-500">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {[
                    { label: 'Total Users', value: stats?.users?.total || 0, icon: <FaUsers className="text-xl md:text-3xl" />, color: 'bg-blue-500/10 text-blue-500' },
                    { label: 'Active Jobs', value: stats?.jobs?.active || 0, icon: <FaBriefcase className="text-xl md:text-3xl" />, color: 'bg-green-500/10 text-green-500' },
                    { label: 'Pending Works', value: stats?.works?.pending || 0, icon: <FaMoneyBillWave className="text-xl md:text-3xl" />, color: 'bg-orange-500/10 text-orange-500' },
                    { label: 'Total Volume', value: `$${stats?.transactions?.totalVolume?.toFixed(2) || '0.00'}`, icon: <FaChartLine className="text-xl md:text-3xl" />, color: 'bg-purple-500/10 text-purple-500' }
                ].map((item, idx) => (
                    <div key={idx} className="bg-base-100 p-6 md:p-10 rounded-[2rem] shadow-2xl border border-primary/5 hover:border-primary/20 transition-all hover:-translate-y-1">
                        <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 md:gap-6">
                            <div className={`p-4 md:p-5 ${item.color} rounded-2xl md:rounded-3xl shadow-lg`}>
                                {item.icon}
                            </div>
                            <div className="min-w-0">
                                <p className="text-[10px] md:text-xs font-black uppercase opacity-40 leading-none mb-2 tracking-widest">{item.label}</p>
                                <h3 className="text-2xl md:text-4xl font-black truncate">{item.value}</h3>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Graph Section */}
            <div className="bg-base-100 p-10 rounded-[2.5rem] shadow-2xl border border-primary/5">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h2 className="text-2xl font-black">Growth Overview</h2>
                        <p className="text-sm opacity-50">User registrations over the last 7 days</p>
                    </div>
                    {isLive && (
                        <div className="badge badge-success gap-2 py-3 px-4 rounded-xl font-bold">
                            <span className="w-2 h-2 bg-white rounded-full animate-ping"></span> Live Tracking
                        </div>
                    )}
                </div>

                <div className="h-[350px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={stats?.graphData || []}>
                            <defs>
                                <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.1} />
                                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.1} />
                                    <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                            <XAxis
                                dataKey="date"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#94A3B8', fontSize: 12, fontWeight: 'bold' }}
                                dy={15}
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#94A3B8', fontSize: 12, fontWeight: 'bold' }}
                                dx={-15}
                            />
                            <Tooltip
                                contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.15)', background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(8px)' }}
                            />
                            <Area
                                type="monotone"
                                dataKey="users"
                                name="Signups"
                                stroke="#3B82F6"
                                strokeWidth={4}
                                fillOpacity={1}
                                fill="url(#colorUsers)"
                            />
                            <Area
                                type="monotone"
                                dataKey="earnings"
                                name="Earnings ($)"
                                stroke="#10B981"
                                strokeWidth={4}
                                fillOpacity={1}
                                fill="url(#colorEarnings)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );

    const renderUsers = () => (
        <div className="animate-in fade-in duration-500">
            {/* Desktop Table View */}
            <div className="hidden lg:block bg-base-100 rounded-[2.5rem] shadow-2xl overflow-hidden border border-primary/5">
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead>
                            <tr className="bg-primary text-white">
                                <th className="py-6 px-8">User Details</th>
                                <th>Role & Badge</th>
                                <th>Balance</th>
                                <th>Account Health</th>
                                <th className="text-right px-8">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user._id} className="hover:bg-primary/5 transition-colors border-b border-base-content/5">
                                    <td className="px-8">
                                        <div className="flex items-center gap-4">
                                            <div className="avatar">
                                                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center font-black text-primary overflow-hidden">
                                                    {user.profilePicture ? <img src={user.profilePicture} alt="" /> : user.name?.[0]}
                                                </div>
                                            </div>
                                            <div>
                                                <p className="font-black">{user.name}</p>
                                                <p className="text-xs opacity-50">{user.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex flex-col gap-1">
                                            <span className={`badge ${user.role === 'admin' ? 'badge-primary' : 'badge-ghost'} font-bold`}>{user.role}</span>
                                            {user.isPremium && <span className="badge badge-secondary badge-xs py-2 font-black">PREMIUM</span>}
                                        </div>
                                    </td>
                                    <td className="font-black text-lg text-primary">${user.walletBalance?.toFixed(3) || user.balance?.toFixed(3) || '0.000'}</td>
                                    <td>
                                        <div className="w-24 bg-base-300 rounded-full h-1.5 overflow-hidden">
                                            <div className={`h-full ${user.isBanned ? 'bg-error' : 'bg-success'}`} style={{ width: '100%' }}></div>
                                        </div>
                                        <p className="text-[10px] mt-1 font-bold opacity-40 uppercase">{user.isBanned ? 'Banned' : 'Healthy'}</p>
                                    </td>
                                    <td className="text-right px-8">
                                        <div className="flex justify-end gap-2">
                                            {user.role !== 'admin' && (
                                                <button
                                                    onClick={() => handleAction(API_ENDPOINTS.ADMIN_USER_DETAILS(user._id), 'put', { role: 'admin' }, `Are you sure you want to promote ${user.name} to Admin?`)}
                                                    className="btn btn-square btn-primary btn-sm rounded-xl shadow-lg shadow-primary/20" title="Promote to Admin"
                                                >
                                                    <FaUserShield />
                                                </button>
                                            )}
                                            <button
                                                onClick={() => handleAction(`${API_ENDPOINTS.ADMIN_USERS}/${user._id}/warning`, 'post', { reason: 'Policy violation warning issued by admin.' }, `Issue warning to ${user.name}?`)}
                                                className="btn btn-square btn-warning btn-sm rounded-xl shadow-lg shadow-warning/20" title="Issue Warning"
                                            >
                                                <FaBan />
                                            </button>
                                            <button
                                                onClick={() => handleAction(`${API_ENDPOINTS.ADMIN_USERS}/${user._id}`, 'delete', null, `Are you sure you want to PERMANENTLY DELETE user ${user.name}?`)}
                                                className="btn btn-square btn-error btn-sm rounded-xl shadow-lg shadow-error/20" title="Terminate User"
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
            </div>

            {/* Mobile List View */}
            <div className="lg:hidden space-y-4">
                {users.map(user => (
                    <div key={user._id} className="bg-base-100 p-6 rounded-3xl shadow-xl border border-primary/5 space-y-4">
                        <div className="flex justify-between items-start">
                            <div className="flex items-center gap-4">
                                <div className="avatar">
                                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center font-black text-primary overflow-hidden">
                                        {user.profilePicture ? <img src={user.profilePicture} alt="" /> : user.name?.[0]}
                                    </div>
                                </div>
                                <div>
                                    <p className="font-black text-lg">{user.name}</p>
                                    <p className="text-xs opacity-50 truncate max-w-[150px]">{user.email}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <span className={`badge ${user.role === 'admin' ? 'badge-primary' : 'badge-ghost'} font-bold`}>{user.role}</span>
                                {user.isPremium && <p className="text-[10px] font-black text-secondary mt-1 tracking-widest">PREMIUM</p>}
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 py-2 border-y border-base-content/5">
                            <div>
                                <p className="text-[10px] uppercase font-black opacity-30 tracking-widest mb-1">Balance</p>
                                <p className="text-lg font-black text-primary">${user.walletBalance?.toFixed(3) || user.balance?.toFixed(3) || '0.000'}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-[10px] uppercase font-black opacity-30 tracking-widest mb-1">Status</p>
                                <p className={`text-xs font-bold ${user.isBanned ? 'text-error' : 'text-success'}`}>{user.isBanned ? 'Banned' : 'Healthy'}</p>
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {user.role !== 'admin' && (
                                <button
                                    onClick={() => handleAction(API_ENDPOINTS.ADMIN_USER_DETAILS(user._id), 'put', { role: 'admin' }, `Promote ${user.name} to Admin?`)}
                                    className="btn btn-primary btn-sm rounded-xl flex-1 font-bold gap-2"
                                >
                                    <FaUserShield /> Admin
                                </button>
                            )}
                            <button
                                onClick={() => handleAction(`${API_ENDPOINTS.ADMIN_USERS}/${user._id}/warning`, 'post', { reason: 'Policy violation warning.' }, `Warn ${user.name}?`)}
                                className="btn btn-warning btn-sm rounded-xl flex-1 font-bold gap-2"
                            >
                                <FaBan /> Warn
                            </button>
                            <button
                                onClick={() => handleAction(`${API_ENDPOINTS.ADMIN_USERS}/${user._id}`, 'delete', null, `Delete ${user.name}?`)}
                                className="btn btn-error btn-sm rounded-xl flex-1 font-bold gap-2"
                            >
                                <FaTrash /> Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <Layout>
            <div className="bg-base-200 py-3 md:py-10 px-3 md:px-8">
                <div className="max-w-7xl mx-auto space-y-4 md:space-y-10">
                    <div className="bg-base-100 p-3 md:p-8 rounded-[1.2rem] md:rounded-[2.5rem] shadow-xl border border-primary/5">
                        <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
                            <div className="flex items-center gap-2 md:gap-4 w-full md:w-auto">
                                <div className="p-2.5 md:p-4 bg-primary text-white rounded-xl md:rounded-3xl shadow-xl shadow-primary/30 flex-shrink-0">
                                    <FaChartLine size={20} className="md:size-6" />
                                </div>
                                <h1 className="text-xl md:text-3xl lg:text-4xl font-black tracking-tight md:tracking-tighter">Admin <span className="text-primary">Console</span></h1>
                            </div>

                            <div className="w-full lg:w-auto">
                                <div className="join bg-base-200/50 p-1 rounded-xl md:rounded-2xl shadow-inner flex w-full lg:w-max">
                                    {['stats', 'users', 'jobs', 'withdrawals'].map(tab => (
                                        <button
                                            key={tab}
                                            onClick={() => setActiveTab(tab)}
                                            className={`join-item btn btn-xs md:btn-sm h-10 md:h-12 border-none transition-all flex-1 lg:flex-none px-2 md:px-8 rounded-lg md:rounded-xl ${activeTab === tab ? 'btn-primary shadow-lg scale-[1.02]' : 'btn-ghost opacity-60'}`}
                                        >
                                            <span className="capitalize font-black text-[10px] md:text-sm tracking-tighter md:tracking-tight">{tab}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {loading ? (
                        <div className="flex flex-col items-center justify-center p-12 md:p-32 space-y-4 overflow-hidden text-center">
                            <span className="loading loading-infinity loading-lg text-primary scale-100 md:scale-150"></span>
                            <p className="font-black opacity-30 animate-pulse uppercase tracking-widest text-[9px] md:text-xs">Synchronizing Core...</p>
                        </div>
                    ) : (
                        <div>
                            {activeTab === 'stats' && renderStats()}
                            {activeTab === 'users' && renderUsers()}
                            {(activeTab === 'jobs' || activeTab === 'withdrawals') && (
                                <div className="bg-base-100 p-8 md:p-24 rounded-[2rem] md:rounded-[3rem] text-center border-4 border-dashed border-base-content/5 opacity-50">
                                    <div className="w-16 h-16 md:w-20 md:h-20 bg-base-content/5 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 text-2xl md:text-3xl">🏗️</div>
                                    <h2 className="text-xl md:text-2xl font-black mb-2 leading-tight">{activeTab.toUpperCase()} Matrix Initializing</h2>
                                    <p className="text-xs md:text-sm font-medium">Real-time data stream for {activeTab} is being calibrated.</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default AdminDashboard;
