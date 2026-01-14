import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import { useAuth } from '../contexts/AuthContext';
import { FaShieldAlt, FaCoins, FaArrowDown, FaHistory, FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import api from '../services/api';

const Wallet = () => {
    const { user, refreshUser } = useAuth();
    const [isWithdrawing, setIsWithdrawing] = useState(false);
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    // Withdraw Form States
    const [amount, setAmount] = useState('');
    const [method, setMethod] = useState('');
    const [accountDetail, setAccountDetail] = useState('');
    const [priority, setPriority] = useState('Normal - Free');

    useEffect(() => {
        fetchTransactions();
    }, []);

    const fetchTransactions = async () => {
        try {
            setLoading(true);
            const res = await api.get('/transactions');
            if (res.success) {
                setTransactions(res.data.transactions.slice(0, 5).map(tr => ({
                    title: tr.description,
                    amount: `${tr.type === 'earn' || tr.type === 'deposit' ? '+' : '-'}${tr.amount.toFixed(3)}`,
                    date: new Date(tr.createdAt).toLocaleDateString(),
                    type: tr.type
                })));
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleWithdrawSubmit = async (e) => {
        e.preventDefault();
        if (!amount || !method || !accountDetail) {
            toast.error('Please fill all fields');
            return;
        }

        if (parseFloat(amount) > user.earningBalance) {
            toast.error('Insufficient earning balance');
            return;
        }

        try {
            const res = await api.post('/wallet/withdraw', {
                amount: parseFloat(amount),
                paymentMethod: method,
                accountDetails: {
                    address: accountDetail,
                    priority: priority
                }
            });

            if (res.success) {
                toast.success('Withdrawal request submitted!');
                setAmount('');
                setAccountDetail('');
                setIsWithdrawing(false);
                refreshUser();
                fetchTransactions();
            }
        } catch (err) {
            toast.error(err.message || 'Withdrawal failed');
        }
    };

    const paymentMethods = [
        { id: 'litecoin', label: 'LITECOIN', img: 'https://cryptologos.cc/logos/litecoin-ltc-logo.png' },
        { id: 'bkash', label: 'BKASH', img: 'https://download.logo.wine/logo/BKash/BKash-Logo.wine.png' },
        { id: 'nagad', label: 'NAGAD', img: 'https://download.logo.wine/logo/Nagad/Nagad-Logo.wine.png' },
        { id: 'usdt_trc20', label: 'USDT TRC20', img: 'https://cryptologos.cc/logos/tether-usdt-logo.png' },
        { id: 'usdt_bep20', label: 'USDT BEP20', img: 'https://cryptologos.cc/logos/tether-usdt-logo.png' }
    ];

    const HeaderBackground = () => (
        <div className={`bg-[#5BADE3] ${isWithdrawing ? 'h-32 md:h-40' : 'h-48 md:h-56'} w-full relative flex items-center px-6 md:px-12 transition-all`}>
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
            <div className="min-h-screen bg-base-100 dark:bg-base-900 -m-2 xs:-m-3 md:-m-8 pb-10 font-sans transition-colors">
                <HeaderBackground />

                <div className={`max-w-7xl mx-auto px-4 md:px-12 ${isWithdrawing ? '-mt-24 md:-mt-32' : '-mt-32 md:-mt-40'} relative z-10 transition-all`}>
                    {!isWithdrawing ? (
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                            <div className="lg:col-span-8 space-y-8">
                                <div className="bg-base-100 dark:bg-[#1E293B] rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] p-10 md:p-14 border border-white/10">
                                    <p className="text-[10px] font-black uppercase tracking-[0.25em] text-base-content/20 mb-10 flex items-center gap-2">
                                        <FaShieldAlt className="text-[#5BADE3]" /> GLOBAL SECURE WALLET
                                    </p>
                                    <div className="flex flex-col md:flex-row justify-between items-center gap-10">
                                        <div className="text-center md:text-left flex-1">
                                            <h1 className="text-[70px] md:text-[85px] font-black text-[#67B1E6] leading-none tracking-tight mb-3">
                                                ${((user?.earningBalance || 0) + (user?.depositBalance || 0)).toFixed(3)}
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
                                <div className="bg-base-100 dark:bg-[#1E293B] rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] overflow-hidden">
                                    <div className="p-8 pb-6 border-b border-gray-50 dark:border-white/5 flex justify-between items-center">
                                        <h3 className="text-[10px] font-black uppercase tracking-[0.25em] text-base-content/30">Recent Transactions</h3>
                                        <Link to="/transactions" className="text-[10px] font-black text-[#5BADE3] uppercase hover:underline tracking-widest">View All</Link>
                                    </div>
                                    <div className="divide-y divide-gray-50 dark:divide-white/5">
                                        {loading ? (
                                            <div className="p-10 text-center text-gray-400 text-xs font-bold uppercase tracking-widest">Loading...</div>
                                        ) : transactions.length > 0 ? (
                                            transactions.map((tr, i) => (
                                                <div key={i} className="flex justify-between items-center p-8 hover:bg-gray-50/50 dark:hover:bg-white/5 transition-all group">
                                                    <div className="flex items-center gap-6">
                                                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl ${tr.amount.startsWith('+') ? 'bg-[#E8F6EF] text-[#27AE60]' : 'bg-[#FFF0F0] text-red-500'}`}>
                                                            {tr.amount.startsWith('+') ? <FaCoins /> : <FaArrowDown />}
                                                        </div>
                                                        <div>
                                                            <p className="text-[15px] font-black text-base-content dark:text-gray-100">{tr.title}</p>
                                                            <p className="text-[10px] font-bold text-base-content/20 uppercase tracking-widest mt-1">{tr.date}</p>
                                                        </div>
                                                    </div>
                                                    <span className={`text-xl font-black ${tr.amount.startsWith('+') ? 'text-[#27AE60]' : 'text-red-500'}`}>
                                                        {tr.amount}
                                                    </span>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="p-10 text-center text-gray-400 text-xs font-bold uppercase tracking-widest">No transactions found</div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="lg:col-span-4 space-y-8">
                                <div className="bg-base-100 dark:bg-[#1E293B] rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] p-12 space-y-12">
                                    <div className="space-y-4">
                                        <p className="text-[10px] font-black uppercase tracking-[0.25em] text-base-content/20">Earning Balance</p>
                                        <p className="text-5xl font-black text-[#5BADE3] font-mono tracking-tighter">${user?.earningBalance?.toFixed(3) || '0.000'}</p>
                                    </div>
                                    <div className="space-y-4">
                                        <p className="text-[10px] font-black uppercase tracking-[0.25em] text-base-content/20">Deposit Balance</p>
                                        <p className="text-5xl font-black text-[#27AE60] font-mono tracking-tighter">${user?.depositBalance?.toFixed(3) || '0.000'}</p>
                                    </div>
                                </div>
                                <div className="bg-[#67B1E6] p-12 rounded-[2.5rem] shadow-[0_25px_50px_rgba(103,177,230,0.3)] text-white relative overflow-hidden group">
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
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                            <div className="lg:col-span-8 bg-base-100 dark:bg-[#1E293B] rounded-2xl shadow-sm overflow-hidden p-8 md:p-12 transition-colors">
                                <div className="border-b border-gray-100 dark:border-white/5 pb-8 mb-12">
                                    <h1 className="text-2xl font-black text-base-content uppercase tracking-tight">Withdraw</h1>
                                </div>
                                <form onSubmit={handleWithdrawSubmit} className="space-y-12">
                                    <div>
                                        <label className="block text-xs font-black text-base-content/30 uppercase tracking-[0.2em] mb-8">Select Payment Method</label>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                            {paymentMethods.map((m) => (
                                                <div key={m.id} onClick={() => setMethod(m.id)} className={`flex flex-col items-center gap-4 p-6 rounded-2xl border-2 transition-all cursor-pointer ${method === m.id ? 'border-[#5BADE3] bg-[#5BADE3]/5' : 'border-gray-50 dark:border-white/5 hover:border-gray-100 dark:hover:border-white/10 bg-gray-50/30 dark:bg-white/5'}`}>
                                                    <div className="w-12 h-12 flex items-center justify-center p-2"><img src={m.img} alt={m.label} className="w-full h-full object-contain" /></div>
                                                    <span className={`font-black text-[10px] tracking-[0.15em] uppercase ${method === m.id ? 'text-[#5BADE3]' : 'text-base-content/40'}`}>{m.label}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-black text-base-content/30 uppercase tracking-[0.2em] mb-4">Withdrawal Priority</label>
                                        <select
                                            className="w-full bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 rounded-xl p-5 text-[13px] font-bold text-base-content focus:ring-2 focus:ring-[#5BADE3]/20 focus:outline-none transition-all appearance-none"
                                            value={priority}
                                            onChange={(e) => setPriority(e.target.value)}
                                        >
                                            <option value="Normal - Free">Normal - Free (24-48 Hours)</option>
                                            <option value="Medium Priority">Medium Priority (10-18 hours)</option>
                                            <option value="High Priority">High Priority (1-6 hours)</option>
                                        </select>
                                    </div>
                                    <div className="space-y-6">
                                        <label className="block text-xs font-black text-base-content/30 uppercase tracking-[0.2em]">Receive Account & Amount</label>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <input
                                                type="text"
                                                placeholder="Receive Account / Wallet Address"
                                                className="w-full bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 rounded-xl p-5 text-[13px] font-bold text-base-content focus:ring-2 focus:ring-[#5BADE3]/20 focus:outline-none"
                                                value={accountDetail}
                                                onChange={(e) => setAccountDetail(e.target.value)}
                                            />
                                            <div className="relative">
                                                <input
                                                    type="number"
                                                    placeholder="Amount to Withdraw ($)"
                                                    className="w-full bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 rounded-xl p-5 text-[13px] font-bold text-base-content focus:ring-2 focus:ring-[#5BADE3]/20 focus:outline-none pr-20"
                                                    value={amount}
                                                    onChange={(e) => setAmount(e.target.value)}
                                                />
                                                <div className="absolute right-5 top-1/2 -translate-y-1/2 text-[10px] font-black text-[#5BADE3] uppercase tracking-widest">USD</div>
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full md:w-auto px-16 py-5 bg-[#5BADE3] hover:bg-[#4A9CD2] text-white font-black uppercase tracking-[0.2em] text-[11px] rounded-xl transition-all shadow-xl shadow-[#5BADE3]/30"
                                    >
                                        Confirm Withdrawal
                                    </button>
                                </form>
                            </div>
                            <div className="lg:col-span-4 bg-base-100 dark:bg-[#1E293B] rounded-2xl shadow-sm p-12 space-y-10">
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-[0.25em] text-base-content/20 mb-4">Withdrawal Summary</p>
                                    <div className="p-6 bg-gray-50/50 dark:bg-white/5 rounded-2xl space-y-4">
                                        <div className="flex justify-between items-center text-xs">
                                            <span className="font-bold text-base-content/40 uppercase tracking-widest">Earning Balance</span>
                                            <span className="font-black text-base-content">${user?.earningBalance?.toFixed(3)}</span>
                                        </div>
                                        <div className="flex justify-between items-center text-xs">
                                            <span className="font-bold text-base-content/40 uppercase tracking-widest">Requested Amount</span>
                                            <span className="font-black text-[#5BADE3]">${parseFloat(amount || 0).toFixed(3)}</span>
                                        </div>
                                        <div className="h-px bg-gray-100 dark:bg-white/5"></div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-[10px] font-black text-base-content/40 uppercase tracking-[0.2em]">New Balance</span>
                                            <span className="text-lg font-black text-base-content">${(user?.earningBalance - parseFloat(amount || 0)).toFixed(3)}</span>
                                        </div>
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
