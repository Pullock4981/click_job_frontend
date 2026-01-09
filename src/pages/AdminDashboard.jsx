import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/layout/AdminLayout';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { API_ENDPOINTS } from '../config/api';
import { FaArrowCircleRight, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const AdminDashboard = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const res = await api.get(API_ENDPOINTS.ADMIN_STATS);
            setStats(res.data);
        } catch (error) {
            console.error('Error fetching admin data:', error);
        } finally {
            setLoading(false);
        }
    };

    const adminCards = [
        // Row 1
        { label: 'Admin Wallet Balance', value: `${stats?.adminWalletBalance?.toFixed(0) || '1'} $`, color: 'bg-[#28A745]', textColor: 'text-white' },
        { label: 'Total User Earning', value: `${stats?.totalUserEarning?.toFixed(2) || '11.64'} $`, color: 'bg-[#FFC107]', textColor: 'text-white' },
        { label: 'Total Approval Jobs', value: stats?.totalApprovalJobs || '7', color: 'bg-[#17A2B8]', textColor: 'text-white', showMoreInfo: true },
        { label: 'Total Pending Jobs', value: stats?.totalPendingJobs || '0', color: 'bg-[#FFC107]', textColor: 'text-white', showMoreInfo: true },
        // Row 2
        { label: 'Total Complete Jobs', value: stats?.totalCompleteJobs || '0', color: 'bg-[#17A2B8]', textColor: 'text-white', showMoreInfo: true },
        { label: 'Total Reject Jobs', value: stats?.totalRejectJobs || '0', color: 'bg-[#DC3545]', textColor: 'text-white', showMoreInfo: true },
        { label: 'Total Deposit', value: `${stats?.totalDeposit?.toFixed(0) || '20'} $`, color: 'bg-[#28A745]', textColor: 'text-white', showMoreInfo: true },
        { label: 'Total Pending Deposit Request', value: stats?.totalPendingDepositRequest || '0', color: 'bg-[#FFC107]', textColor: 'text-white', showMoreInfo: true },
        // Row 3
        { label: 'Total Withdraw', value: `${stats?.totalWithdraw?.toFixed(1) || '13.2'} $`, color: 'bg-[#28A745]', textColor: 'text-white', showMoreInfo: true },
        { label: 'Total Pending Withdraw Request', value: stats?.totalPendingWithdrawRequest || '0', color: 'bg-[#DC3545]', textColor: 'text-white', showMoreInfo: true },
        { label: 'Total Pending Ads', value: stats?.totalPendingAds || '0', color: 'bg-[#FFC107]', textColor: 'text-white', showMoreInfo: true },
        { label: 'Total Paid Ads', value: stats?.totalPaidAds || '0', color: 'bg-[#17A2B8]', textColor: 'text-white', showMoreInfo: true },
        // Row 4
        { label: 'Total Expired Ads', value: stats?.totalExpiredAds || '0', color: 'bg-[#DC3545]', textColor: 'text-white', showMoreInfo: true },
        { label: 'Total Users', value: stats?.totalUsers || '3', color: 'bg-[#17A2B8]', textColor: 'text-white', showMoreInfo: true }
    ];

    return (
        <AdminLayout>
            <div className="p-4 md:p-6 space-y-6 bg-[#F4F6F9] min-h-screen">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <h1 className="text-3xl font-normal text-[#333]">Dashboard</h1>
                    <div className="flex items-center gap-1.5 text-[13px] font-medium tracking-tight">
                        <Link to="/admin" className="text-blue-500 hover:underline">Home</Link>
                        <span className="text-gray-400">/</span>
                        <span className="text-gray-400">Dashboard</span>
                    </div>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center p-32 space-y-4">
                        <span className="loading loading-spinner text-primary loading-lg"></span>
                        <p className="font-bold opacity-30 uppercase tracking-widest text-xs">Syncing Core Data...</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
                        {adminCards.map((card, idx) => (
                            <div key={idx} className={`${card.color} rounded-sm shadow-sm flex flex-col min-h-[140px] md:min-h-[155px] overflow-hidden`}>
                                <div className="p-3 md:p-5 flex-1">
                                    <h2 className="text-2xl md:text-5xl font-black text-white mb-1 md:mb-2">{card.value}</h2>
                                    <p className="text-[12px] md:text-[16px] font-bold text-white/95 leading-tight">{card.label}</p>
                                </div>
                                {card.showMoreInfo && (
                                    <div className="bg-black/10 py-1 md:py-1.5 flex justify-center items-center gap-1 md:gap-1.5 text-white/80 hover:bg-black/20 transition-all cursor-pointer">
                                        <span className="text-[11px] md:text-[14px] font-medium tracking-tight">More info</span>
                                        <FaArrowCircleRight className="text-[11px] md:text-[15px]" />
                                    </div>
                                )}
                            </div>
                        ))}

                        {/* Special Status Card */}
                        <div className="bg-[#17A2B8] rounded-sm shadow-sm flex flex-col min-h-[140px] md:min-h-[155px] overflow-hidden">
                            <div className="p-3 md:p-5 flex-1 space-y-1 md:space-y-2">
                                <div className="flex items-center gap-1.5 text-white font-bold text-[11px] md:text-[15px]">
                                    <FaCheckCircle className="text-white/80 shrink-0" />
                                    <span className="truncate">Total Verified = {stats?.verifiedUsers || 0}</span>
                                </div>
                                <div className="flex items-center gap-1.5 text-white font-bold text-[11px] md:text-[15px]">
                                    <FaTimesCircle className="text-white/80 shrink-0" />
                                    <span className="truncate">Total Unverified = {stats?.unverifiedUsers || 4}</span>
                                </div>
                            </div>
                            <div className="bg-black/10 py-1 md:py-1.5 flex justify-center items-center gap-1 md:gap-1.5 text-white/80 hover:bg-black/20 transition-all cursor-pointer">
                                <span className="text-[11px] md:text-[14px] font-medium tracking-tight">More info</span>
                                <FaArrowCircleRight className="text-[11px] md:text-[15px]" />
                            </div>
                        </div>
                    </div>
                )}

                {/* Footer Section */}
                <footer className="pt-4 pb-4 text-[11px] md:text-[13px] text-gray-400 font-medium border-t border-gray-100 mt-6 text-center lg:text-left">
                    © 2026 Design & Developed By <span className="text-gray-500 font-bold">Syed Ashik Mahmud Pullock</span> .
                </footer>
            </div>
        </AdminLayout>
    );
};

export default AdminDashboard;
