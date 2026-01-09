import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import api from '../services/api';
import { API_ENDPOINTS } from '../config/api';
import { format } from 'date-fns';

const TransactionsHistory = ({ type }) => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    const title = type === 'withdraw' ? 'Withdraw History' : 'Deposit History';
    const transactionType = type === 'withdraw' ? 'withdrawal' : 'deposit';

    useEffect(() => {
        const fetchTransactions = async () => {
            setLoading(true);
            try {
                const res = await api.get(`${API_ENDPOINTS.TRANSACTIONS}?type=${transactionType}`);
                if (res.success) {
                    setTransactions(res.data.transactions);
                }
            } catch (error) {
                console.error('Error fetching transactions:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTransactions();
    }, [transactionType]);

    return (
        <Layout showFooter={true}>
            <div className="min-h-screen bg-base-100 -m-2 xs:-m-3 md:-m-8">


                {/* Header Section matching the site theme */}
                <div className="bg-primary h-48 md:h-56 w-full px-4 md:px-8">
                </div>
                {/* Content Container */}
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 md:-mt-40 pb-12">
                    <div className="bg-base-200 rounded-lg shadow-sm border border-base-content/5 overflow-hidden">
                        {/* Card Header */}
                        <div className="p-6 border-b border-base-content/5">
                            <h2 className="text-primary font-bold text-lg md:text-xl">{title}</h2>
                        </div>



                        {/* List Area */}
                        <div className="min-h-[200px]">
                            {loading ? (
                                <div className="flex items-center justify-center p-12">
                                    <span className="loading loading-spinner text-primary"></span>
                                </div>
                            ) : transactions.length > 0 ? (
                                <div className="divide-y divide-gray-100 dark:divide-base-content/5">
                                    {transactions.map((tx) => (
                                        <div key={tx._id} className="flex items-center justify-between p-4 md:px-6 md:py-5 hover:bg-gray-50 dark:hover:bg-base-200/50 transition-colors">
                                            <div className="flex items-center gap-4">
                                                {/* Left Green Bar */}
                                                <div className="w-1 h-12 bg-[#2ECC71] rounded-full"></div>
                                                <div>
                                                    <p className="font-bold text-[14px] text-gray-700 dark:text-gray-200">
                                                        {tx.description || `${tx.metadata?.paymentMethod || 'Payment'} (${tx.type})`}
                                                    </p>
                                                    <p className="text-[12px] text-gray-400 font-medium">
                                                        {format(new Date(tx.createdAt), 'yyyy-MM-dd HH:mm:ss')}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <span className="text-lg font-black text-gray-800 dark:text-gray-100">
                                                    {tx.amount}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex items-center justify-center py-24">
                                    <p className="text-gray-400 dark:text-gray-500 font-bold text-base md:text-lg opacity-40 uppercase tracking-widest">
                                        You Have No History
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Footer inside content area */}
                    <div className="mt-12 flex flex-col md:flex-row justify-between items-center text-[11px] text-gray-400 dark:text-gray-500 font-bold uppercase tracking-widest gap-4">
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

export default TransactionsHistory;
