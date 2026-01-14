import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import api from '../services/api';
import { API_ENDPOINTS } from '../config/api';
import { useLocation } from 'react-router-dom';

const Leaderboard = () => {
    const location = useLocation();

    const config = {
        '/top-depositors': {
            id: 'depositors',
            title: 'Top 30 Depositor',
            subTitle: 'Calculated by current month total deposit amount',
            announcement: 'Users to wash other every month, Where the Clean Top Depositor will be awarded. The prize list is: 100$, 70$, 50$, 40$, 35$, 30$, 25$, 20$, 15$, 10$ and last prize is 5$. Thank You.',
            announcementBg: 'bg-[#000080]',
            metricLabel: 'AMOUNT',
            endpoint: API_ENDPOINTS.TOP_DEPOSITORS || '/stats/top-depositors'
        },
        '/top-workers': {
            id: 'workers',
            title: 'Top 500 Worker',
            subTitle: 'Calculated by current month total work satisfied/approved',
            announcement: 'For New Offer please join our Telegram Channel',
            announcementBg: 'bg-[#006400]',
            metricLabel: 'WORK',
            endpoint: API_ENDPOINTS.TOP_WORKERS || '/stats/top-workers',
            hasTimer: true
        },
        '/top-job-posters': {
            id: 'posters',
            title: 'Top 15 Job Poster',
            subTitle: 'Calculated by total job posted',
            announcement: 'Event Close . New Event coming soon . Now Follow our Top Depositer Section',
            announcementBg: 'bg-[#000080]',
            metricLabel: 'POST',
            endpoint: API_ENDPOINTS.TOP_JOB_POSTERS || '/stats/top-job-posters'
        },
        '/top-refer': {
            id: 'referrers',
            title: 'Top 20 Refer',
            subTitle: 'Calculated by current month refer joined',
            announcement: 'New Offer Coming soon !',
            announcementBg: 'bg-[#000080]',
            metricLabel: 'JOINED',
            endpoint: API_ENDPOINTS.TOP_REFERRERS || '/stats/top-referrers'
        },
        '/top-users': {
            id: 'users',
            title: 'Top 50 Best User',
            subTitle: 'Calculated by total withdraw approved',
            announcement: 'New Offer Coming soon !',
            announcementBg: 'bg-[#000080]',
            metricLabel: 'AMOUNT',
            endpoint: API_ENDPOINTS.TOP_USERS || '/stats/top-users'
        }
    };

    const activeConfig = config[location.pathname] || config['/top-depositors'];
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const [timeLeft, setTimeLeft] = useState({
        days: '00',
        hours: '02',
        minutes: '18',
        seconds: '28'
    });

    useEffect(() => {
        fetchLeaderboard();

        // Simple mock timer for Workers page
        if (activeConfig.hasTimer) {
            const timer = setInterval(() => {
                // In a real app, this would be based on an end-of-month timestamp
                setTimeLeft(prev => {
                    let s = parseInt(prev.seconds) - 1;
                    let m = parseInt(prev.minutes);
                    let h = parseInt(prev.hours);
                    let d = parseInt(prev.days);

                    if (s < 0) { s = 59; m -= 1; }
                    if (m < 0) { m = 59; h -= 1; }
                    if (h < 0) { h = 23; d -= 1; }
                    if (d < 0) { d = 0; h = 0; m = 0; s = 0; }

                    return {
                        days: String(d).padStart(2, '0'),
                        hours: String(h).padStart(2, '0'),
                        minutes: String(m).padStart(2, '0'),
                        seconds: String(s).padStart(2, '0')
                    };
                });
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [location.pathname]);

    const fetchLeaderboard = async () => {
        try {
            setLoading(true);
            const response = await api.get(activeConfig.endpoint);
            const leaderboardArray = response.data?.leaderboard || response.data?.data?.leaderboard || [];
            setData(leaderboardArray);
        } catch (error) {
            console.error('Error fetching leaderboard:', error);
            setData([]);
        } finally {
            setLoading(false);
        }
    };

    const formatValue = (user) => {
        switch (activeConfig.id) {
            case 'depositors': return `$ ${user.totalDeposits?.toFixed(2) || '0.00'}`;
            case 'workers': return `Satisfied ${user.totalEarnings?.toFixed(0) || '0'} task`; // Using earnings as a proxy for count if unavailable
            case 'posters': return `${user.totalJobs || 0} Post`;
            case 'referrers': return `${user.totalReferrals || 0} user`;
            case 'users': return `$ ${user.totalWithdrawals?.toFixed(2) || user.totalEarnings?.toFixed(2) || '0.00'}`;
            default: return user.value || '0';
        }
    };

    return (
        <Layout showFooter={true}>
            <div className="min-h-screen bg-[#F0F2F5] dark:bg-base-100 -m-2 xs:-m-3 md:-m-8 pb-20">
                {/* Header Section */}
                <div className="bg-[#5BADE3] h-48 md:h-56 w-full relative"></div>

                {/* Content Area */}
                <div className="max-w-7xl mx-auto px-2 xs:px-4 md:px-8 -mt-32 md:-mt-40 relative z-10 transition-all">
                    <div className="bg-white dark:bg-[#1E293B] rounded-xl shadow-2xl overflow-hidden border border-base-content/5 transition-colors">

                        {/* Title Section */}
                        <div className="text-center py-10 md:py-14">
                            <h1 className="text-2xl md:text-3xl font-black text-[#27AE60] dark:text-green-500 uppercase tracking-tight mb-2">
                                {activeConfig.title}
                            </h1>
                            <p className="text-[10px] md:text-xs font-bold text-base-content/40 dark:text-gray-400 uppercase tracking-widest transition-colors">
                                {activeConfig.subTitle}
                            </p>
                        </div>

                        {/* Announcement Bar */}
                        <div className={`${activeConfig.announcementBg} dark:bg-opacity-80 text-white py-3 mx-4 md:mx-6 rounded-md mb-8 shadow-lg overflow-hidden flex relative`}>
                            {activeConfig.announcement ? (
                                <>
                                    <div className="animate-marquee whitespace-nowrap min-w-full shrink-0 flex items-center px-4">
                                        <p className="text-[10px] md:text-[11px] font-black uppercase inline-block leading-relaxed tracking-wide">
                                            {activeConfig.announcement}
                                        </p>
                                    </div>
                                    <div className="animate-marquee whitespace-nowrap min-w-full shrink-0 flex items-center px-4">
                                        <p className="text-[10px] md:text-[11px] font-black uppercase inline-block leading-relaxed tracking-wide">
                                            {activeConfig.announcement}
                                        </p>
                                    </div>
                                </>
                            ) : (
                                <div className="w-full px-4">
                                    <p className="text-[10px] md:text-[11px] font-black uppercase text-center md:text-left leading-relaxed tracking-wide opacity-0">
                                        Placeholder
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Timer (Workers only) */}
                        {activeConfig.hasTimer && (
                            <div className="flex flex-col items-center mb-10">
                                <div className="flex gap-4 md:gap-8">
                                    {[
                                        { label: 'Days', val: timeLeft.days },
                                        { label: 'Hours', val: timeLeft.hours },
                                        { label: 'Minutes', val: timeLeft.minutes },
                                        { label: 'Seconds', val: timeLeft.seconds }
                                    ].map((unit, i) => (
                                        <div key={i} className="flex flex-col items-center">
                                            <p className="text-[10px] font-black uppercase mb-1 opacity-60 transition-opacity text-base-content">{unit.label}</p>
                                            <div className="bg-[#006400] dark:bg-emerald-900/80 dark:border dark:border-emerald-500/30 text-white w-14 h-14 md:w-20 md:h-20 flex items-center justify-center rounded-lg shadow-lg font-black text-2xl md:text-4xl tracking-tighter transition-all">
                                                {unit.val}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Table Header Section - Styled as a blue bar in screenshots */}
                        <div className="mx-4 md:mx-6 bg-[#000080]/5 dark:bg-base-800 rounded-t-lg border-b border-base-content/10">
                            <div className="grid grid-cols-12 px-6 py-4">
                                <div className="col-span-2 text-[10px] font-black uppercase tracking-widest text-base-content/60 dark:text-base-content/40 transition-colors">Rank</div>
                                <div className="col-span-7 md:col-span-8 text-[10px] font-black uppercase tracking-widest text-base-content/60 dark:text-base-content/40 transition-colors text-center">User Name</div>
                                <div className="col-span-3 md:col-span-2 text-[10px] font-black uppercase tracking-widest text-base-content/60 dark:text-base-content/40 transition-colors text-right">{activeConfig.metricLabel}</div>
                            </div>
                        </div>

                        {/* Table Content */}
                        <div className="mx-4 md:mx-6 bg-white dark:bg-[#1E293B]/50 mb-10 border-x border-b border-base-content/5 rounded-b-lg">
                            {loading ? (
                                <div className="py-20 text-center">
                                    <span className="loading loading-spinner text-primary"></span>
                                    <p className="text-[10px] font-black uppercase mt-4 opacity-40">Loading Champions...</p>
                                </div>
                            ) : data.length > 0 ? (
                                <div className="divide-y divide-base-content/5 transition-colors">
                                    {data.map((user, index) => (
                                        <div key={index} className="grid grid-cols-12 px-6 py-4 hover:bg-base-200/50 dark:hover:bg-white/5 transition-colors group border-b border-base-content/5 last:border-0">
                                            <div className="col-span-2 flex items-center text-sm font-bold text-base-content/70 dark:text-base-content/60 transition-colors">
                                                {index + 1}
                                            </div>
                                            <div className="col-span-7 md:col-span-8 flex items-center justify-center text-sm font-bold text-base-content dark:text-gray-200 transition-colors uppercase tracking-tight">
                                                {user.username || user.name || 'Unknown User'}
                                            </div>
                                            <div className="col-span-3 md:col-span-2 flex items-center justify-end text-sm font-black text-[#5BADE3] dark:text-[#5BADE3] transition-colors">
                                                {formatValue(user)}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="py-20 text-center opacity-30 dark:opacity-50">
                                    <p className="text-xs font-black uppercase text-base-content dark:text-gray-300">No Data Found</p>
                                </div>
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Leaderboard;
