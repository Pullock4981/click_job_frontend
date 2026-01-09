import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import { FaTicketAlt, FaTrophy, FaHistory, FaStar, FaClock, FaCheck, FaUserAlt } from 'react-icons/fa';

const Ticket = () => {
    const [timeLeft, setTimeLeft] = useState('');

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date();
            const midnight = new Date();
            midnight.setHours(24, 0, 0, 0);
            const diff = midnight - now;

            const hours = Math.floor(diff / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            setTimeLeft(`${hours.toString().padStart(2, '0')} : ${minutes.toString().padStart(2, '0')} : ${seconds.toString().padStart(2, '0')}`);
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const topBuyers = [
        { rank: 1, name: 'Ashik Mahmud', count: 120 },
        { rank: 2, name: 'Shohag Hosen', count: 95 },
        { rank: 3, name: 'Tanvir Ahmed', count: 80 },
        { rank: 4, name: 'Mehedi Hasan', count: 65 },
        { rank: 5, name: 'Rakib Khan', count: 40 },
    ];

    const prevWinners = [
        { rank: 1, name: 'Mithu Ahmed', prize: '$50.00', ticket: '#TK9821' },
        { rank: 2, name: 'Sujon Mia', prize: '$20.00', ticket: '#TK4432' },
        { rank: 3, name: 'Abir Hasan', prize: '$10.00', ticket: '#TK1123' },
    ];

    const recentBuys = [
        { name: 'Ashik Mahmud', time: '2 mins ago', count: 5 },
        { name: 'Shohag Hosen', time: '5 mins ago', count: 2 },
        { name: 'Tanvir Ahmed', time: '12 mins ago', count: 10 },
        { name: 'Rakib Khan', time: '15 mins ago', count: 1 },
    ];

    return (
        <Layout showFooter={true}>
            <div className="min-h-screen bg-base-100 -m-2 xs:-m-3 md:-m-8 pb-20">
                {/* Header Section */}
                <div className="bg-primary h-48 md:h-56 w-full px-4 md:px-8"></div>

                {/* Content Area */}
                <div className="max-w-7xl mx-auto px-4 -mt-32 md:-mt-40">
                    {/* Announcement Bars */}
                    <div className="space-y-3 mb-8">
                        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-3 flex items-center justify-between text-white overflow-hidden">
                            <div className="flex items-center gap-3 animate-pulse">
                                <span className="bg-yellow-400 text-black text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider">Flash</span>
                                <p className="text-xs md:text-sm font-bold truncate">Tonight 12:00 AM Draw Will Start! Join Now To Win $1000!</p>
                            </div>
                            <FaStar className="shrink-0 text-yellow-400" />
                        </div>
                        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-3 flex items-center justify-between text-white overflow-hidden">
                            <div className="flex items-center gap-3">
                                <span className="bg-blue-400 text-white text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider">News</span>
                                <p className="text-xs md:text-sm font-bold truncate">New Season Started! 5000+ Users Already Purchased Today.</p>
                            </div>
                            <FaHistory className="shrink-0 opacity-50" />
                        </div>
                    </div>

                    {/* Countdown Timer Row */}
                    <div className="flex justify-center mb-12">
                        {[
                            { label: 'Hour', val: timeLeft.split(' : ')[0] },
                            { label: 'Min', val: timeLeft.split(' : ')[1] },
                            { label: 'Sec', val: timeLeft.split(' : ')[2] }
                        ].map(({ label, val }, i) => (
                            <div key={i} className="flex flex-col items-center mx-4">
                                <div className="w-16 h-16 md:w-20 md:h-20 bg-base-200 rounded-2xl flex items-center justify-center text-2xl md:text-4xl font-black text-primary shadow-xl border border-base-content/5">
                                    {val || '00'}
                                </div>
                                <span className="text-[10px] md:text-[12px] font-black text-base-content/40 uppercase tracking-widest mt-2 block">{label}</span>
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                        {/* Left Column (Span 4) */}
                        <div className="lg:col-span-4 space-y-6">
                            {/* Jackpot Image Card */}
                            <div className="bg-base-200 rounded-lg shadow-sm overflow-hidden border border-base-content/5 group">
                                <div className="h-48 relative overflow-hidden">
                                    <img
                                        src="https://img.freepik.com/free-vector/golden-jackpot-winner-background-with-coins_1017-31653.jpg"
                                        alt="Jackpot"
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6">
                                        <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-black py-2.5 rounded shadow-lg transition-all active:scale-95 uppercase tracking-widest text-sm">
                                            Buy Ticket Now
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Top Ticket Buyer Card */}
                            <div className="bg-base-200 rounded-lg shadow-sm border border-base-content/5 overflow-hidden">
                                <div className="p-4 bg-base-300 border-b border-base-content/5 text-center transition-colors">
                                    <h3 className="text-primary font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2">
                                        <FaUserAlt /> Top Ticket Buyer
                                    </h3>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-[11px] text-left">
                                        <thead className="text-[9px] uppercase tracking-widest text-base-content/40 border-b border-base-content/5">
                                            <tr>
                                                <th className="px-4 py-3">Rank</th>
                                                <th className="px-4 py-3">User Name</th>
                                                <th className="px-4 py-3">Ticket Buy</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-base-content/5">
                                            {topBuyers.map((item) => (
                                                <tr key={item.rank} className="hover:bg-base-300 transition-colors">
                                                    <td className="px-4 py-3 font-bold text-base-content/40">{item.rank}</td>
                                                    <td className="px-4 py-3 font-bold text-base-content/80">{item.name}</td>
                                                    <td className="px-4 py-3 font-black text-primary">{item.count} Ticket</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        {/* Middle Column (Span 4) */}
                        <div className="lg:col-span-4 space-y-6">
                            {/* Previous Day Winner Card */}
                            <div className="bg-base-200 rounded-lg shadow-sm border border-base-content/5 overflow-hidden">
                                <div className="p-4 bg-base-300 border-b border-base-content/5 text-center transition-colors">
                                    <h3 className="text-primary font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2">
                                        <FaTrophy /> Previous Day Winner
                                    </h3>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-[11px] text-left">
                                        <thead className="text-[9px] uppercase tracking-widest text-base-content/40 border-b border-base-content/5">
                                            <tr>
                                                <th className="px-4 py-3">Rank</th>
                                                <th className="px-4 py-3">User Name</th>
                                                <th className="px-4 py-3">Prize</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-base-content/5">
                                            {prevWinners.map((item) => (
                                                <tr key={item.rank} className="hover:bg-base-300 transition-colors">
                                                    <td className="px-4 py-3 font-bold text-base-content/40">{item.rank}</td>
                                                    <td className="px-4 py-3">
                                                        <p className="font-bold text-base-content/80">{item.name}</p>
                                                        <p className="text-[8px] text-gray-500 font-bold">{item.ticket}</p>
                                                    </td>
                                                    <td className="px-4 py-3 font-black text-green-500">{item.prize}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Ticket Balance Summary */}
                            <div className="bg-base-200 rounded-lg shadow-sm p-8 border border-base-content/5">
                                <p className="text-center text-[10px] font-black text-base-content/40 uppercase tracking-widest mb-6">Your Ticket Balance</p>
                                <div className="grid grid-cols-2 text-center">
                                    <div className="border-r border-base-content/10">
                                        <p className="text-base-content/60 text-xs font-bold mb-1">This Season</p>
                                        <p className="text-2xl font-black text-base-content">0 <span className="text-[10px] text-base-content/40 uppercase">Ticket</span></p>
                                    </div>
                                    <div>
                                        <p className="text-base-content/60 text-xs font-bold mb-1">All Time</p>
                                        <p className="text-2xl font-black text-base-content">24 <span className="text-[10px] text-base-content/40 uppercase">Ticket</span></p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column (Span 4) */}
                        <div className="lg:col-span-4 space-y-6">
                            {/* Recent Buy Card */}
                            <div className="bg-base-200 rounded-lg shadow-sm border border-base-content/5 overflow-hidden">
                                <div className="p-4 bg-base-300 border-b border-base-content/5 text-center transition-colors">
                                    <h3 className="text-primary font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2">
                                        <FaClock /> Recent Buy
                                    </h3>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-[11px] text-left">
                                        <thead className="text-[9px] uppercase tracking-widest text-base-content/40 border-b border-base-content/5">
                                            <tr>
                                                <th className="px-4 py-3">User Name</th>
                                                <th className="px-4 py-3">Time</th>
                                                <th className="px-4 py-3">Count</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-base-content/5">
                                            {recentBuys.map((item, i) => (
                                                <tr key={i} className="hover:bg-base-300 transition-colors">
                                                    <td className="px-4 py-3 font-bold text-base-content/80 text-primary">{item.name}</td>
                                                    <td className="px-4 py-3 font-bold text-base-content/40">{item.time}</td>
                                                    <td className="px-4 py-3 font-black text-base-content/80">{item.count} Ticket</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="p-4 text-center">
                                    <button className="text-[10px] font-black text-primary uppercase tracking-[0.2em] hover:underline">View All Buyers</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Ticket;
