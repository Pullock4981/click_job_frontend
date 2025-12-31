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
            <div className="min-h-screen bg-base-200 py-12 px-4 shadow-inner text-base-content">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
                        <h1 className="text-4xl font-black flex items-center gap-4">
                            <FaTrophy className="text-yellow-500 animate-bounce" /> Hall of Fame
                        </h1>
                        <div className="join bg-base-100 p-1 rounded-2xl shadow-xl overflow-x-auto max-w-full">
                            {tabs.map(tab => (
                                <Link
                                    key={tab.id}
                                    to={tab.path}
                                    className={`join-item btn btn-sm h-10 px-6 rounded-xl border-none transition-all ${activeTab === tab.id ? 'btn-primary shadow-lg' : 'btn-ghost opacity-60'}`}
                                >
                                    <span className="flex items-center gap-2 whitespace-nowrap">
                                        {tab.icon} {tab.label}
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Rankings List */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Top 3 Visuals */}
                        <div className="lg:col-span-1 space-y-4">
                            {!loading && data.length >= 1 && (
                                <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 p-8 rounded-[2.5rem] shadow-2xl text-white text-center relative overflow-hidden group hover:scale-105 transition-transform">
                                    <div className="relative z-10">
                                        <FaMedal className="mx-auto mb-4" size={48} />
                                        <p className="text-sm font-bold uppercase tracking-widest opacity-80 mb-1">Rank #1</p>
                                        <h3 className="text-2xl font-black mb-1">{data[0].name || data[0].username}</h3>
                                        <p className="text-3xl font-black">{getValue(data[0])}</p>
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
                                        <p className="mt-4 opacity-50 font-bold">Fetching Champions...</p>
                                    </div>
                                ) : (
                                    <div className="overflow-x-auto text-base-content">
                                        <table className="table w-full">
                                            <thead>
                                                <tr className="bg-base-200/50 text-base-content/70">
                                                    <th className="py-6 px-8">Rank</th>
                                                    <th>User</th>
                                                    <th className="text-right px-8">{getMetricLabel()}</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {data.map((user, index) => (
                                                    <tr key={index} className="hover:bg-base-200/50 transition-colors border-b border-base-content/5">
                                                        <td className="px-8 flex items-center gap-3">
                                                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-xs ${index < 3 ? 'bg-primary text-white shadow-lg' : 'bg-base-200 opacity-60'}`}>
                                                                {index + 1}
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="flex items-center gap-3">
                                                                <div className="avatar">
                                                                    <div className="w-10 rounded-xl">
                                                                        <img src={user.avatar || `https://ui-avatars.com/api/?name=${user.username || user.name}&background=random`} alt="Avatar" />
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <p className="font-black text-sm">{user.username || user.name}</p>
                                                                    <p className="text-[10px] opacity-40 uppercase tracking-tighter">Member since {new Date(user.createdAt).getFullYear() || '2023'}</p>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="text-right px-8">
                                                            <div className="font-black text-lg text-primary">{getValue(user)}</div>
                                                        </td>
                                                    </tr>
                                                ))}
                                                {data.length === 0 && (
                                                    <tr>
                                                        <td colSpan="3" className="text-center py-10 opacity-50 font-bold">No data found in this category.</td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
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
