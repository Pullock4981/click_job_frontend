import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import { FaWallet, FaArrowDown, FaQrcode, FaHistory, FaCheckCircle } from 'react-icons/fa';

const Deposit = () => {
    const [amount, setAmount] = useState(10);
    const [method, setMethod] = useState('bikash');

    const paymentMethods = [
        { id: 'bikash', name: 'bKash', color: 'bg-[#e2136e]', logo: 'https://www.logo.wine/a/logo/BKash/BKash-Icon-Logo.wine.svg' },
        { id: 'nagad', name: 'Nagad', color: 'bg-[#f7941d]', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Nagad_Logo.svg/1200px-Nagad_Logo.svg.png' },
        { id: 'binance', name: 'Binance Pay', color: 'bg-[#f3ba2f]', logo: 'https://upload.wikimedia.org/wikipedia/commons/e/e8/Binance_Logo.svg' }
    ];

    return (
        <Layout>
            <div className="min-h-screen bg-base-200 py-12 px-4">
                <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-base-100 rounded-3xl shadow-2xl p-8 border border-base-content/5">
                            <h1 className="text-3xl font-black mb-6 flex items-center gap-3">
                                <FaWallet className="text-primary" /> Deposit Funds
                            </h1>

                            <div className="space-y-6">
                                <div>
                                    <label className="label font-bold">Select Amount ($)</label>
                                    <div className="grid grid-cols-4 gap-3">
                                        {[5, 10, 25, 50, 100, 250, 500].map(val => (
                                            <button
                                                key={val}
                                                onClick={() => setAmount(val)}
                                                className={`btn btn-sm rounded-xl ${amount === val ? 'btn-primary' : 'btn-ghost bg-base-200'}`}
                                            >
                                                ${val}
                                            </button>
                                        ))}
                                        <input
                                            type="number"
                                            placeholder="Other"
                                            className="input input-sm input-bordered rounded-xl bg-base-200/50"
                                            onChange={(e) => setAmount(Number(e.target.value))}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="label font-bold">Payment Method</label>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                        {paymentMethods.map(pm => (
                                            <div
                                                key={pm.id}
                                                onClick={() => setMethod(pm.id)}
                                                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex flex-col items-center gap-2 ${method === pm.id ? 'border-primary bg-primary/5' : 'border-base-content/5 hover:border-primary/50'}`}
                                            >
                                                <img src={pm.logo} alt={pm.name} className="h-10 w-auto" />
                                                <span className="font-bold text-sm">{pm.name}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="p-6 bg-base-200 rounded-2xl border border-base-content/10">
                                    <div className="flex justify-between items-center mb-4 text-sm">
                                        <span>Deposit Amount</span>
                                        <span>${amount.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between items-center mb-4 text-sm">
                                        <span>Transaction Fee (0%)</span>
                                        <span>$0.00</span>
                                    </div>
                                    <div className="divider opacity-10 my-2"></div>
                                    <div className="flex justify-between items-center text-xl font-black">
                                        <span>You will get</span>
                                        <span className="text-primary">${amount.toFixed(2)}</span>
                                    </div>
                                </div>

                                <button className="btn btn-primary btn-block rounded-2xl h-14 text-lg font-black shadow-xl shadow-primary/20">
                                    Proceed to Payment
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar / Info */}
                    <div className="space-y-6">
                        <div className="bg-primary p-8 rounded-3xl text-white shadow-2xl relative overflow-hidden">
                            <div className="relative z-10">
                                <p className="opacity-80 text-sm font-bold uppercase tracking-widest mb-2">Available Balance</p>
                                <h2 className="text-4xl font-black">$0.221</h2>
                            </div>
                            <FaWallet className="absolute -bottom-4 -right-4 text-white opacity-10" size={100} />
                        </div>

                        <div className="bg-base-100 rounded-3xl shadow-xl p-6 border border-base-content/5">
                            <h3 className="font-bold mb-4 flex items-center gap-2">
                                <FaHistory /> Recent Deposits
                            </h3>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between text-sm p-3 bg-base-200 rounded-xl">
                                    <div className="flex flex-col">
                                        <span className="font-bold">$10.00</span>
                                        <span className="text-[10px] opacity-70">Dec 30, 2023</span>
                                    </div>
                                    <span className="badge badge-success badge-sm py-2">Completed</span>
                                </div>
                                <div className="flex items-center justify-between text-sm p-3 bg-base-200 rounded-xl">
                                    <div className="flex flex-col">
                                        <span className="font-bold">$25.00</span>
                                        <span className="text-[10px] opacity-70">Dec 28, 2023</span>
                                    </div>
                                    <span className="badge badge-success badge-sm py-2">Completed</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </Layout>
    );
};

export default Deposit;
