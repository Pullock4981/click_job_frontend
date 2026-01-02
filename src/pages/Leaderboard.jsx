import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import api from '../services/api';
import { API_ENDPOINTS } from '../config/api';
import { FaTrophy, FaMedal, FaUser, FaWallet, FaBriefcase, FaUsers } from 'react-icons/fa';

import { useLocation, Link } from 'react-router-dom';

const Leaderboard = () => {
    const location = useLocation();

    const tabs = [
        { id: 'depositors', label: 'Top Depositor', icon: <FaWallet />, endpoint: API_ENDPOINTS.TOP_DEPOSITORS, path: '/top-depositors' },
        { id: 'workers', label: 'Top Worker', icon: <FaBriefcase />, endpoint: API_ENDPOINTS.TOP_WORKERS, path: '/top-workers' },
        { id: 'posters', label: 'Top Job Poster', icon: <FaMedal />, endpoint: API_ENDPOINTS.TOP_JOB_POSTERS, path: '/top-job-posters' },
        { id: 'referrers', label: 'Top Refer', icon: <FaUsers />, endpoint: API_ENDPOINTS.TOP_REFERRERS, path: '/top-refer' },
        { id: 'users', label: 'Top Users', icon: <FaUser />, endpoint: API_ENDPOINTS.TOP_USERS, path: '/top-users' },
    ];

    const currentTab = tabs.find(t => t.path === location.pathname) || tabs[0];
    const [activeTab, setActiveTab] = useState(currentTab.id);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [myRank, setMyRank] = useState(null);

    useEffect(() => {
        const tab = tabs.find(t => t.path === location.pathname) || tabs[0];
        setActiveTab(tab.id);
    }, [location]);

    useEffect(() => {
        fetchLeaderboard();
        fetchMyRank();
    }, [activeTab]);

    const fetchLeaderboard = async () => {
        try {
            setLoading(true);
            const tab = tabs.find(t => t.id === activeTab);
            const response = await api.get(tab.endpoint);
            // Backend returns { success: true, data: { leaderboard: [...] } }
            const leaderboardArray = response.data.data?.leaderboard || [];
            setData(leaderboardArray);
        } catch (error) {
            console.error('Error fetching leaderboard:', error);
            setData([]);
        } finally {
            setLoading(false);
        }
    };

    const fetchMyRank = async () => {
        try {
            const response = await api.get(API_ENDPOINTS.MY_RANK);
            setMyRank(response.data.data); // Backend returns { success: true, data: { ranks: {...} } }
        } catch (error) {
            console.error('Error fetching my rank:', error);
        }
    };

    const getMetricLabel = () => {
        switch (activeTab) {
            case 'depositors': return 'Total Deposited';
            case 'workers': return 'Total Earned';
            case 'posters': return 'Jobs Posted';
            case 'referrers': return 'Total Refers';
            default: return 'Balance';
        }
    };

    const getValue = (user) => {
        switch (activeTab) {
            case 'depositors': return `$${user.totalDeposits?.toFixed(2) || '0.00'}`;
            case 'workers': return `$${user.totalEarnings?.toFixed(2) || '0.00'}`;
            case 'posters': return user.totalJobs || 0;
            case 'referrers': return user.totalReferrals || 0;
            default: return `$${user.totalEarnings?.toFixed(2) || '0.00'}`;
        }
    };

    return (
        <Layout>
            <div className="bg-base-200 py-3 md:py-10 px-3 md:px-8">
                <div className="max-w-6xl mx-auto space-y-4 md:space-y-10">
                    {/* Header Card */}
                    <div className="bg-base-100 p-3 md:p-8 rounded-[1.2rem] md:rounded-[2.5rem] shadow-xl border border-primary/5">
                        <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
                            <div className="flex items-center gap-2 md:gap-4 w-full md:w-auto">
                                <div className="p-2 md:p-4 bg-yellow-500 text-white rounded-xl md:rounded-3xl shadow-xl shadow-yellow-500/30 flex-shrink-0">
                                    <FaTrophy size={18} className="md:size-6 animate-pulse" />
                                </div>
                                <h1 className="text-lg md:text-3xl lg:text-4xl font-black tracking-tight md:tracking-tighter">Hall <span className="text-primary">of Fame</span></h1>
                            </div>

                            <div className="w-full lg:w-auto">
                                <div className="join bg-base-200/50 p-1 rounded-xl md:rounded-2xl shadow-inner flex flex-wrap lg:flex-nowrap w-full lg:w-max">
                                    {tabs.map(tab => (
                                        <Link
                                            key={tab.id}
                                            to={tab.path}
                                            className={`join-item btn btn-xs md:btn-sm h-10 md:h-12 border-none transition-all flex-1 lg:flex-none px-2 md:px-8 rounded-lg md:rounded-xl ${activeTab === tab.id ? 'btn-primary shadow-lg scale-[1.02]' : 'btn-ghost opacity-60'}`}
                                        >
                                            <span className="flex items-center gap-1.5 md:gap-2 whitespace-nowrap font-black text-[10px] md:text-sm tracking-tighter md:tracking-tight">
                                                {tab.icon} {tab.label.replace('Top ', '')}
                                            </span>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Rankings List */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Top 3 Visuals */}
                        <div className="lg:col-span-1 space-y-4">
                            {!loading && data.length >= 1 && (
                                <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] shadow-2xl text-white text-center relative overflow-hidden group transition-transform">
                                    <div className="relative z-10">
                                        <FaMedal className="mx-auto mb-3 md:mb-4" size={40} md={48} />
                                        <p className="text-[10px] md:text-sm font-bold uppercase tracking-widest opacity-80 mb-1">Rank #1</p>
                                        <h3 className="text-xl md:text-2xl font-black mb-1 truncate">{data[0].name || data[0].username}</h3>
                                        <p className="text-2xl md:text-3xl font-black">{getValue(data[0])}</p>
                                    </div>
                                    <div className="absolute top-0 left-0 w-full h-full bg-white/10 -skew-x-12 translate-x-1/2"></div>
                                </div>
                            )}
                            {/* My Rank Snippet */}
                            {myRank && (
                                <div className="bg-base-100 p-6 rounded-[2rem] shadow-xl border border-primary/20">
                                    <p className="text-xs font-black uppercase opacity-50 mb-4">Your Standings</p>
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-3">
                                            <div className="p-3 bg-primary/10 text-primary rounded-xl"><FaUser /></div>
                                            <span className="font-bold">Global Rank</span>
                                        </div>
                                        <span className="text-2xl font-black text-primary">
                                            #{activeTab === 'depositors' ? myRank.ranks?.depositor :
                                                activeTab === 'workers' ? myRank.ranks?.worker :
                                                    activeTab === 'posters' ? myRank.ranks?.jobPoster :
                                                        activeTab === 'referrers' ? myRank.ranks?.referrer :
                                                            myRank.ranks?.user || 'N/A'}
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* List Table */}
                        <div className="lg:col-span-2">
                            <div className="bg-base-100 rounded-[2.5rem] shadow-2xl overflow-hidden border border-base-content/5">
                                {loading ? (
                                    <div className="p-20 text-center">
                                        <span className="loading loading-spinner loading-lg text-primary"></span>
                                        <p className="mt-4 opacity-50 font-bold tracking-widest text-xs uppercase">Fetching Champions...</p>
                                    </div>
                                ) : (
                                    <div className="text-base-content">
                                        {/* Desktop Table */}
                                        <div className="hidden md:block overflow-x-auto">
                                            <table className="table w-full">
                                                <thead>
                                                    <tr className="bg-primary text-white">
                                                        <th className="py-6 px-8">Rank</th>
                                                        <th>User Details</th>
                                                        <th className="text-right px-8">{getMetricLabel()}</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {data.map((user, index) => (
                                                        <tr key={index} className="hover:bg-primary/5 transition-colors border-b border-base-content/5">
                                                            <td className="px-8">
                                                                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black text-sm ${index < 3 ? 'bg-primary text-white shadow-lg' : 'bg-base-200 opacity-60'}`}>
                                                                    #{index + 1}
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="flex items-center gap-4">
                                                                    <div className="avatar">
                                                                        <div className="w-12 h-12 rounded-2xl bg-base-200 overflow-hidden flex items-center justify-center font-black">
                                                                            <img src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username || user.name}`} alt="" />
                                                                        </div>
                                                                    </div>
                                                                    <div>
                                                                        <p className="font-black">{user.username || user.username || user.name}</p>
                                                                        <p className="text-[10px] opacity-40 uppercase font-bold tracking-widest">Member since {new Date(user.createdAt).getFullYear() || '2023'}</p>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="text-right px-8">
                                                                <div className="font-black text-xl text-primary">{getValue(user)}</div>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>

                                        {/* Mobile List View */}
                                        <div className="md:hidden divide-y divide-base-content/5">
                                            {data.map((user, index) => (
                                                <div key={index} className="p-5 flex items-center justify-between hover:bg-base-200/50 transition-colors">
                                                    <div className="flex items-center gap-4">
                                                        <div className={`w-8 h-8 rounded-xl flex-shrink-0 flex items-center justify-center font-black text-xs ${index < 3 ? 'bg-primary text-white shadow-lg' : 'bg-base-200 opacity-60'}`}>
                                                            {index + 1}
                                                        </div>
                                                        <div className="avatar">
                                                            <div className="w-10 h-10 rounded-xl bg-base-200 overflow-hidden">
                                                                <img src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username || user.name}`} alt="" />
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <p className="font-black text-sm">{user.username || user.name}</p>
                                                            <p className="text-[9px] opacity-40 uppercase font-black">{getMetricLabel()}</p>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <div className="font-black text-primary">{getValue(user)}</div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        {data.length === 0 && (
                                            <div className="py-20 text-center opacity-40">
                                                <div className="text-4xl mb-4">🏆</div>
                                                <p className="font-black uppercase tracking-widest text-xs">No Champions in this category yet</p>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Leaderboard;
