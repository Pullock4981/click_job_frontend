import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import { useAuth } from '../contexts/AuthContext';
import { FaShieldAlt, FaCoins, FaArrowDown, FaHistory, FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const Wallet = () => {
    const { user } = useAuth();
    const [isWithdrawing, setIsWithdrawing] = useState(false);
    const [transactions, setTransactions] = useState([
        { title: 'Task Earning #490', amount: '+0.020', date: '2026-01-09', type: 'earn' },
        { title: 'Deposit via bKash', amount: '+10.000', date: '2026-01-05', type: 'deposit' }
    ]);

    // Withdraw Form States
    const [amount, setAmount] = useState('');
    const [method, setMethod] = useState('');
    const [accountDetail, setAccountDetail] = useState('');
    const [priority, setPriority] = useState('Normal - Free');

    const handleWithdrawSubmit = (e) => {
        e.preventDefault();
        if (!amount || !method || !accountDetail) {
            toast.error('Please fill all fields');
            return;
        }
        toast.success('Withdrawal request submitted!');
        setAmount('');
        setAccountDetail('');
        setIsWithdrawing(false);
    };

    const paymentMethods = [
        { id: 'litecoin', label: 'LITECOIN', img: 'https://cryptologos.cc/logos/litecoin-ltc-logo.png' },
        { id: 'bkash', label: 'BKASH', img: 'https://download.logo.wine/logo/BKash/BKash-Logo.wine.png' },
        { id: 'nagad', label: 'NAGAD', img: 'https://download.logo.wine/logo/Nagad/Nagad-Logo.wine.png' },
        { id: 'usdt_trc20', label: 'USDT TRC20', img: 'https://cryptologos.cc/logos/tether-usdt-logo.png' },
        { id: 'usdt_bep20', label: 'USDT BEP20', img: 'https://cryptologos.cc/logos/tether-usdt-logo.png' }
    ];

    // Common Header Blue Background
    const HeaderBackground = () => (
        <div className={`bg-[#5BADE3] ${isWithdrawing ? 'h-32 md:h-40' : 'h-48 md:h-56'} w-full relative flex items-center px-6 md:px-12`}>
            {isWithdrawing && (
                <button
                    onClick={() => setIsWithdrawing(false)}
                    className="flex items-center gap-2 text-white font-black uppercase tracking-widest text-[10px] bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg backdrop-blur-md transition-all -mt-10"
                >
                    <FaArrowLeft /> Back to Wallet
                </button>
            )}
        </div>
    );

    return (
        <Layout showFooter={true}>
            <div className="min-h-screen bg-[#F7F9FC] dark:bg-base-100 -m-2 xs:-m-3 md:-m-8 pb-10 font-sans">
                <HeaderBackground />

                <div className={`max-w-7xl mx-auto px-4 md:px-12 ${isWithdrawing ? '-mt-24 md:-mt-32' : '-mt-32 md:-mt-40'} relative z-10 transition-all`}>
                    {!isWithdrawing ? (
                        /* Dashboard View */
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                            {/* Left Section */}
                            <div className="lg:col-span-8 space-y-8">
                                <div className="bg-white dark:bg-base-200 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] p-10 md:p-14 border border-white/10">
                                    <p className="text-[10px] font-black uppercase tracking-[0.25em] text-base-content/20 mb-10 flex items-center gap-2">
                                        <FaShieldAlt className="text-[#5BADE3]" /> GLOBAL SECURE WALLET
                                    </p>
                                    <div className="flex flex-col md:flex-row justify-between items-center gap-10">
                                        <div className="text-center md:text-left flex-1">
                                            <h1 className="text-[70px] md:text-[85px] font-black text-[#5BADE3] leading-none tracking-tight mb-3">
                                                $0.000
                                            </h1>
                                            <p className="text-[10px] font-black text-base-content/30 uppercase tracking-[0.2em] ml-1">
                                                Available Spendable Balance
                                            </p>
                                        </div>
                                        <div className="flex gap-4 w-full md:w-auto">
                                            <Link to="/deposit" className="px-12 py-4 bg-[#67B1E6] hover:bg-[#5BADE3] text-white font-black uppercase tracking-widest text-[11px] rounded-xl shadow-[0_10px_20px_rgba(103,177,230,0.3)] transition-all transform hover:scale-105">
                                                Deposit
                                            </Link>
                                            <button
                                                onClick={() => setIsWithdrawing(true)}
                                                className="px-12 py-4 bg-white hover:bg-gray-50 text-[#5BADE3] border border-[#5BADE3]/20 font-black uppercase tracking-widest text-[11px] rounded-xl shadow-md transition-all transform hover:scale-105"
                                            >
                                                Withdraw
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white dark:bg-base-200 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] overflow-hidden">
                                    <div className="p-8 pb-6 bg-white dark:bg-base-200 flex justify-between items-center border-b border-gray-50 dark:border-white/5">
                                        <h3 className="text-[10px] font-black uppercase tracking-[0.25em] text-base-content/30">Recent Transactions</h3>
                                        <Link to="/transactions/history" className="text-[10px] font-black text-[#5BADE3] uppercase hover:underline tracking-widest">View All</Link>
                                    </div>
                                    <div className="divide-y divide-gray-50 dark:divide-white/5">
                                        {transactions.map((tr, i) => (
                                            <div key={i} className="flex justify-between items-center p-8 hover:bg-gray-50/50 dark:hover:bg-base-300/20 transition-all group">
                                                <div className="flex items-center gap-6">
                                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl ${tr.type === 'earn' ? 'bg-[#E8F6EF] text-[#27AE60]' : 'bg-[#EBF5FC] text-[#5BADE3]'}`}>
                                                        {tr.type === 'earn' ? <FaCoins /> : <FaArrowDown />}
                                                    </div>
                                                    <div>
                                                        <p className="text-[15px] font-black text-[#34495E] dark:text-gray-200">{tr.title}</p>
                                                        <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest mt-1">{tr.date}</p>
                                                    </div>
                                                </div>
                                                <span className={`text-xl font-black ${tr.amount.startsWith('+') ? 'text-[#27AE60]' : 'text-red-500'}`}>
                                                    {tr.amount}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            {/* Right Section */}
                            <div className="lg:col-span-4 space-y-8">
                                <div className="bg-white dark:bg-base-200 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] p-12 space-y-12">
                                    <div className="space-y-4">
                                        <p className="text-[10px] font-black uppercase tracking-[0.25em] text-base-content/20">Earning Balance</p>
                                        <p className="text-5xl font-black text-[#5BADE3]">$0.000</p>
                                    </div>
                                    <div className="space-y-4">
                                        <p className="text-[10px] font-black uppercase tracking-[0.25em] text-base-content/20">Deposit Balance</p>
                                        <p className="text-5xl font-black text-[#27AE60]">$0.000</p>
                                    </div>
                                </div>
                                <div className="bg-[#67B1E6] p-12 rounded-[2.5rem] shadow-[0_25px_50px_rgba(103,177,230,0.3)] text-white relative overflow-hidden group transition-all">
                                    <div className="absolute -right-8 -bottom-8 opacity-10 group-hover:scale-110 transition-transform duration-700 pointer-events-none transform rotate-12">
                                        <FaHistory size={200} />
                                    </div>
                                    <div className="relative">
                                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] opacity-60">Success Rate</h4>
                                        <p className="text-[75px] font-black mt-4 leading-none tracking-tighter">100%</p>
                                        <p className="text-[10px] font-black mt-8 opacity-80 uppercase tracking-[0.2em]">Smooth processing guaranteed</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        /* Withdraw View */
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                            <div className="lg:col-span-8 bg-white dark:bg-base-200 rounded-lg shadow-sm overflow-hidden transition-colors">
                                <div className="p-8 border-b border-gray-100 dark:border-white/5">
                                    <h1 className="text-[20px] font-bold text-[#34495E] dark:text-gray-200">Withdraw</h1>
                                </div>
                                <div className="p-8 md:p-12 space-y-12">
                                    <form onSubmit={handleWithdrawSubmit} className="space-y-10">
                                        <div>
                                            <label className="block text-[13px] font-medium text-[#7F8C8D] uppercase tracking-wide mb-6">Select Payment Method</label>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {paymentMethods.map((m) => (
                                                    <div key={m.id} onClick={() => setMethod(m.id)} className={`flex items-center gap-4 p-4 rounded-md border transition-all cursor-pointer ${method === m.id ? 'border-[#4184F3] bg-[#F7F9FC]' : 'border-[#EAEEF3] dark:border-white/10 hover:border-gray-300'}`}>
                                                        <div className="w-10 h-10 flex items-center justify-center p-2 bg-white rounded shadow-sm border border-gray-50"><img src={m.img} alt={m.label} className="w-full h-full object-contain" /></div>
                                                        <span className={`font-bold text-[10px] tracking-[0.1em] ${method === m.id ? 'text-[#4184F3]' : 'text-[#7F8C8D]'}`}>{m.label}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-[13px] font-medium text-[#7F8C8D] uppercase tracking-wide mb-4">Withdrawal Priority</label>
                                            <p className="text-[11px] text-[#95A5A6] mb-4 leading-relaxed font-medium">
                                                Withdrawals are processed normally by default within 24–48 hours (<span className="italic font-normal">business hours 8 AM – 8 PM</span>).
                                                If you're not in a hurry, select Normal. For faster review, choose <span className="font-bold text-[#7F8C8D]">Medium Priority</span> (10–18 hours), or select <span className="font-bold text-[#7F8C8D]">High Priority</span> (1–6 hours) for the quickest approval.
                                                The priority system is for users who need urgent processing. If a request is canceled, the fee will be refunded.
                                            </p>
                                            <div className="relative">
                                                <select className="w-full bg-white dark:bg-base-300 border border-[#EAEEF3] dark:border-white/10 rounded p-4 text-[13px] text-[#7F8C8D] dark:text-gray-200 transition-colors focus:ring-1 focus:ring-[#4184F3] appearance-none" value={priority} onChange={(e) => setPriority(e.target.value)}>
                                                    <option>Normal - Free</option>
                                                    <option>Medium Priority [10-18 hours]</option>
                                                    <option>High Priority [1-6 hours]</option>
                                                </select>
                                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-300"><svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg></div>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-[13px] font-medium text-[#7F8C8D] uppercase tracking-wide mb-6">Receive Account & Amount</label>
                                            <div className="space-y-6">
                                                <div className="flex bg-white dark:bg-base-300 border border-[#EAEEF3] dark:border-white/10 rounded overflow-hidden">
                                                    <div className="px-4 flex items-center bg-transparent text-gray-300"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" /><path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" /></svg></div>
                                                    <input type="text" placeholder="Receive Account / Pay ID" className="w-full py-4 text-[13px] font-medium text-[#7F8C8D] focus:outline-none bg-transparent placeholder-gray-300" value={accountDetail} onChange={(e) => setAccountDetail(e.target.value)} />
                                                </div>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div className="flex bg-white dark:bg-base-300 border border-[#EAEEF3] dark:border-white/10 rounded overflow-hidden">
                                                        <div className="px-5 flex items-center bg-transparent text-gray-300 font-bold">$</div>
                                                        <input type="number" placeholder="Payment Amount" className="w-full py-4 text-[13px] font-medium text-[#7F8C8D] focus:outline-none bg-transparent placeholder-gray-300" value={amount} onChange={(e) => setAmount(e.target.value)} />
                                                    </div>
                                                    <div className="flex bg-[#EAEEF3]/40 dark:bg-white/5 border border-[#EAEEF3] dark:border-white/10 rounded overflow-hidden">
                                                        <div className="px-4 flex items-center bg-[#EAEEF3] dark:bg-white/10 text-[10px] font-black uppercase text-[#95A5A6] tracking-widest border-r border-[#EAEEF3] dark:border-white/10">TOTAL</div>
                                                        <div className="flex-1 flex items-center px-4 text-[13px] font-medium text-[#BDC3C7]">Payment Amount</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <button type="submit" className="px-10 py-2.5 bg-white hover:bg-orange-500 hover:text-white border border-orange-500 text-orange-500 font-bold uppercase tracking-wider text-[11px] rounded transition-all shadow-sm">Withdraw</button>
                                    </form>
                                </div>
                            </div>
                            <div className="lg:col-span-4 bg-white dark:bg-base-200 rounded-lg shadow-sm p-10 space-y-8">
                                <h3 className="text-[14px] font-medium text-[#95A5A6] tracking-tight">Earning Balance</h3>
                                <div className="space-y-6">
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#BDC3C7]">NAME</p>
                                        <p className="text-[16px] font-black text-[#2C3E50] dark:text-gray-200">{user?.name || 'Shohag Hosen'}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#BDC3C7]">BALANCE</p>
                                        <p className="text-[18px] font-black text-[#2C3E50] dark:text-gray-200">$ {user?.totalEarnings?.toFixed(3) || '0.200'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default Wallet;
