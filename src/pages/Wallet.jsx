import React from 'react';
import Layout from '../components/layout/Layout';
import { useAuth } from '../contexts/AuthContext';
import { FaWallet, FaArrowDown, FaArrowUp, FaCoins, FaHistory, FaShieldAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Wallet = () => {
    const { user } = useAuth();

    return (
        <Layout>
            <div className="bg-base-200 py-3 md:py-10 px-3 md:px-8">
                <div className="max-w-5xl mx-auto space-y-4 md:space-y-10">
                    {/* Main Balance Card */}
                    <div className="bg-primary p-6 md:p-12 rounded-[2rem] md:rounded-[3.5rem] text-white shadow-2xl relative overflow-hidden group">
                        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center text-center md:text-left">
                            <div>
                                <p className="text-[10px] md:text-sm font-bold uppercase tracking-[0.2em] opacity-80 mb-2 md:mb-4 flex items-center justify-center md:justify-start gap-2">
                                    <FaShieldAlt /> Global Secure Wallet
                                </p>
                                <h1 className="text-3xl md:text-6xl font-black mb-1 md:mb-2">${user?.balance?.toFixed(3) || '0.000'}</h1>
                                <p className="opacity-60 text-[10px] md:text-sm">Your total spendable balance</p>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                                <Link to="/deposit" className="btn btn-white flex-1 h-12 md:h-16 rounded-xl md:rounded-2xl text-primary font-black shadow-xl hover:scale-105 transition-transform text-xs md:text-base">
                                    <FaArrowDown /> Deposit
                                </Link>
                                <Link to="/withdraw" className="btn btn-ghost bg-white/10 border-white/20 flex-1 h-12 md:h-16 rounded-xl md:rounded-2xl text-white font-black backdrop-blur-md text-xs md:text-base">
                                    <FaArrowUp /> Withdraw
                                </Link>

                            </div>
                        </div>
                        <FaWallet className="absolute -bottom-10 -right-10 text-white opacity-10 group-hover:rotate-12 transition-transform duration-700" size={300} />
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-base-100 p-8 rounded-[2rem] shadow-xl border border-base-content/5">
                            <div className="p-4 bg-success/10 text-success rounded-2xl w-fit mb-6"><FaCoins /></div>
                            <p className="text-xs font-black uppercase opacity-50 mb-1">Total Earnings</p>
                            <h3 className="text-3xl font-black">${user?.totalEarnings?.toFixed(2) || '0.00'}</h3>
                        </div>
                        <div className="bg-base-100 p-8 rounded-[2rem] shadow-xl border border-base-content/5">
                            <div className="p-4 bg-error/10 text-error rounded-2xl w-fit mb-6"><FaArrowUp /></div>
                            <p className="text-xs font-black uppercase opacity-50 mb-1">Total Spent</p>
                            <h3 className="text-3xl font-black">${user?.totalSpent?.toFixed(2) || '0.00'}</h3>
                        </div>
                        <div className="bg-base-100 p-8 rounded-[2rem] shadow-xl border border-base-content/5">
                            <div className="p-4 bg-info/10 text-info rounded-2xl w-fit mb-6"><FaHistory /></div>
                            <p className="text-xs font-black uppercase opacity-50 mb-1">Net Flow</p>
                            <h3 className="text-3xl font-black">${((user?.totalEarnings || 0) - (user?.totalSpent || 0)).toFixed(2)}</h3>
                        </div>
                    </div>

                    {/* Recent Transactions Snippet */}
                    <div className="bg-base-100 rounded-[2rem] md:rounded-[2.5rem] shadow-2xl p-6 md:p-10 border border-base-content/5">
                        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
                            <h2 className="text-xl md:text-2xl font-black flex items-center gap-3">
                                <FaHistory className="text-primary" /> Last Transactions
                            </h2>
                            <Link to="/transactions" className="btn btn-ghost btn-sm rounded-xl py-0 px-4">View All</Link>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-base-200/50 rounded-2xl hover:bg-base-200 transition-colors">
                                <div className="flex gap-4 items-center">
                                    <div className="p-3 bg-success/10 text-success rounded-xl"><FaArrowDown /></div>
                                    <div>
                                        <p className="font-black text-sm">Deposit via bKash</p>
                                        <p className="text-[10px] opacity-40 uppercase font-bold">Dec 30, 2023</p>
                                    </div>
                                </div>
                                <span className="text-lg font-black text-success">+$10.00</span>
                            </div>
                            <div className="flex items-center justify-between p-4 bg-base-200/50 rounded-2xl hover:bg-base-200 transition-colors">
                                <div className="flex gap-4 items-center">
                                    <div className="p-3 bg-info/10 text-info rounded-xl"><FaCoins /></div>
                                    <div>
                                        <p className="font-black text-sm">Job Earning #J112</p>
                                        <p className="text-[10px] opacity-40 uppercase font-bold">Dec 31, 2023</p>
                                    </div>
                                </div>
                                <span className="text-lg font-black text-success">+$0.020</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Wallet;
