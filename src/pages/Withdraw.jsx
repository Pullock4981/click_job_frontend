import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import { FaMoneyBillWave, FaUniversity, FaMobileAlt, FaInfoCircle } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-hot-toast';

const Withdraw = () => {
    const { user } = useAuth();
    const [amount, setAmount] = useState('');
    const [method, setMethod] = useState('');
    const [accountDetail, setAccountDetail] = useState('');

    const handleWithdraw = (e) => {
        e.preventDefault();
        if (!amount || !method || !accountDetail) {
            toast.error('Please fill all fields');
            return;
        }
        if (parseFloat(amount) < 1) {
            toast.error('Minimum withdrawal is $1');
            return;
        }
        if (parseFloat(amount) > (user?.walletBalance || 0)) {
            toast.error('Insufficient balance');
            return;
        }

        toast.success('Withdrawal request submitted!');
        // Reset
        setAmount('');
        setMethod('');
        setAccountDetail('');
    };

    return (
        <Layout showFooter={false}>
            <div className="min-h-screen bg-[#F4F6F8] dark:bg-base-300 -m-2 xs:-m-3 md:-m-8">
                {/* Header Section matching the site theme */}
                <div className="bg-primary h-48 md:h-56 w-full px-4 md:px-8">
                </div>

                {/* Content Container */}
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 md:-mt-40 pb-12">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                        {/* Left Card - Withdraw Form (Span 7/12) */}
                        <div className="lg:col-span-7 bg-white dark:bg-base-100 rounded-lg shadow-sm border border-gray-100 dark:border-base-content/5 p-6 md:p-10">
                            <h2 className="text-primary dark:text-gray-200 font-bold text-xl mb-8 flex items-center gap-3">
                                <FaMoneyBillWave className="text-primary" /> Withdrawal Request
                            </h2>

                            <form onSubmit={handleWithdraw} className="space-y-6">
                                <div>
                                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Select Method</label>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                        {[
                                            { id: 'bkash', label: 'bKash', icon: <FaMobileAlt /> },
                                            { id: 'nagad', label: 'Nagad', icon: <FaMobileAlt /> },
                                            { id: 'rocket', label: 'Rocket', icon: <FaMobileAlt /> },
                                            { id: 'bank', label: 'Bank', icon: <FaUniversity /> },
                                        ].map((m) => (
                                            <div
                                                key={m.id}
                                                onClick={() => setMethod(m.id)}
                                                className={`cursor-pointer p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${method === m.id ? 'border-primary bg-primary/5 text-primary' : 'border-gray-100 dark:border-base-content/5 hover:border-gray-200'}`}
                                            >
                                                <span className="text-xl">{m.icon}</span>
                                                <span className="text-xs font-bold">{m.label}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Amount (USD)</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        placeholder="Min $1.00"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        className="w-full bg-[#EAEEF3] dark:bg-base-200 border-none rounded-lg p-4 text-sm text-gray-700 dark:text-gray-200 font-bold focus:ring-2 focus:ring-primary/20"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Account Number / Detail</label>
                                    <input
                                        type="text"
                                        placeholder="e.g 017XXXXXXXX"
                                        value={accountDetail}
                                        onChange={(e) => setAccountDetail(e.target.value)}
                                        className="w-full bg-[#EAEEF3] dark:bg-base-200 border-none rounded-lg p-4 text-sm text-gray-700 dark:text-gray-200 font-bold focus:ring-2 focus:ring-primary/20"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-primary hover:bg-primary-focus text-white font-black py-4 rounded-lg shadow-lg shadow-primary/20 transition-all uppercase tracking-widest text-xs"
                                >
                                    Submit Request
                                </button>
                            </form>
                        </div>

                        {/* Right Card - info & Balance (Span 5/12) */}
                        <div className="lg:col-span-5 space-y-6">
                            <div className="bg-primary/90 rounded-lg p-8 text-white shadow-lg space-y-6">
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-1">Available for Withdraw</p>
                                    <p className="text-4xl font-black">${user?.walletBalance?.toFixed(3) || '0.000'}</p>
                                </div>


                                <div className="space-y-4 pt-4 border-t border-white/10">
                                    <div className="flex gap-3">
                                        <FaInfoCircle className="shrink-0 mt-1 opacity-70" />
                                        <p className="text-[12px] font-medium leading-relaxed opacity-90">
                                            Minimum withdrawal amount is **$1.00**. Processing may take up to **24-48 hours**.
                                        </p>
                                    </div>
                                    <div className="flex gap-3">
                                        <FaInfoCircle className="shrink-0 mt-1 opacity-70" />
                                        <p className="text-[12px] font-medium leading-relaxed opacity-90">
                                            Make sure your account details are correct. Incorrect details may lead to permanent loss of funds.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer inside content area */}
                    <div className="mt-12 flex flex-col md:flex-row justify-between items-center text-[10px] text-gray-400 dark:text-gray-500 font-bold uppercase tracking-widest gap-4">
                        <p>© 2026 CLICK JOB</p>
                        <div className="flex flex-wrap justify-center gap-6">
                            <button className="hover:text-primary transition-colors">About Us</button>
                            <button className="hover:text-primary transition-colors">Privacy Policy</button>
                            <button className="hover:text-primary transition-colors">FAQ</button>
                            <button className="hover:text-primary transition-colors">Terms of Use</button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Withdraw;
