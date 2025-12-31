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
            <div className="min-h-screen bg-base-200 py-12 px-4 shadow-inner">
                <div className="container mx-auto max-w-5xl">
                    <h1 className="text-4xl font-black mb-10 flex items-center gap-4">
                        <FaHistory className="text-primary" /> Transaction History
                    </h1>

                    <div className="bg-base-100 rounded-[2.5rem] shadow-2xl overflow-hidden border border-base-content/5">
                        <div className="overflow-x-auto">
                            <table className="table w-full">
                                <thead>
                                    <tr className="bg-primary/5 text-primary">
                                        <th className="py-6 px-8 rounded-tl-3xl">ID</th>
                                        <th>Date</th>
                                        <th>Type</th>
                                        <th>Method</th>
                                        <th>Amount</th>
                                        <th className="rounded-tr-3xl">Status</th>
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
                                            <td>
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
                </div>
            </div>
        </Layout>
    );
};

export default TransactionsHistory;
