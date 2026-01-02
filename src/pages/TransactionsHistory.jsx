import React from 'react';
import Layout from '../components/layout/Layout';
import { FaHistory, FaArrowUp, FaArrowDown, FaExchangeAlt } from 'react-icons/fa';

const TransactionsHistory = () => {
    const txs = [
        { id: 'T6721', type: 'deposit', amount: 10.00, status: 'completed', date: '2023-12-30', method: 'bKash' },
        { id: 'T6722', type: 'withdrawal', amount: 5.40, status: 'pending', date: '2023-12-31', method: 'Nagad' },
        { id: 'T6723', type: 'earning', amount: 0.02, status: 'completed', date: '2023-12-31', method: 'Job Payment' },
    ];

    return (
        <Layout>
            <div className="bg-base-200 py-3 md:py-10 px-3 md:px-8">
                <div className="max-w-5xl mx-auto space-y-4 md:space-y-10">
                    {/* Header Card Style Header */}
                    <div className="bg-base-100 p-3 md:p-8 rounded-[1.2rem] md:rounded-[2.5rem] shadow-xl border border-primary/5">
                        <div className="flex items-center gap-2 md:gap-4 w-full md:w-auto">
                            <div className="p-2.5 md:p-4 bg-primary text-white rounded-xl md:rounded-3xl shadow-xl shadow-primary/30 flex-shrink-0">
                                <FaHistory size={20} className="md:size-6" />
                            </div>
                            <h1 className="text-xl md:text-3xl lg:text-4xl font-black tracking-tight md:tracking-tighter">History <span className="text-primary">Transactions</span></h1>
                        </div>
                    </div>

                    {/* Desktop Table View */}
                    <div className="hidden md:block bg-base-100 rounded-3xl shadow-2xl overflow-hidden border border-base-content/5">
                        <div className="overflow-x-auto scrollbar-hide">
                            <table className="table w-full">
                                <thead>
                                    <tr className="bg-primary text-primary-content">
                                        <th className="py-6 px-8">ID</th>
                                        <th>Date</th>
                                        <th>Type</th>
                                        <th>Method</th>
                                        <th>Amount</th>
                                        <th className="px-8">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {txs.map(tx => (
                                        <tr key={tx.id} className="hover:bg-base-200/50 transition-colors border-b border-base-content/5">
                                            <td className="px-8 font-mono text-xs font-bold">{tx.id}</td>
                                            <td className="text-sm opacity-70">{tx.date}</td>
                                            <td>
                                                <div className="flex items-center gap-2">
                                                    {tx.type === 'deposit' && <FaArrowDown className="text-success" />}
                                                    {tx.type === 'withdrawal' && <FaArrowUp className="text-error" />}
                                                    {tx.type === 'earning' && <FaExchangeAlt className="text-info" />}
                                                    <span className="capitalize font-bold">{tx.type}</span>
                                                </div>
                                            </td>
                                            <td className="text-sm font-bold">{tx.method}</td>
                                            <td className={`font-black ${tx.type === 'withdrawal' ? 'text-error' : 'text-success'}`}>
                                                {tx.type === 'withdrawal' ? '-' : '+'}${tx.amount.toFixed(2)}
                                            </td>
                                            <td className="px-8">
                                                <span className={`badge badge-sm py-3 px-4 rounded-lg font-bold ${tx.status === 'completed' ? 'badge-success' : 'badge-warning'}`}>
                                                    {tx.status.toUpperCase()}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Mobile Card View */}
                    <div className="md:hidden space-y-4">
                        {txs.map(tx => (
                            <div key={tx.id} className="bg-base-100 p-5 rounded-2xl shadow-xl border border-base-content/5 space-y-4">
                                <div className="flex justify-between items-start">
                                    <div className="flex items-center gap-3">
                                        <div className={`p-2.5 rounded-xl ${tx.type === 'withdrawal' ? 'bg-error/10 text-error' : 'bg-success/10 text-success'}`}>
                                            {tx.type === 'deposit' && <FaArrowDown />}
                                            {tx.type === 'withdrawal' && <FaArrowUp />}
                                            {tx.type === 'earning' && <FaExchangeAlt />}
                                        </div>
                                        <div>
                                            <p className="font-black capitalize">{tx.type}</p>
                                            <p className="text-[10px] opacity-40 font-mono font-bold tracking-widest">{tx.id}</p>
                                        </div>
                                    </div>
                                    <span className={`badge badge-xs py-2 px-3 rounded-md font-bold ${tx.status === 'completed' ? 'badge-success' : 'badge-warning'}`}>
                                        {tx.status.toUpperCase()}
                                    </span>
                                </div>
                                <div className="grid grid-cols-2 gap-4 pt-2">
                                    <div>
                                        <p className="text-[10px] uppercase font-black opacity-30 tracking-widest mb-1">Details</p>
                                        <p className="text-xs font-bold">{tx.method} • {tx.date}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[10px] uppercase font-black opacity-30 tracking-widest mb-1">Amount</p>
                                        <p className={`text-lg font-black ${tx.type === 'withdrawal' ? 'text-error' : 'text-success'}`}>
                                            {tx.type === 'withdrawal' ? '-' : '+'}${tx.amount.toFixed(2)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default TransactionsHistory;
